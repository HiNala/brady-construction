"use client";

import { usePathname } from "next/navigation";
import { Suspense, useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";

declare global {
  interface Window {
    bctrack?: (event: string, props?: Record<string, unknown>) => void;
  }
}

function Beacon() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const lastPath = useRef<string>("");

  useEffect(() => {
    window.bctrack = (event, props) => {
      const utm: Record<string, string> = {};
      for (const k of ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"]) {
        const v = searchParams.get(k);
        if (v) utm[k] = v;
      }
      const payload = JSON.stringify({
        event,
        path: window.location.pathname,
        referrer: document.referrer || undefined,
        utm,
        props,
      });
      if (navigator.sendBeacon) {
        navigator.sendBeacon("/api/track", new Blob([payload], { type: "application/json" }));
      } else {
        fetch("/api/track", { method: "POST", body: payload, keepalive: true }).catch(() => {});
      }
    };
  }, [searchParams]);

  // pageview on route change
  useEffect(() => {
    if (!pathname || pathname.startsWith("/admin") || pathname === lastPath.current) return;
    lastPath.current = pathname;
    // slight delay so SPA title settles
    const t = setTimeout(() => window.bctrack?.("pageview"), 60);
    return () => clearTimeout(t);
  }, [pathname]);

  // delegated click tracking for data-track attributes
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const el = (e.target as HTMLElement).closest?.("[data-track]");
      if (!el) return;
      window.bctrack?.(el.getAttribute("data-track") || "cta_click", {
        label: el.getAttribute("data-track-label") ?? undefined,
        text: (el as HTMLElement).innerText?.slice(0, 80),
        href: (el as HTMLAnchorElement).href ?? undefined,
      });
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  return null;
}

export function Analytics() {
  return (
    <Suspense fallback={null}>
      <Beacon />
    </Suspense>
  );
}
