import { NextResponse, type NextRequest } from "next/server";
import { desc, eq } from "drizzle-orm";
import { z } from "zod";
import { db } from "@/lib/db";
import { leads } from "@/lib/db/schema";
import { isAdmin } from "@/lib/auth";


export async function GET() {
  if (!(await isAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const rows = await db.select().from(leads).orderBy(desc(leads.createdAt)).limit(500);
  return NextResponse.json({ leads: rows });
}

const patchSchema = z.object({
  id: z.number(),
  status: z.enum(["new", "contacted", "qualified", "won", "lost", "archived"]).optional(),
  notes: z.string().max(4000).optional(),
});

export async function PATCH(req: NextRequest) {
  if (!(await isAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const parsed = patchSchema.safeParse(await req.json().catch(() => ({})));
  if (!parsed.success) return NextResponse.json({ error: "Invalid" }, { status: 422 });
  const { id, ...fields } = parsed.data;
  await db.update(leads).set(fields).where(eq(leads.id, id));
  return NextResponse.json({ ok: true });
}
