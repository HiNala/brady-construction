"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

export function Faq({
  items,
  dark = false,
}: {
  items: { q: string; a: string }[];
  dark?: boolean;
}) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className={cn("divide-y", dark ? "divide-bone/10" : "divide-ink/10")}>
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={i}>
            <button
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-6 py-6 text-left"
            >
              <span
                className={cn(
                  "display text-lg font-medium sm:text-xl",
                  dark ? "text-bone" : "text-ink"
                )}
              >
                {item.q}
              </span>
              <span
                className={cn(
                  "flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-all duration-300",
                  isOpen
                    ? "rotate-45 border-brass bg-brass text-ink"
                    : dark
                      ? "border-bone/20 text-bone/60"
                      : "border-ink/15 text-ink/50"
                )}
              >
                <Plus className="h-4 w-4" />
              </span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <p
                    className={cn(
                      "max-w-3xl pb-7 pr-12 text-[15px] leading-relaxed",
                      dark ? "text-bone/65" : "text-ink/70"
                    )}
                  >
                    {item.a}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
