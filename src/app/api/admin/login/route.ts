import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";
import { verifyCredentials, createSessionToken, adminCookie } from "@/lib/auth";
import { rateLimit } from "@/lib/rate-limit";


const creds = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export async function POST(req: NextRequest) {
  // Brute-force protection — 10 login attempts per minute per IP
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    req.headers.get("x-real-ip") ??
    "anon";
  if (!rateLimit(`login:${ip}`, 10, 60_000)) {
    return NextResponse.json(
      { error: "Too many attempts — please wait a minute." },
      { status: 429 }
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid" }, { status: 400 });
  }
  const parsed = creds.safeParse(body);
  if (!parsed.success || !verifyCredentials(parsed.data.email, parsed.data.password)) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }
  const token = createSessionToken();
  if (!token) {
    return NextResponse.json({ error: "Server not configured" }, { status: 503 });
  }
  const res = NextResponse.json({ ok: true });
  res.cookies.set(adminCookie.name, token, adminCookie.options);
  return res;
}
