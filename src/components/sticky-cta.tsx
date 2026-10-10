"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Mail } from "lucide-react";
import { SITE } from "@/lib/site";

export function StickyCta() {
  const pathname = usePathname();
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > window.innerHeight * 0.6);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (pathname.startsWith("/admin") || pathname === "/contact") return null;

  return (
    <AnimatePresence>
      {show && (
        <>
        <motion.div
          initial={{ y: 90, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 90, opacity: 0 }}
          transition={{ type: "spring", damping: 26, stiffness: 260 }}
          className="fixed bottom-5 right-5 z-40 hidden lg:block"
        >
          <Link
            href="/contact"
            data-track="cta_click"
            data-track-label="sticky_desktop"
            className="group flex items-center gap-3 rounded-full bg-brass py-3.5 pl-6 pr-3.5 text-sm font-bold text-ink shadow-[var(--shadow-lift)] transition-colors hover:bg-brass-bright"
          >
            Get a Free Quote
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-ink/10 transition-transform group-hover:translate-x-0.5">
              <ArrowRight className="h-4 w-4" />
            </span>
          </Link>
        </motion.div>
        <motion.div
          initial={{ y: 90 }}
          animate={{ y: 0 }}
          exit={{ y: 90 }}
          transition={{ type: "spring", damping: 26, stiffness: 260 }}
          className="fixed inset-x-0 bottom-0 z-40 border-t border-bone/10 bg-ink/92 p-3 backdrop-blur-xl lg:hidden"
        >
          <div className="flex items-center gap-3">
            <a
              href={`mailto:${SITE.email}`}
              data-track="email_click"
              data-track-label="sticky"
              aria-label="Email Brady Construction"
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-bone/20 text-bone"
            >
              <Mail className="h-5 w-5" />
            </a>
            <Link
              href="/contact"
              data-track="cta_click"
              data-track-label="sticky_mobile"
              className="flex h-12 flex-1 items-center justify-center gap-2 rounded-full bg-brass text-sm font-bold text-ink"
            >
              Get a Free Quote <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
