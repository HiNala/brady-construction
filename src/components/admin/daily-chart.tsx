"use client";

export function DailyChart({
  data,
}: {
  data: { day: string; pageviews: number; sessions: number }[];
}) {
  if (!data.length) {
    return <p className="py-10 text-center text-sm text-bone/40">No traffic yet — data appears as visitors arrive.</p>;
  }
  const max = Math.max(...data.map((d) => d.pageviews), 1);
  return (
    <div className="flex h-44 items-end gap-[3px]">
      {data.map((d) => (
        <div key={d.day} className="group relative flex-1">
          <div
            className="w-full rounded-t-sm bg-brass/70 transition-colors group-hover:bg-brass-bright"
            style={{ height: `${Math.max(3, (d.pageviews / max) * 160)}px` }}
          />
          <div className="pointer-events-none absolute -top-12 left-1/2 z-10 -translate-x-1/2 whitespace-nowrap rounded-md border border-bone/15 bg-ink px-2.5 py-1.5 text-[11px] text-bone opacity-0 shadow-xl transition-opacity group-hover:opacity-100">
            {d.day.slice(5)} · {d.pageviews} views · {d.sessions} sess
          </div>
        </div>
      ))}
    </div>
  );
}
