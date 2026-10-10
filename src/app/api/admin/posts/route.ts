import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";
import { posts } from "@/lib/db/schema";
import { isAdmin } from "@/lib/auth";
import { getAllPostsAdmin } from "@/lib/posts";
import { slugify } from "@/lib/utils";


export async function GET() {
  if (!(await isAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  return NextResponse.json({ posts: await getAllPostsAdmin() });
}

const postSchema = z.object({
  slug: z.string().min(1).max(200).optional(),
  title: z.string().min(1).max(300),
  excerpt: z.string().max(600).default(""),
  body: z.string().default(""),
  coverImage: z.string().max(500).nullish(),
  coverAlt: z.string().max(300).nullish(),
  category: z.string().max(80).default("Guides"),
  tags: z.array(z.string()).default([]),
  keywords: z.array(z.string()).default([]),
  metaTitle: z.string().max(200).nullish(),
  metaDescription: z.string().max(300).nullish(),
  status: z.enum(["draft", "published"]).default("draft"),
  publishedAt: z.string().nullish(),
});

export async function POST(req: NextRequest) {
  if (!(await isAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const parsed = postSchema.safeParse(await req.json().catch(() => ({})));
  if (!parsed.success) return NextResponse.json({ error: "Invalid", issues: parsed.error.issues }, { status: 422 });
  const d = parsed.data;
  const slug = slugify(d.slug || d.title);
  const [row] = await db
    .insert(posts)
    .values({
      slug,
      title: d.title,
      excerpt: d.excerpt,
      body: d.body,
      coverImage: d.coverImage || null,
      coverAlt: d.coverAlt || null,
      category: d.category,
      tags: d.tags,
      keywords: d.keywords,
      metaTitle: d.metaTitle || null,
      metaDescription: d.metaDescription || null,
      status: d.status,
      publishedAt: d.status === "published" ? (d.publishedAt ? new Date(d.publishedAt) : new Date()) : null,
    })
    .returning();
  return NextResponse.json({ post: row });
}
