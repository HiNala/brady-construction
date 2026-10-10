import { NextResponse } from "next/server";
import { desc } from "drizzle-orm";
import { db } from "@/lib/db";
import { leads } from "@/lib/db/schema";
import { isAdmin } from "@/lib/auth";

// CSV export — feeds the newsletter/email distribution channel
// (import into any ESP). ?kind=newsletter filters to subscribers only.
export async function GET(req: Request) {
  if (!(await isAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const kind = new URL(req.url).searchParams.get("kind");
  const rows = await db.select().from(leads).orderBy(desc(leads.createdAt)).limit(10000);
  const filtered = kind ? rows.filter((r) => r.kind === kind) : rows;

  const esc = (v: unknown) => {
    const s = v == null ? "" : String(v);
    return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
  };
  const header = "id,kind,name,email,phone,city,project_type,budget,timeline,status,email_opt_in,created_at\n";
  const body = filtered
    .map((r) =>
      [r.id, r.kind, r.name, r.email, r.phone, r.city, r.projectType, r.budget,
       r.timeline, r.status, r.emailOptIn, r.createdAt.toISOString()].map(esc).join(",")
    )
    .join("\n");

  return new Response(header + body, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="brady-leads${kind ? `-${kind}` : ""}.csv"`,
      "Cache-Control": "no-store",
    },
  });
}
