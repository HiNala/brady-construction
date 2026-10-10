// Optimize slurped images -> public/images + emit src/data/gallery.json
import { createRequire } from "node:module";
import fs from "node:fs";
import path from "node:path";

const require = createRequire(import.meta.url);
const sharp = require("sharp");

const SRC = "C:/Users/NalaBook/Desktop/slurper/output/bradyremodel-com-bundle";
const CATALOG = path.join(SRC, "global/gallery-catalog.json");
const OUT_IMG = "public/images";
const OUT_DATA = "src/data";

const HERO_W = 1920;
const THUMB_W = 1200;

async function main() {
  const catalog = JSON.parse(fs.readFileSync(CATALOG, "utf8"));
  fs.mkdirSync(path.join(OUT_IMG, "gallery"), { recursive: true });
  fs.mkdirSync(path.join(OUT_IMG, "hero"), { recursive: true });
  fs.mkdirSync(OUT_DATA, { recursive: true });

  const items = [];
  let i = 0;
  for (const [file, meta] of Object.entries(catalog)) {
    const src = path.join(SRC, "assets/images", file);
    if (!fs.existsSync(src)) continue;
    const slug = `${meta.category}-${String(i).padStart(3, "0")}`;
    const isHero = meta.hero === true && meta.quality >= 4;
    const dir = isHero ? "hero" : "gallery";
    const w = isHero ? HERO_W : THUMB_W;
    const out = path.join(OUT_IMG, dir, `${slug}.webp`);
    const img = sharp(src).rotate();
    const info = await img
      .resize({ width: w, withoutEnlargement: true })
      .webp({ quality: 80 })
      .toFile(out);
    // small blur placeholder
    const blur = await sharp(src)
      .resize({ width: 16 })
      .webp({ quality: 40 })
      .toBuffer();
    items.push({
      src: `/images/${dir}/${slug}.webp`,
      file,
      category: meta.category,
      alt: meta.alt,
      description: meta.description,
      quality: meta.quality,
      hero: isHero,
      finished: meta.finished === true,
      width: info.width,
      height: info.height,
      blur: `data:image/webp;base64,${blur.toString("base64")}`,
    });
    i++;
  }
  // sort: quality desc then category
  items.sort((a, b) => b.quality - a.quality || a.category.localeCompare(b.category));
  fs.writeFileSync(
    path.join(OUT_DATA, "gallery.json"),
    JSON.stringify(items, null, 1)
  );
  console.log(`wrote ${items.length} images`);
  const byCat = {};
  for (const it of items) byCat[it.category] = (byCat[it.category] || 0) + 1;
  console.log(byCat);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
