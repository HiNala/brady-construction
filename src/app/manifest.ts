import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE.name,
    short_name: "Brady Construction",
    description: SITE.description,
    start_url: "/",
    display: "standalone",
    background_color: "#16130e",
    theme_color: "#16130e",
    icons: [
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml" },
    ],
  };
}
