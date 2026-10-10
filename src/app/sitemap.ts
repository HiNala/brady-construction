import type { MetadataRoute } from "next";
import { connection } from "next/server";
import { SERVICES } from "@/data/services";
import { AREAS } from "@/data/areas";
import { SEED_POSTS } from "@/data/posts";
import { getPublishedPosts } from "@/lib/posts";
import { absoluteUrl } from "@/lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Reads DB posts — request-time under Cache Components
  await connection();
  const staticPages: MetadataRoute.Sitemap = [
    { url: absoluteUrl("/"), priority: 1, changeFrequency: "weekly" },
    { url: absoluteUrl("/services"), priority: 0.9, changeFrequency: "monthly" },
    { url: absoluteUrl("/work"), priority: 0.9, changeFrequency: "monthly" },
    { url: absoluteUrl("/about"), priority: 0.7, changeFrequency: "yearly" },
    { url: absoluteUrl("/contact"), priority: 0.95, changeFrequency: "yearly" },
    { url: absoluteUrl("/areas"), priority: 0.8, changeFrequency: "monthly" },
    { url: absoluteUrl("/blog"), priority: 0.85, changeFrequency: "weekly" },
    { url: absoluteUrl("/privacy"), priority: 0.2, changeFrequency: "yearly" },
    { url: absoluteUrl("/terms"), priority: 0.2, changeFrequency: "yearly" },
    { url: absoluteUrl("/accessibility"), priority: 0.2, changeFrequency: "yearly" },
  ];

  const servicePages = SERVICES.map((s) => ({
    url: absoluteUrl(`/services/${s.slug}`),
    priority: 0.85,
    changeFrequency: "monthly" as const,
  }));

  const areaPages = AREAS.map((a) => ({
    url: absoluteUrl(`/areas/${a.slug}`),
    priority: 0.75,
    changeFrequency: "monthly" as const,
  }));

  let postPages: MetadataRoute.Sitemap = [];
  try {
    const posts = await getPublishedPosts();
    postPages = posts.map((p) => ({
      url: absoluteUrl(`/blog/${p.slug}`),
      lastModified: p.updatedAt,
      priority: 0.7,
      changeFrequency: "monthly" as const,
    }));
  } catch {
    postPages = SEED_POSTS.map((p) => ({
      url: absoluteUrl(`/blog/${p.slug}`),
      priority: 0.7,
      changeFrequency: "monthly" as const,
    }));
  }

  return [...staticPages, ...servicePages, ...areaPages, ...postPages];
}
