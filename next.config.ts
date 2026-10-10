import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  async redirects() {
    // Legacy bradyremodel.com URLs — preserve inbound links & SEO equity
    return [
      { source: "/home.html", destination: "/", permanent: true },
      { source: "/index.html", destination: "/", permanent: true },
      { source: "/index.php", destination: "/", permanent: true },
      { source: "/services.html", destination: "/services", permanent: true },
      { source: "/quotes.html", destination: "/contact", permanent: true },
      { source: "/contact.html", destination: "/contact", permanent: true },
      { source: "/photos.html", destination: "/work", permanent: true },
      { source: "/gallery.html", destination: "/work", permanent: true },
      { source: "/videos.html", destination: "/work", permanent: true },
      { source: "/about.html", destination: "/about", permanent: true },
      { source: "/blog.html", destination: "/blog", permanent: true },
      { source: "/quote", destination: "/contact", permanent: true },
      { source: "/quotes", destination: "/contact", permanent: true },
    ];
  },
};

export default nextConfig;
