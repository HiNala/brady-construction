import nodemailer from "nodemailer";
import { db } from "@/lib/db";
import { emailLog } from "@/lib/db/schema";

const TO = process.env.LEAD_EMAIL_TO ?? "atbbrady@yahoo.com";
const FROM =
  process.env.LEAD_EMAIL_FROM ?? "Brady Construction <leads@bradyremodel.com>";

async function sendViaResend(subject: string, html: string, to: string, replyTo?: string) {
  const key = process.env.RESEND_API_KEY;
  if (!key) return false;
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: FROM,
      to: [to],
      subject,
      html,
      reply_to: replyTo,
    }),
  });
  if (!res.ok) throw new Error(`Resend ${res.status}: ${await res.text()}`);
  return true;
}

async function sendViaSmtp(subject: string, html: string, to: string, replyTo?: string) {
  const host = process.env.SMTP_HOST;
  if (!host) return false;
  const transport = nodemailer.createTransport({
    host,
    port: Number(process.env.SMTP_PORT ?? 587),
    secure: process.env.SMTP_SECURE === "true",
    auth: process.env.SMTP_USER
      ? { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
      : undefined,
  });
  await transport.sendMail({ from: FROM, to, subject, html, replyTo });
  return true;
}

export async function sendLeadEmail(opts: {
  leadId?: number;
  to?: string;
  subject: string;
  html: string;
  replyTo?: string;
}): Promise<{ sent: boolean; error?: string }> {
  const to = opts.to ?? TO;
  let status = "skipped";
  let error: string | undefined;
  try {
    if (await sendViaResend(opts.subject, opts.html, to, opts.replyTo)) {
      status = "sent";
    } else if (await sendViaSmtp(opts.subject, opts.html, to, opts.replyTo)) {
      status = "sent";
    }
  } catch (e) {
    status = "failed";
    error = e instanceof Error ? e.message : String(e);
  }
  try {
    await db.insert(emailLog).values({
      leadId: opts.leadId ?? null,
      to,
      subject: opts.subject,
      status,
      error,
    });
  } catch {
    // logging must never break the request
  }
  return { sent: status === "sent", error };
}

export function leadEmailHtml(fields: Record<string, string | undefined>): string {
  const rows = Object.entries(fields)
    .filter(([, v]) => v)
    .map(
      ([k, v]) =>
        `<tr><td style="padding:6px 14px 6px 0;color:#8a7f6d;font-size:13px;vertical-align:top;text-transform:capitalize">${k}</td><td style="padding:6px 0;font-size:14px;color:#16130e">${escapeHtml(
          v!
        )}</td></tr>`
    )
    .join("");
  return `<div style="font-family:Georgia,serif;max-width:560px;margin:auto;border:1px solid #e4dccb;border-radius:8px;overflow:hidden">
  <div style="background:#16130e;color:#f7f3ea;padding:18px 24px;font-size:18px;letter-spacing:.02em">New inquiry — Brady Construction</div>
  <div style="padding:20px 24px"><table style="border-collapse:collapse;width:100%">${rows}</table></div>
  <div style="padding:12px 24px;background:#f7f3ea;color:#8a7f6d;font-size:12px">Submitted via bradyremodel.com — reply directly to the visitor's email.</div>
</div>`;
}

export function escapeHtml(s: string): string {
  return s
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}
