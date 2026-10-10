import { sql } from "drizzle-orm";
import { db } from "@/lib/db";
import Link from "next/link";
import { ArrowRight, Inbox, Users, Eye, MousePointerClick, TrendingUp, Share2 } from "lucide-react";
import { connection } from "next/server";
import { DailyChart } from "@/components/admin/daily-chart";
import { formatDateTime } from "@/lib/utils";

// Admin is fully dynamic — opt out of instant-navigation validation
export const instant = false;

async function getStats() {
  await connection();
  const kpis = (await db.execute(sql`
    select
      (select count(*) from events where event='pageview')::int as pageviews,
      (select count(*) from visitors)::int as visitors,
      (select count(*) from sessions)::int as sessions,
      (select count(*) from leads where kind != 'newsletter')::int as leads,
      (select count(*) from leads where kind = 'newsletter')::int as subscribers,
      (select count(*) from leads where status = 'new')::int as new_leads,
      (select count(*) from events where event = 'cta_click')::int as cta_clicks,
      (select count(*) from events where event = 'share')::int as shares,
      (select count(*) from sessions where converted)::int as conversions
  `)) as unknown as Record<string, number>[];

  const daily = (await db.execute(sql`
    select to_char(date_trunc('day', ts), 'YYYY-MM-DD') as day,
           count(*) filter (where event='pageview')::int as pageviews,
           count(distinct session_id)::int as sessions
    from events where ts > now() - interval '30 days'
    group by 1 order by 1
  `)) as unknown as { day: string; pageviews: number; sessions: number }[];

  const topPages = (await db.execute(sql`
    select path, count(*)::int as views from events
    where event='pageview' group by path order by views desc limit 8
  `)) as unknown as { path: string; views: number }[];

  const recentLeads = (await db.execute(sql`
    select id, name, email, kind, project_type as "projectType", city, status, created_at as "createdAt"
    from leads order by created_at desc limit 6
  `)) as unknown as {
    id: number; name: string; email: string; kind: string;
    projectType: string | null; city: string | null; status: string; createdAt: string;
  }[];

  const referrers = (await db.execute(sql`
    select coalesce(nullif(referrer,''),'(direct)') as source, count(*)::int as hits
    from events where event='pageview' and ts > now() - interval '30 days'
    group by 1 order by hits desc limit 6
  `)) as unknown as { source: string; hits: number }[];

  return { kpis: kpis[0] ?? {}, daily, topPages, recentLeads, referrers };
}

export default async function AdminDashboard() {
  const { kpis, daily, topPages, recentLeads, referrers } = await getStats();

  const cards = [
    { label: "Visitors", value: kpis.visitors ?? 0, icon: Users, href: "/admin/analytics" },
    { label: "Pageviews", value: kpis.pageviews ?? 0, icon: Eye, href: "/admin/analytics" },
    { label: "Leads", value: kpis.leads ?? 0, icon: Inbox, href: "/admin/leads" },
    { label: "CTA clicks", value: kpis.cta_clicks ?? 0, icon: MousePointerClick, href: "/admin/analytics" },
    { label: "Shares", value: kpis.shares ?? 0, icon: Share2, href: "/admin/analytics" },
    { label: "Converted sessions", value: kpis.conversions ?? 0, icon: TrendingUp, href: "/admin/leads" },
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="display text-3xl font-medium">Dashboard</h1>
        {(kpis.new_leads ?? 0) > 0 && (
          <Link href="/admin/leads" className="flex items-center gap-2 rounded-full bg-brass px-4 py-2 text-[13px] font-bold text-ink">
            {kpis.new_leads} new lead{kpis.new_leads === 1 ? "" : "s"} <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-6">
        {cards.map((c) => (
          <Link
            key={c.label}
            href={c.href}
            className="rounded-xl border border-bone/10 bg-coal p-5 transition-colors hover:border-brass/40"
          >
            <c.icon className="h-4 w-4 text-brass-bright" />
            <p className="display mt-3 text-3xl font-medium">{c.value.toLocaleString()}</p>
            <p className="mt-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-bone/45">{c.label}</p>
          </Link>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.6fr_1fr]">
        <div className="rounded-xl border border-bone/10 bg-coal p-6">
          <h2 className="mb-4 text-[13px] font-semibold uppercase tracking-[0.14em] text-bone/50">
            Traffic — last 30 days
          </h2>
          <DailyChart data={daily} />
        </div>
        <div className="rounded-xl border border-bone/10 bg-coal p-6">
          <h2 className="mb-4 text-[13px] font-semibold uppercase tracking-[0.14em] text-bone/50">
            Top referrers (30d)
          </h2>
          <ul className="space-y-3">
            {referrers.length === 0 && <li className="text-sm text-bone/40">No traffic yet.</li>}
            {referrers.map((r) => (
              <li key={r.source} className="flex items-center justify-between gap-3 text-[13px]">
                <span className="truncate text-bone/70">{r.source.replace(/^https?:\/\//, "").slice(0, 40)}</span>
                <span className="font-semibold text-brass-bright">{r.hits}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <div className="rounded-xl border border-bone/10 bg-coal p-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-[13px] font-semibold uppercase tracking-[0.14em] text-bone/50">Recent leads</h2>
            <Link href="/admin/leads" className="text-[12px] font-semibold text-brass-bright hover:underline">
              View all
            </Link>
          </div>
          <div className="divide-y divide-bone/8">
            {recentLeads.length === 0 && (
              <p className="py-6 text-sm text-bone/40">No leads yet — they&apos;ll land here when the first form is submitted.</p>
            )}
            {recentLeads.map((l) => (
              <div key={l.id} className="flex items-center justify-between gap-4 py-3">
                <div className="min-w-0">
                  <p className="truncate text-[14px] font-semibold text-bone">{l.name}</p>
                  <p className="truncate text-[12px] text-bone/45">
                    {[l.kind, l.projectType, l.city].filter(Boolean).join(" · ")}
                  </p>
                </div>
                <div className="text-right">
                  <span className={`inline-block rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider ${l.status === "new" ? "bg-brass/20 text-brass-bright" : "bg-bone/10 text-bone/50"}`}>
                    {l.status}
                  </span>
                  <p className="mt-1 text-[11px] text-bone/35">{formatDateTime(l.createdAt)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-xl border border-bone/10 bg-coal p-6">
          <h2 className="mb-4 text-[13px] font-semibold uppercase tracking-[0.14em] text-bone/50">Top pages</h2>
          <ul className="space-y-3">
            {topPages.length === 0 && <li className="text-sm text-bone/40">No pageviews recorded yet.</li>}
            {topPages.map((p) => (
              <li key={p.path} className="flex items-center justify-between gap-3 text-[13px]">
                <span className="truncate text-bone/70">{p.path}</span>
                <span className="font-semibold text-brass-bright">{p.views}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
