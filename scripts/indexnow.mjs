#!/usr/bin/env node
/**
 * IndexNow submission — pushes URLs to Bing/Yandex/Naver for faster indexing.
 * https://www.indexnow.org/documentation
 *
 * Usage:
 *   node scripts/indexnow.mjs                # submit all sitemap URLs
 *   node scripts/indexnow.mjs /blog/new-post # submit specific paths
 *
 * Requires the key file public/<key>.txt served at the site root —
 * already committed. Set NEXT_PUBLIC_SITE_URL to your production domain.
 */

const SITE = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://bradyremodel.com").replace(/\/$/, "");
const KEY = "d024eca4002d43d0a7b7791ef867d7ba";

async function main() {
  let urls = process.argv.slice(2);
  if (!urls.length) {
    const xml = await fetch(`${SITE}/sitemap.xml`).then((r) => r.text());
    urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
    console.log(`Fetched ${urls.length} URLs from sitemap`);
  } else {
    urls = urls.map((u) => (u.startsWith("http") ? u : `${SITE}${u.startsWith("/") ? u : `/${u}`}`));
  }

  // IndexNow accepts up to 10,000 URLs per request
  const res = await fetch("https://api.indexnow.org/indexnow", {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify({
      host: new URL(SITE).host,
      key: KEY,
      keyLocation: `${SITE}/${KEY}.txt`,
      urlList: urls,
    }),
  });
  console.log(`IndexNow → ${res.status} ${res.statusText} (${urls.length} URLs)`);
  if (!res.ok) process.exit(1);
}

main().catch((e) => { console.error(e); process.exit(1); });
