import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";
import { eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { leads, sessions } from "@/lib/db/schema";
import { sendLeadEmail, leadEmailHtml } from "@/lib/email";


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

  if (sent && leadId) {
    await db.update(leads).set({ emailSent: true }).where(eq(leads.id, leadId));
  }

  return NextResponse.json({ ok: true, id: leadId, emailed: sent });
}
