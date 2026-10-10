/**
 * Seed the database: push schema + insert the 10 starter articles.
 * Usage: node scripts/seed.mjs   (tsx not required — uses drizzle-kit push first)
 */
import { execSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";

// Load env files (Node 20.12+)
for (const f of [".env.local", ".env"]) {
  try { process.loadEnvFile(f); } catch {}
}

const DATABASE_URL =
  process.env.DATABASE_URL ?? "postgres://brady:brady@localhost:5432/brady";
console.log("→ DATABASE:", DATABASE_URL.replace(/:[^:@]+@/, ":***@"));

if (!process.argv.includes("--no-push")) {
  console.log("→ Pushing schema (drizzle-kit push)…");
  execSync("npx drizzle-kit push --force", { stdio: "inherit" });
}

// Extract seed posts by importing the TS file through a quick transform —
// simplest reliable path: read the file and eval the exported array.
const src = readFileSync("src/data/posts.ts", "utf8");
const arrayStart = src.indexOf("SEED_POSTS: SeedPost[] = [");
if (arrayStart === -1) {
  console.error("Could not find SEED_POSTS export");
  process.exit(1);
}
// Compile the single expression to JS
const tsCode = src
  .slice(src.indexOf("export const SEED_POSTS"))
  .replace("export const", "const")
  .replace(/:\s*SeedPost\[\]/, "");
const posts = new Function(`${tsCode}\nreturn SEED_POSTS;`)();
console.log(`→ ${posts.length} seed articles found`);

const require = createRequire(import.meta.url);
const postgres = require("postgres");
const sql = postgres(DATABASE_URL, { max: 1 });

let inserted = 0;
for (const p of posts) {
  const res = await sql`
    insert into posts (slug, title, excerpt, body, cover_image, cover_alt,
      category, tags, keywords, meta_title, meta_description, author, status,
      published_at)
    values (${p.slug}, ${p.title}, ${p.excerpt}, ${p.body}, ${p.coverImage},
      ${p.coverAlt}, ${p.category}, ${sql.json(p.tags)}, ${sql.json(p.keywords)},
      ${p.metaTitle}, ${p.metaDescription}, 'Brady Construction', 'published',
      ${p.publishedAt})
    on conflict (slug) do nothing
    returning id`;
  if (res.length) inserted++;
}
console.log(`→ Seeded ${inserted} new articles (${posts.length - inserted} already existed)`);
await sql.end();
console.log("Done ✓");
