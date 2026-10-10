import galleryData from "@/data/gallery.json";

export type GalleryImage = {
  src: string;
  file: string;
  category: string;
  alt: string;
  description: string;
  quality: number;
  hero: boolean;
  finished: boolean;
  width: number;
  height: number;
  blur: string;
};

export const GALLERY: GalleryImage[] = galleryData as GalleryImage[];

export const HEROES = GALLERY.filter((g) => g.hero);

export function byCategory(cat: string): GalleryImage[] {
  return GALLERY.filter((g) => g.category === cat);
}

export function featured(n = 8): GalleryImage[] {
  return GALLERY.filter((g) => g.quality >= 4 && g.finished).slice(0, n);
}
