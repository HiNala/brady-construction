"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    const dur = 1600;
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      const eased = 1 - Math.pow(1 - p, 4);
      setN(Math.round(to * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to]);

  return (
    <span ref={ref}>
      {n.toLocaleString()}
      {suffix}
    </span>
  );
}

export function Stats({
  items,
  dark = true,
}: {
  items: { value: number; suffix?: string; label: string }[];
  dark?: boolean;
}) {
  return (
    <dl className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-4">
      {items.map((s) => (
        <div key={s.label} className="flex flex-col text-center sm:text-left">
          <dt className="order-2 mt-2 text-[13px] font-medium uppercase tracking-[0.14em] text-bone/55">
            {s.label}
          </dt>
          <dd
            className={
              "order-1 display block text-5xl font-medium sm:text-6xl " +
              (dark ? "text-bone" : "text-ink")
            }
          >
            <Counter to={s.value} suffix={s.suffix} />
          </dd>
        </div>
      ))}
    </dl>
  );
}
