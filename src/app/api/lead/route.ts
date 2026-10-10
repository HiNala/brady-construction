import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";
import { eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { leads, sessions } from "@/lib/db/schema";
import { sendLeadEmail, leadEmailHtml } from "@/lib/email";
import { rateLimit } from "@/lib/rate-limit";


const leadSchema = z.object({
  kind: z.enum(["quote", "contact", "newsletter"]).default("contact"),
  name: z.string().min(1).max(200),
  email: z.string().email().max(300),
  phone: z.string().max(40).optional().or(z.literal("")),
  city: z.string().max(120).optional().or(z.literal("")),
  projectType: z.string().max(80).optional().or(z.literal("")),
  budget: z.string().max(80).optional().or(z.literal("")),
  timeline: z.string().max(80).optional().or(z.literal("")),
  preferredContact: z.string().max(20).optional().or(z.literal("")),
  message: z.string().max(4000).optional().or(z.literal("")),
  emailOptIn: z.boolean().optional().default(false),
  source: z.string().max(120).optional().or(z.literal("")),
  page: z.string().max(300).optional().or(z.literal("")),
  // honeypot — bots fill this
  website: z.string().optional(),
});

export async function POST(req: NextRequest) {
  // Throttle lead submissions per IP — honeypot catches naive bots, this stops floods
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    req.headers.get("x-real-ip") ??
    "anon";
  if (!rateLimit(`lead:${ip}`, 5, 60_000)) {
    return NextResponse.json(
      { error: "Too many requests — please try again shortly." },
      { status: 429 }
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
  const parsed = leadSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Please check the form fields", issues: parsed.error.issues },
      { status: 422 }
    );
  }
  const d = parsed.data;
  if (d.website) return NextResponse.json({ ok: true }); // honeypot

  const url = new URL(req.headers.get("referer") ?? req.url);
  const utm = {
    utmSource: url.searchParams.get("utm_source") ?? undefined,
    utmMedium: url.searchParams.get("utm_medium") ?? undefined,
    utmCampaign: url.searchParams.get("utm_campaign") ?? undefined,
    utmTerm: url.searchParams.get("utm_term") ?? undefined,
    utmContent: url.searchParams.get("utm_content") ?? undefined,
  };
  const sid = req.cookies.get("bc_sid")?.value;

  let leadId: number | undefined;
  try {
    const [row] = await db
      .insert(leads)
      .values({
        kind: d.kind,
        name: d.name,
        email: d.email,
        phone: d.phone || null,
        city: d.city || null,
        projectType: d.projectType || null,
        budget: d.budget || null,
        timeline: d.timeline || null,
        preferredContact: d.preferredContact || null,
        message: d.message || null,
        page: d.page || url.pathname,
        emailOptIn: d.emailOptIn,
        ...utm,
      })
      .returning({ id: leads.id });
    leadId = row.id;

    if (sid) {
      await db.update(sessions).set({ converted: true }).where(eq(sessions.id, sid));
    }
  } catch (e) {
    console.error("lead insert failed", e);
    return NextResponse.json(
      { error: "Could not save your request — please email us directly." },
      { status: 500 }
    );
  }

  const html = leadEmailHtml({
    Type: d.kind,
    Name: d.name,
    Email: d.email,
    Phone: d.phone,
    City: d.city,
    "Project type": d.projectType,
    Budget: d.budget,
    Timeline: d.timeline,
    "Preferred contact": d.preferredContact,
    Message: d.message,
    Page: d.page || url.pathname,
    Source: d.source,
    Campaign: utm.utmCampaign,
  });

  const { sent } = await sendLeadEmail({
    leadId,
    subject: `New ${d.kind === "quote" ? "quote request" : d.kind === "newsletter" ? "subscriber" : "contact"}: ${d.name}${d.city ? ` — ${d.city}` : ""}`,
    html,
    replyTo: d.email,
  });

  // Newsletter subscribers get a welcome email (first touch of the email channel)
  if (d.kind === "newsletter" && d.emailOptIn) {
    await sendLeadEmail({
      to: d.email,
      subject: "You're on the list — Brady Construction",
      replyTo: "atbbrady@yahoo.com",
      html: `<div style="font-family:Georgia,serif;max-width:520px;margin:auto;border:1px solid #e4dccb;border-radius:8px;overflow:hidden">
  <div style="background:#16130e;color:#f7f3ea;padding:18px 24px;font-size:17px">Brady Construction Company</div>
  <div style="padding:22px 24px;font-size:14.5px;line-height:1.7;color:#16130e">
    <p>Thanks for subscribing — you'll get our remodeling guides, cost breakdowns and project stories a few times a year. Never spam.</p>
    <p style="margin:14px 0">And if a project is brewing — a remodel, an addition, a hillside foundation — just reply to this email. It goes straight to Patrick.</p>
    <p style="margin-top:18px">— The Brady family<br><span style="color:#8a7f6d;font-size:12.5px">Family-owned &amp; operated since 1980 · CA License #479385</span></p>
  </div>
</div>`,
    });
  }

  if (sent && leadId) {
    await db.update(leads).set({ emailSent: true }).where(eq(leads.id, leadId));
  }

  return NextResponse.json({ ok: true, id: leadId, emailed: sent });
}
