export function Marquee({ items }: { items: string[] }) {
  const doubled = [...items, ...items];
  return (
    <div className="relative overflow-hidden border-y border-ink/10 bg-linen py-4">
      <div className="flex w-max animate-marquee items-center gap-10 whitespace-nowrap">
        {doubled.map((item, i) => (
          <span
            key={i}
            className="flex items-center gap-10 text-[13px] font-semibold uppercase tracking-[0.2em] text-ink/45"
          >
            {item}
            <span aria-hidden className="text-brass">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
