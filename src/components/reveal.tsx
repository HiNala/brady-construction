"use client";

import { useSyncExternalStore } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { cn } from "@/lib/utils";

const emptySubscribe = () => () => {};
const getTrue = () => true;
const getFalse = () => false;

const variants: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] },
  }),
};

export function Reveal({
  children,
  className,
  delay = 0,
  once = true,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  once?: boolean;
}) {
  const reduced = useReducedMotion();
  // SSR has no media query — always render the motion tree during hydration
  // (getServerSnapshot → false), then swap to a plain div once hydrated
  // when reduced motion is on. useSyncExternalStore avoids a hydration
  // mismatch AND the setState-in-effect anti-pattern.
  const mounted = useSyncExternalStore(emptySubscribe, getTrue, getFalse);
  if (mounted && reduced) return <div className={cn(className)}>{children}</div>;
  return (
    <motion.div
      className={cn(className)}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: "-80px" }}
      custom={delay}
    >
      {children}
    </motion.div>
  );
}

export function Stagger({
  children,
  className,
  step = 0.08,
}: {
  children: React.ReactNode[];
  className?: string;
  step?: number;
}) {
  return (
    <div className={className}>
      {children.map((child, i) => (
        <Reveal key={i} delay={i * step}>
          {child}
        </Reveal>
      ))}
    </div>
  );
}
