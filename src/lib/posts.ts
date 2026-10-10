import { desc, eq, and, lt, sql } from "drizzle-orm";
import { db } from "@/lib/db";
import { posts, type Post } from "@/lib/db/schema";
import { SEED_POSTS, type SeedPost } from "@/data/posts";

// Convert seed post to Post shape for rendering when DB is unavailable
function seedToPost(s: SeedPost, i: number): Post {
  // Deterministic timestamp — new Date() throws during prerender under cacheComponents
  const now = new Date(s.publishedAt);
  return {
    id: -1000 - i,
    slug: s.slug,
    title: s.title,
    excerpt: s.excerpt,
    body: s.body,
    coverImage: s.coverImage,
    coverAlt: s.coverAlt,
    category: s.category,
    tags: s.tags,
    keywords: s.keywords,
    metaTitle: s.metaTitle,
    metaDescription: s.metaDescription,
    author: "Patrick Brady",
    status: "published",
    publishedAt: new Date(s.publishedAt),
    createdAt: now,
    updatedAt: now,
  };
}

let dbOk: boolean | null = null;

async function dbAvailable(): Promise<boolean> {
  if (dbOk !== null) return dbOk;
  try {
    await db.execute(sql`select 1`);
    dbOk = true;
  } catch {
    dbOk = false;
  }
  return dbOk;
}

export async function getPublishedPosts(limit?: number): Promise<Post[]> {
  if (await dbAvailable()) {
    try {
      const rows = await db
        .select()
        .from(posts)
        .where(and(eq(posts.status, "published"), lt(posts.publishedAt, new Date())))
        .orderBy(desc(posts.publishedAt));
      if (rows.length || (await countSeedsInDb()) === SEED_POSTS.length) {
        return limit ? rows.slice(0, limit) : rows;
      }
      // DB up but empty — merge seeds not yet in db
      const have = new Set(rows.map((r) => r.slug));
      const seeds = SEED_POSTS.filter((s) => !have.has(s.slug)).map(seedToPost);
      return [...rows, ...seeds]
        .sort((a, b) => (b.publishedAt?.getTime() ?? 0) - (a.publishedAt?.getTime() ?? 0))
        .slice(0, limit ?? 999);
    } catch {
      /* fall through to seeds */
    }
  }
  return SEED_POSTS.map(seedToPost)
    .sort((a, b) => (b.publishedAt?.getTime() ?? 0) - (a.publishedAt?.getTime() ?? 0))
    .slice(0, limit ?? 999);
}

async function countSeedsInDb(): Promise<number> {
  const slugs = await db.select({ slug: posts.slug }).from(posts);
  return slugs.length;
}

export async function getPostBySlug(slug: string): Promise<Post | undefined> {
  if (await dbAvailable()) {
    try {
      const rows = await db.select().from(posts).where(eq(posts.slug, slug)).limit(1);
      if (rows[0] && (rows[0].status === "published" || process.env.NODE_ENV !== "production")) {
        return rows[0];
      }
    } catch {
      /* fallback */
    }
  }
  const seed = SEED_POSTS.find((s) => s.slug === slug);
  return seed ? seedToPost(seed, 0) : undefined;
}

export async function getAllPostsAdmin(): Promise<Post[]> {
  const rows = await db
    .select()
    .from(posts)
    .orderBy(desc(posts.updatedAt));
  // merge seeds not yet persisted so admin sees the seeded articles too
  const have = new Set(rows.map((r) => r.slug));
  const seeds = SEED_POSTS.filter((s) => !have.has(s.slug)).map(seedToPost);
  return [...rows, ...seeds].sort(
    (a, b) => (b.publishedAt?.getTime() ?? 0) - (a.publishedAt?.getTime() ?? 0)
  );
}
