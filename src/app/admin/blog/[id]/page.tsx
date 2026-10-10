import { connection } from "next/server";
import { notFound } from "next/navigation";
import { eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { posts } from "@/lib/db/schema";
import { SEED_POSTS } from "@/data/posts";
import { requireAdmin } from "@/lib/auth";
import { PostEditor, type EditablePost } from "@/components/admin/post-editor";

// Admin is fully dynamic — opt out of instant-navigation validation
export const instant = false;

export default async function EditPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await requireAdmin();
  await connection();
  const { id } = await params;
  const numId = Number(id);

  let post: EditablePost | undefined;

  if (numId < 0) {
    // Seed post — materialize for editing
    const idx = -1000 - numId;
    const seed = SEED_POSTS[idx];
    if (seed) {
      post = {
        id: numId,
        slug: seed.slug,
        title: seed.title,
        excerpt: seed.excerpt,
        body: seed.body,
        coverImage: seed.coverImage,
        coverAlt: seed.coverAlt,
        category: seed.category,
        tags: seed.tags,
        keywords: seed.keywords,
        metaTitle: seed.metaTitle,
        metaDescription: seed.metaDescription,
        status: "published",
      };
    }
  } else {
    const [row] = await db.select().from(posts).where(eq(posts.id, numId)).limit(1);
    if (row) {
      post = {
        id: row.id,
        slug: row.slug,
        title: row.title,
        excerpt: row.excerpt,
        body: row.body,
        coverImage: row.coverImage,
        coverAlt: row.coverAlt,
        category: row.category,
        tags: row.tags,
        keywords: row.keywords,
        metaTitle: row.metaTitle,
        metaDescription: row.metaDescription,
        status: row.status,
      };
    }
  }

  if (!post) notFound();
  return <PostEditor initial={post} />;
}
