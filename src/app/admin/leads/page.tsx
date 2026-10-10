import { desc } from "drizzle-orm";
import { connection } from "next/server";
import { db } from "@/lib/db";
import { leads } from "@/lib/db/schema";
import { LeadsTable } from "@/components/admin/leads-table";

export default async function AdminLeadsPage() {
  await connection();
  const rows = await db.select().from(leads).orderBy(desc(leads.createdAt)).limit(500);
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="display text-3xl font-medium">Leads</h1>
        <p className="text-[13px] text-bone/50">{rows.length} total</p>
      </div>
      <LeadsTable
        leads={rows.map((l) => ({
          id: l.id,
          kind: l.kind,
          name: l.name,
          email: l.email,
          phone: l.phone,
          city: l.city,
          projectType: l.projectType,
          budget: l.budget,
          timeline: l.timeline,
          message: l.message,
          page: l.page,
          status: l.status,
          notes: l.notes,
          emailSent: l.emailSent,
          createdAt: l.createdAt.toISOString(),
        }))}
      />
    </div>
  );
}
