import { sql } from "drizzle-orm";
import { connection } from "next/server";
import { db } from "@/lib/db";
import { DailyChart } from "@/components/admin/daily-chart";

export default async function AdminAnalyticsPage() {
  await connection();

  const daily = (await db.execute(sql`
    select to_char(date_trunc('day', ts), 'YYYY-MM-DD') as day,
           count(*) filter (where event='pageview')::int as pageviews,
           count(distinct session_id)::int as sessions
    from events where ts > now() - interval '30 days' group by 1 order by 1
  `)) as unknown as { day: string; pageviews: number; sessions: number }[];

  const funnel = (await db.execute(sql`
    select event, count(*)::int as n from events
    where event in ('pageview','cta_click','form_start','form_submit','lead')
    group by 1
  `)) as unknown as { event: string; n: number }[];

  const topPages = (await db.execute(sql`
    select path, count(*)::int as views, count(distinct session_id)::int as uniques
    from events where event='pageview' group by path order by views desc limit 15
  `)) as unknown as { path: string; views: number; uniques: number }[];

  const devices = (await db.execute(sql`
    select coalesce(device,'unknown') as device, count(*)::int as hits
    from events where event='pageview' group by 1 order by hits desc
  `)) as unknown as { device: string; hits: number }[];

  const browsers = (await db.execute(sql`
    select coalesce(browser,'unknown') as browser, count(*)::int as hits
    from events where event='pageview' group by 1 order by hits desc limit 6
  `)) as unknown as { browser: string; hits: number }[];

  const campaigns = (await db.execute(sql`
    select utm_source as source, utm_medium as medium, utm_campaign as campaign, count(*)::int as hits
    from events where utm_source is not null group by 1,2,3 order by hits desc limit 10
  `)) as unknown as { source: string; medium: string; campaign: string; hits: number }[];

  const referrers = (await db.execute(sql`
    select coalesce(nullif(referrer,''),'(direct)') as source, count(*)::int as hits
    from events where event='pageview' and ts > now() - interval '30 days'
    group by 1 order by hits desc limit 10
  `)) as unknown as { source: string; hits: number }[];

  const eventOrder = ["pageview", "cta_click", "form_start", "form_submit", "lead"];
  const funnelMap = Object.fromEntries(funnel.map((f) => [f.event, f.n]));
  const funnelMax = funnelMap.pageview || 1;
  const deviceTotal = devices.reduce((a, d) => a + d.hits, 0) || 1;

  return (
    <div className="space-y-8">
      <h1 className="display text-3xl font-medium">Analytics</h1>

      <div className="rounded-xl border border-bone/10 bg-coal p-6">
        <h2 className="mb-4 text-[13px] font-semibold uppercase tracking-[0.14em] text-bone/50">
          Traffic — last 30 days
        </h2>
        <DailyChart data={daily} />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Funnel */}
        <div className="rounded-xl border border-bone/10 bg-coal p-6">
          <h2 className="mb-5 text-[13px] font-semibold uppercase tracking-[0.14em] text-bone/50">
            Conversion funnel
          </h2>
          <div className="space-y-3">
            {eventOrder.map((e) => {
              const n = funnelMap[e] ?? 0;
              const pct = Math.max(2, Math.round((n / funnelMax) * 100));
              return (
                <div key={e}>
                  <div className="mb-1 flex justify-between text-[12px]">
                    <span className="font-medium capitalize text-bone/65">{e.replace("_", " ")}</span>
                    <span className="font-semibold text-brass-bright">{n}</span>
                  </div>
                  <div className="h-2.5 overflow-hidden rounded-full bg-bone/8">
                    <div className="h-full rounded-full bg-brass transition-all" style={{ width: `${pct}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Devices */}
        <div className="rounded-xl border border-bone/10 bg-coal p-6">
          <h2 className="mb-5 text-[13px] font-semibold uppercase tracking-[0.14em] text-bone/50">Devices</h2>
          <div className="space-y-3">
            {devices.map((d) => (
              <div key={d.device}>
                <div className="mb-1 flex justify-between text-[12px]">
                  <span className="font-medium capitalize text-bone/65">{d.device}</span>
                  <span className="font-semibold text-brass-bright">
                    {d.hits} ({Math.round((d.hits / deviceTotal) * 100)}%)
                  </span>
                </div>
                <div className="h-2.5 overflow-hidden rounded-full bg-bone/8">
                  <div className="h-full rounded-full bg-sage" style={{ width: `${(d.hits / deviceTotal) * 100}%` }} />
                </div>
              </div>
            ))}
          </div>
          <h3 className="mb-3 mt-8 text-[13px] font-semibold uppercase tracking-[0.14em] text-bone/50">Browsers</h3>
          <ul className="space-y-2">
            {browsers.map((b) => (
              <li key={b.browser} className="flex justify-between text-[13px]">
                <span className="text-bone/65">{b.browser}</span>
                <span className="font-semibold text-bone/80">{b.hits}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-xl border border-bone/10 bg-coal p-6">
          <h2 className="mb-4 text-[13px] font-semibold uppercase tracking-[0.14em] text-bone/50">Top pages</h2>
          <table className="w-full text-left text-[13px]">
            <thead>
              <tr className="border-b border-bone/10 text-[11px] uppercase tracking-wider text-bone/40">
                <th className="pb-2">Path</th><th className="pb-2 text-right">Views</th><th className="pb-2 text-right">Uniques</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-bone/8">
              {topPages.map((p) => (
                <tr key={p.path}>
                  <td className="py-2.5 pr-4 text-bone/75">{p.path}</td>
                  <td className="py-2.5 text-right font-semibold text-bone">{p.views}</td>
                  <td className="py-2.5 text-right text-bone/55">{p.uniques}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="space-y-6">
          <div className="rounded-xl border border-bone/10 bg-coal p-6">
            <h2 className="mb-4 text-[13px] font-semibold uppercase tracking-[0.14em] text-bone/50">Referrers (30d)</h2>
            <ul className="space-y-2.5">
              {referrers.map((r) => (
                <li key={r.source} className="flex justify-between gap-3 text-[13px]">
                  <span className="truncate text-bone/65">{r.source.replace(/^https?:\/\//, "").slice(0, 44)}</span>
                  <span className="font-semibold text-bone">{r.hits}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-xl border border-bone/10 bg-coal p-6">
            <h2 className="mb-4 text-[13px] font-semibold uppercase tracking-[0.14em] text-bone/50">UTM campaigns</h2>
            {campaigns.length === 0 ? (
              <p className="text-sm text-bone/40">No campaign traffic yet — tag links with ?utm_source= to see results here.</p>
            ) : (
              <ul className="space-y-2.5">
                {campaigns.map((c, i) => (
                  <li key={i} className="flex justify-between gap-3 text-[13px]">
                    <span className="truncate text-bone/65">{c.source} / {c.medium ?? "—"} / {c.campaign ?? "—"}</span>
                    <span className="font-semibold text-bone">{c.hits}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
