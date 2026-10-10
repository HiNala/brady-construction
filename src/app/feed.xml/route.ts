import { connection } from "next/server";
import { getPublishedPosts } from "@/lib/posts";
import { SITE, absoluteUrl } from "@/lib/site";


export async function GET() {
  await connection();
  const posts = await getPublishedPosts(50);
  const items = posts
    .map(
      (p) => `    <item>
      <title>${escape(p.title)}</title>
      <link>${absoluteUrl(`/blog/${p.slug}`)}</link>
      <guid isPermaLink="true">${absoluteUrl(`/blog/${p.slug}`)}</guid>
      <description>${escape(p.excerpt)}</description>
      <pubDate>${p.publishedAt?.toUTCString() ?? new Date().toUTCString()}</pubDate>
      <category>${escape(p.category)}</category>
    </item>`
    )
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escape(SITE.name)} — The Journal</title>
    <link>${absoluteUrl("/blog")}</link>
    <atom:link href="${absoluteUrl("/feed.xml")}" rel="self" type="application/rss+xml"/>
    <description>Bay Area remodeling guides, cost breakdowns and project wisdom from ${SITE.name}.</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
}

function escape(s: string): string {
  return s
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}
