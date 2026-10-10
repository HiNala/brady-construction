import { Suspense } from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { StickyCta } from "@/components/sticky-cta";
import { Analytics } from "@/components/analytics";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-ink focus:px-5 focus:py-3 focus:text-sm focus:font-semibold focus:text-bone"
      >
        Skip to content
      </a>
      <Suspense fallback={null}>
        <Header />
      </Suspense>
      <main id="main">{children}</main>
      <Footer />
      <Suspense fallback={null}>
        <StickyCta />
      </Suspense>
      <Analytics />
    </>
  );
}
