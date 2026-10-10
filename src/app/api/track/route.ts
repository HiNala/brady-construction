import { NextResponse, type NextRequest } from "next/server";
import { createHash, randomUUID } from "node:crypto";
import { db } from "@/lib/db";
import { events, sessions, visitors } from "@/lib/db/schema";


function hashIp(req: NextRequest): string | null {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    req.headers.get("x-real-ip");
  if (!ip) return null;
  return createHash("sha256")
    .update(ip + (process.env.SESSION_SECRET ?? "brady"))
    .digest("hex")
    .slice(0, 24);
}

function parseUa(ua: string): { device: string; browser: string } {
  const device = /Mobile|Android.*Mobile|iPhone|iPod/i.test(ua)
    ? "mobile"
    : /iPad|Tablet/i.test(ua)
      ? "tablet"
      : "desktop";
  const browser = /Edg\//.test(ua)
    ? "Edge"
    : /OPR\/|Opera/.test(ua)
      ? "Opera"
      : /Chrome\//.test(ua)
        ? "Chrome"
        : /Safari\//.test(ua)
          ? "Safari"
          : /Firefox\//.test(ua)
            ? "Firefox"
            : /bot|crawler|spider/i.test(ua)
              ? "bot"
              : "Other";
  return { device, browser };
}

const ALLOWED = new Set([
  "pageview", "cta_click", "form_start", "form_submit", "lead",
  "share", "email_click", "phone_click", "gallery_view", "outbound_click",
]);

export async function POST(req: NextRequest) {
  let body: {
    event?: string; path?: string; referrer?: string;
    utm?: Record<string, string>; props?: Record<string, unknown>;
  };
  try {
    body = await req.json();
  } catch {
    return new NextResponse(null, { status: 204 });
  }
  const event = String(body.event ?? "");
  const path = String(body.path ?? "/").slice(0, 500);
  if (!ALLOWED.has(event) || path.startsWith("/admin")) {
    return new NextResponse(null, { status: 204 });
  }

  const vid = req.cookies.get("bc_vid")?.value ?? randomUUID();
  const sid = req.cookies.get("bc_sid")?.value ?? randomUUID();
  const ua = req.headers.get("user-agent") ?? "";
  const { device, browser } = parseUa(ua);
  const ipHash = hashIp(req);
  const utm = body.utm ?? {};

  try {
    // Upsert visitor
    await db
      .insert(visitors)
      .values({
        id: vid, lastSeenAt: new Date(), referrer: body.referrer?.slice(0, 500),
        utmSource: utm.utm_source, utmMedium: utm.utm_medium,
        utmCampaign: utm.utm_campaign, userAgent: ua.slice(0, 500),
        device, browser, ipHash,
      })
      .onConflictDoUpdate({
        target: visitors.id,
        set: { lastSeenAt: new Date() },
      });

    // Upsert session
    await db
      .insert(sessions)
      .values({
        id: sid, visitorId: vid, lastSeenAt: new Date(), landingPath: path,
        referrer: body.referrer?.slice(0, 500),
        utmSource: utm.utm_source, utmMedium: utm.utm_medium,
        utmCampaign: utm.utm_campaign, userAgent: ua.slice(0, 500),
        device, browser, ipHash,
      })
      .onConflictDoUpdate({
        target: sessions.id,
        set: { lastSeenAt: new Date() },
      });

    await db.insert(events).values({
      event, path, sessionId: sid, visitorId: vid,
      referrer: body.referrer?.slice(0, 500),
      utmSource: utm.utm_source, utmMedium: utm.utm_medium,
      utmCampaign: utm.utm_campaign, device, browser, ipHash,
      props: body.props ?? null,
    });
  } catch (e) {
    // DB might not exist yet (dev before migrate) — don't crash the beacon
    console.error("track error", e);
  }

  const res = new NextResponse(null, { status: 204 });
  // Ensure cookies persist for beacon-origin hits
  res.cookies.set("bc_vid", vid, { maxAge: 63072000, sameSite: "lax", path: "/" });
  res.cookies.set("bc_sid", sid, { maxAge: 14400, sameSite: "lax", path: "/" });
  return res;
}
