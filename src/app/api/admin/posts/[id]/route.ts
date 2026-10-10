import { NextResponse, type NextRequest } from "next/server";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { db } from "@/lib/db";
import { posts } from "@/lib/db/schema";
import { isAdmin } from "@/lib/auth";
import { slugify } from "@/lib/utils";


const patchSchema = z.object({
  slug: z.string().min(1).max(200).optional(),
  title: z.string().min(1).max(300).optional(),
  excerpt: z.string().max(600).optional(),
  body: z.string().optional(),
  coverImage: z.string().max(500).nullish(),
  coverAlt: z.string().max(300).nullish(),
  category: z.string().max(80).optional(),
  tags: z.array(z.string()).optional(),
  keywords: z.array(z.string()).optional(),
  metaTitle: z.string().max(200).nullish(),
  metaDescription: z.string().max(300).nullish(),
  status: z.enum(["draft", "published"]).optional(),
  publishedAt: z.string().nullish(),
});

export async function PATCH(req: NextRequest, ctx: { params: Promise<{ id: string }> }) {
  if (!(await isAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await ctx.params;
  const numId = Number(id);
  if (!Number.isFinite(numId)) return NextResponse.json({ error: "Bad id" }, { status: 400 });
  const parsed = patchSchema.safeParse(await req.json().catch(() => ({})));
  if (!parsed.success) return NextResponse.json({ error: "Invalid" }, { status: 422 });
  const d = parsed.data;

  // Seed posts have negative ids — materialize them into the table first
  if (numId < 0) {
    const { SEED_POSTS } = await import("@/data/posts");
    const seed = SEED_POSTS.find((s) => -1000 - SEED_POSTS.indexOf(s) === numId);
    if (!seed) return NextResponse.json({ error: "Not found" }, { status: 404 });
    const [created] = await db
      .insert(posts)
      .values({
        slug: seed.slug, title: d.title ?? seed.title,
        excerpt: d.excerpt ?? seed.excerpt, body: d.body ?? seed.body,
        coverImage: d.coverImage ?? seed.coverImage,
        coverAlt: d.coverAlt ?? seed.coverAlt,
        category: d.category ?? seed.category,
        tags: d.tags ?? seed.tags, keywords: d.keywords ?? seed.keywords,
        metaTitle: d.metaTitle ?? seed.metaTitle,
        metaDescription: d.metaDescription ?? seed.metaDescription,
        status: d.status ?? "published",
        publishedAt: seed.publishedAt ? new Date(seed.publishedAt) : new Date(),
      })
      .onConflictDoNothing({ target: posts.slug })
      .returning();
    return NextResponse.json({ post: created ?? null });
  }

  const update: Record<string, unknown> = { updatedAt: new Date() };
  if (d.slug !== undefined) update.slug = slugify(d.slug);
  if (d.title !== undefined) update.title = d.title;
  if (d.excerpt !== undefined) update.excerpt = d.excerpt;
  if (d.body !== undefined) update.body = d.body;
  if (d.coverImage !== undefined) update.coverImage = d.coverImage || null;
  if (d.coverAlt !== undefined) update.coverAlt = d.coverAlt || null;
  if (d.category !== undefined) update.category = d.category;
  if (d.tags !== undefined) update.tags = d.tags;
  if (d.keywords !== undefined) update.keywords = d.keywords;
  if (d.metaTitle !== undefined) update.metaTitle = d.metaTitle || null;
  if (d.metaDescription !== undefined) update.metaDescription = d.metaDescription || null;
  if (d.status !== undefined) {
    update.status = d.status;
    if (d.status === "published") update.publishedAt = d.publishedAt ? new Date(d.publishedAt) : new Date();
  }
  if (d.publishedAt !== undefined && d.status === undefined) {
    update.publishedAt = d.publishedAt ? new Date(d.publishedAt) : null;
  }
  const [row] = await db.update(posts).set(update).where(eq(posts.id, numId)).returning();
  return NextResponse.json({ post: row });
}

export async function DELETE(_req: NextRequest, ctx: { params: Promise<{ id: string }> }) {
  if (!(await isAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await ctx.params;
  const numId = Number(id);
  if (!Number.isFinite(numId) || numId < 0) return NextResponse.json({ error: "Bad id" }, { status: 400 });
  await db.delete(posts).where(eq(posts.id, numId));
  return NextResponse.json({ ok: true });
}
