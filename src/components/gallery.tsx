"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Expand } from "lucide-react";
import { CATEGORY_LABELS } from "@/data/content";
import type { GalleryImage } from "@/lib/gallery";
import { cn } from "@/lib/utils";

export function GalleryGrid({ images }: { images: GalleryImage[] }) {
  const cats = useMemo(() => {
    const set = new Map<string, number>();
    images.forEach((i) => set.set(i.category, (set.get(i.category) ?? 0) + 1));
    return [...set.entries()].sort((a, b) => b[1] - a[1]);
  }, [images]);

  const [active, setActive] = useState("all");
  const [lightbox, setLightbox] = useState<number | null>(null);

  const filtered = useMemo(
    () => (active === "all" ? images : images.filter((i) => i.category === active)),
    [active, images]
  );

  const close = useCallback(() => setLightbox(null), []);
  const nav = useCallback(
    (dir: number) =>
      setLightbox((i) =>
        i === null ? null : (i + dir + filtered.length) % filtered.length
      ),
    [filtered.length]
  );

  useEffect(() => {
    if (lightbox === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") nav(1);
      if (e.key === "ArrowLeft") nav(-1);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [lightbox, close, nav]);

  return (
    <div>
      {/* Filter chips */}
      <div className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 pb-2 sm:mx-0 sm:flex-wrap sm:px-0">
        {[{ slug: "all", n: images.length }, ...cats.map(([slug, n]) => ({ slug, n }))].map(
          (c) => (
            <button
              key={c.slug}
              onClick={() => setActive(c.slug)}
              className={cn(
                "shrink-0 rounded-full border px-4 py-2 text-[13px] font-semibold transition-all",
                active === c.slug
                  ? "border-brass bg-ink text-bone"
                  : "border-ink/15 bg-cream text-ink/65 hover:border-ink/35"
              )}
            >
              {c.slug === "all" ? "All Work" : CATEGORY_LABELS[c.slug] ?? c.slug}
              <span className="ml-1.5 text-[11px] opacity-50">{c.n}</span>
            </button>
          )
        )}
      </div>

      {/* Masonry-ish grid */}
      <motion.div layout className="mt-8 columns-2 gap-4 sm:columns-3 lg:columns-4">
        <AnimatePresence mode="popLayout">
          {filtered.map((img, i) => (
            <motion.button
              layout
              key={img.src}
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.94 }}
              transition={{ duration: 0.35 }}
              onClick={() => {
                setLightbox(i);
                window.bctrack?.("gallery_view", { src: img.src, category: img.category });
              }}
              className="group relative mb-4 block w-full overflow-hidden rounded-xl text-left focus-visible:outline-2 focus-visible:outline-brass"
              aria-label={`View larger: ${img.alt}`}
            >
              <Image
                src={img.src}
                alt={img.alt}
                width={img.width}
                height={img.height}
                placeholder="blur"
                blurDataURL={img.blur}
                sizes="(max-width:640px) 50vw, (max-width:1024px) 33vw, 25vw"
                className="h-auto w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
              />
              <span className="absolute inset-0 flex items-end justify-between bg-gradient-to-t from-ink/55 via-transparent to-transparent p-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-bone/90">
                  {CATEGORY_LABELS[img.category] ?? img.category}
                </span>
                <Expand className="h-4 w-4 text-bone" />
              </span>
            </motion.button>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox !== null && filtered[lightbox] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80] flex items-center justify-center bg-ink/92 backdrop-blur-md"
            onClick={close}
            role="dialog"
            aria-modal="true"
            aria-label="Image lightbox"
          >
            <button
              onClick={close}
              aria-label="Close"
              className="absolute right-5 top-5 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-bone/25 text-bone transition-colors hover:bg-bone/10"
            >
              <X className="h-5 w-5" />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); nav(-1); }}
              aria-label="Previous image"
              className="absolute left-3 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-bone/25 text-bone transition-colors hover:bg-bone/10 sm:left-6"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); nav(1); }}
              aria-label="Next image"
              className="absolute right-3 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-bone/25 text-bone transition-colors hover:bg-bone/10 sm:right-6"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
            <motion.figure
              key={filtered[lightbox].src}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="max-h-[86vh] max-w-5xl px-14"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={filtered[lightbox].src}
                alt={filtered[lightbox].alt}
                width={filtered[lightbox].width}
                height={filtered[lightbox].height}
                className="max-h-[76vh] w-auto rounded-lg object-contain"
                priority
              />
              <figcaption className="mt-4 text-center text-sm text-bone/70">
                {filtered[lightbox].alt}
                <span className="ml-3 text-bone/40">
                  {lightbox + 1} / {filtered.length}
                </span>
              </figcaption>
            </motion.figure>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
