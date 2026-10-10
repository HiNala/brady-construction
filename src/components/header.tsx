"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, ArrowRight, Hammer } from "lucide-react";
import { NAV, SITE } from "@/lib/site";
import { SERVICES } from "@/data/services";
import { cn } from "@/lib/utils";

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link
      href="/"
      className="group flex items-center gap-3"
      aria-label="Brady Construction Company — home"
    >
      <span
        className={cn(
          "flex h-10 w-10 items-center justify-center rounded-sm border font-display text-lg font-semibold transition-colors",
          light
            ? "border-brass-bright/60 bg-bone/5 text-brass-bright"
            : "border-brass bg-brass/10 text-brass-deep"
        )}
      >
        B
      </span>
      <span className="leading-tight">
        <span
          className={cn(
            "display block text-[17px] font-semibold tracking-[0.08em]",
            light ? "text-bone" : "text-ink"
          )}
        >
          BRADY
        </span>
        <span
          className={cn(
            "block text-[10px] font-semibold uppercase tracking-[0.24em]",
            light ? "text-bone/60" : "text-ink/55"
          )}
        >
          Construction Co.
        </span>
      </span>
    </Link>
  );
}

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [svcOpen, setSvcOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menus on navigation (render-time state adjustment — no effect needed)
  const [prevPath, setPrevPath] = useState(pathname);
  if (prevPath !== pathname) {
    setPrevPath(pathname);
    setOpen(false);
    setSvcOpen(false);
  }

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (pathname.startsWith("/admin")) return null;

  // Pages whose top section is dark (ink bg or hero image) get light header text
  const darkHero =
    ["/", "/work", "/about", "/blog", "/contact", "/areas"].includes(pathname) ||
    pathname.startsWith("/areas/") ||
    pathname.startsWith("/blog/") ||
    pathname.startsWith("/services/");
  const onDark = !scrolled && darkHero;

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-500",
          scrolled
            ? "border-b border-ink/8 bg-bone/90 shadow-[0_8px_30px_-12px_rgb(22_19_14/0.15)] backdrop-blur-xl"
            : "bg-transparent"
        )}
      >
        <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-5 sm:px-8">
          <Logo light={onDark} />

          <nav className="hidden items-center gap-7 lg:flex" aria-label="Main">
            {NAV.map((item) =>
              item.href === "/services" ? (
                <div
                  key={item.href}
                  className="relative"
                  onMouseEnter={() => setSvcOpen(true)}
                  onMouseLeave={() => setSvcOpen(false)}
                >
                  <Link
                    href="/services"
                    className={cn(
                      "link-sweep text-[13.5px] font-medium tracking-wide",
                      onDark ? "text-bone/85 hover:text-bone" : "text-ink/75 hover:text-ink",
                      pathname.startsWith("/services") && "font-semibold"
                    )}
                  >
                    Services
                  </Link>
                  <AnimatePresence>
                    {svcOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.25 }}
                        className="absolute left-1/2 top-full z-50 w-[560px] -translate-x-1/2 pt-4"
                      >
                        <div className="grid grid-cols-2 gap-1 rounded-2xl border border-ink/8 bg-cream p-3 shadow-[0_24px_60px_-16px_rgb(22_19_14/0.35)]">
                          {SERVICES.map((s) => (
                            <Link
                              key={s.slug}
                              href={`/services/${s.slug}`}
                              className="group rounded-xl px-4 py-3 transition-colors hover:bg-linen"
                            >
                              <span className="block text-[13.5px] font-semibold text-ink">
                                {s.shortTitle}
                              </span>
                              <span className="mt-0.5 block text-[12px] leading-snug text-ink/55">
                                {s.tagline}
                              </span>
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "link-sweep text-[13.5px] font-medium tracking-wide",
                    onDark ? "text-bone/85 hover:text-bone" : "text-ink/75 hover:text-ink",
                    pathname === item.href && "font-semibold"
                  )}
                >
                  {item.label}
                </Link>
              )
            )}
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/contact"
              data-track="cta_click"
              data-track-label="header_quote"
              className={cn(
                "hidden items-center gap-2 rounded-full px-6 py-2.5 text-[13px] font-semibold transition-all sm:inline-flex",
                onDark
                  ? "bg-bone text-ink hover:bg-brass-bright"
                  : "bg-ink text-bone hover:bg-brass-deep"
              )}
            >
              Get a Quote
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <button
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              className={cn(
                "flex h-10 w-10 items-center justify-center rounded-full lg:hidden",
                onDark ? "text-bone" : "text-ink"
              )}
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-ink/60 backdrop-blur-sm lg:hidden"
            onClick={() => setOpen(false)}
          >
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="grain absolute right-0 top-0 flex h-full w-[86%] max-w-sm flex-col bg-ink text-bone"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between border-b border-bone/10 px-6 py-5">
                <Logo light />
                <button
                  onClick={() => setOpen(false)}
                  aria-label="Close menu"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-bone/20"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <nav className="flex-1 overflow-y-auto px-6 py-6" aria-label="Mobile">
                {NAV.map((item, i) => (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * i }}
                  >
                    <Link
                      href={item.href}
                      className="display block border-b border-bone/8 py-4 text-2xl font-medium text-bone/90"
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ))}
                <div className="mt-6 space-y-1">
                  {SERVICES.map((s) => (
                    <Link
                      key={s.slug}
                      href={`/services/${s.slug}`}
                      className="block py-1.5 text-sm text-bone/60"
                    >
                      {s.shortTitle}
                    </Link>
                  ))}
                </div>
              </nav>
              <div className="border-t border-bone/10 p-6">
                <Link
                  href="/contact"
                  data-track="cta_click"
                  data-track-label="mobile_menu_quote"
                  className="flex w-full items-center justify-center gap-2 rounded-full bg-brass py-4 font-semibold text-ink"
                >
                  <Hammer className="h-4 w-4" />
                  Start Your Project
                </Link>
                <p className="mt-4 text-center text-xs text-bone/50">
                  CA License #{SITE.license} · Family owned since {SITE.founded}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
