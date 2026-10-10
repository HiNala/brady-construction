import Link from "next/link";
import { cn } from "@/lib/utils";

/* ---------- Layout primitives ---------- */

export function Container({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn("mx-auto w-full max-w-6xl px-5 sm:px-8", className)}>
      {children}
    </div>
  );
}

export function Section({
  className,
  children,
  id,
  dark = false,
}: {
  className?: string;
  children: React.ReactNode;
  id?: string;
  dark?: boolean;
}) {
  return (
    <section
      id={id}
      className={cn(
        "relative py-20 sm:py-28",
        dark && "grain bg-ink text-bone",
        className
      )}
    >
      {children}
    </section>
  );
}

export function Kicker({
  children,
  className,
  light = false,
}: {
  children: React.ReactNode;
  className?: string;
  light?: boolean;
}) {
  return (
    <p
      className={cn(
        "kicker flex items-center gap-3",
        light ? "text-brass-bright" : "text-brass-deep",
        className
      )}
    >
      <span aria-hidden className="inline-block h-px w-8 bg-current" />
      {children}
    </p>
  );
}

export function Display({
  as: Tag = "h2",
  className,
  children,
}: {
  as?: "h1" | "h2" | "h3" | "p";
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <Tag className={cn("display font-medium leading-[1.04]", className)}>
      {children}
    </Tag>
  );
}

/* ---------- Buttons ---------- */

type ButtonProps = {
  href?: string;
  variant?: "brass" | "outline" | "outlineLight" | "ghost" | "ink";
  size?: "sm" | "md" | "lg";
  className?: string;
  children: React.ReactNode;
  type?: "button" | "submit";
  onClick?: () => void;
  disabled?: boolean;
  track?: string;
};

export function Button({
  href,
  variant = "brass",
  size = "md",
  className,
  children,
  type = "button",
  onClick,
  disabled,
  track,
}: ButtonProps) {
  const classes = cn(
    "group/btn relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full font-semibold tracking-wide transition-all duration-300 focus-visible:outline-2 focus-visible:outline-brass disabled:opacity-50 disabled:pointer-events-none",
    size === "sm" && "px-5 py-2.5 text-[13px]",
    size === "md" && "px-7 py-3.5 text-sm",
    size === "lg" && "px-9 py-4 text-base",
    variant === "brass" &&
      "bg-brass text-ink hover:bg-brass-bright active:scale-[0.98]",
    variant === "ink" &&
      "bg-ink text-bone hover:bg-coal active:scale-[0.98]",
    variant === "outline" &&
      "border border-ink/25 text-ink hover:border-ink hover:bg-ink hover:text-bone",
    variant === "outlineLight" &&
      "border border-bone/30 text-bone hover:border-bone hover:bg-bone hover:text-ink",
    variant === "ghost" && "text-ink underline-offset-4 hover:underline",
    className
  );
  const inner = (
    <>
      <span className="relative z-10 inline-flex items-center gap-2">
        {children}
      </span>
    </>
  );
  if (href) {
    return (
      <Link href={href} className={classes} data-track={track}>
        {inner}
      </Link>
    );
  }
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={classes}
      data-track={track}
    >
      {inner}
    </button>
  );
}

/* ---------- Form primitives ---------- */

export const inputCls =
  "w-full rounded-lg border border-ink/15 bg-cream px-4 py-3 text-[15px] text-ink placeholder:text-ink/40 transition-colors focus:border-brass focus:outline-none focus:ring-2 focus:ring-brass/25";

export const labelCls =
  "mb-1.5 block text-[13px] font-semibold uppercase tracking-[0.08em] text-ink/60";

export function FieldError({ children }: { children?: React.ReactNode }) {
  if (!children) return null;
  return <p className="mt-1.5 text-[13px] font-medium text-red-700">{children}</p>;
}
