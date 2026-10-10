import { NextResponse } from "next/server";
import { sql } from "drizzle-orm";
import { db } from "@/lib/db";
import { isAdmin } from "@/lib/auth";


export async function GET() {
  if (!(await isAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const [kpis] = await db.execute(sql`
    select
      (select count(*) from events where event = 'pageview')::int as pageviews,
      (select count(*) from visitors)::int as visitors,
      (select count(*) from sessions)::int as sessions,
      (select count(*) from leads where kind != 'newsletter')::int as leads,
      (select count(*) from leads where kind = 'newsletter')::int as subscribers,
      (select count(*) from events where event = 'cta_click')::int as cta_clicks,
      (select count(*) from events where event = 'share')::int as shares,
      (select count(*) from sessions where converted)::int as converted_sessions
  `);

  const daily = await db.execute(sql`
    select to_char(date_trunc('day', ts), 'YYYY-MM-DD') as day,
           count(*) filter (where event = 'pageview')::int as pageviews,
           count(distinct session_id)::int as sessions
    from events
    where ts > now() - interval '30 days'
    group by 1 order by 1
  `);

  const topPages = await db.execute(sql`
    select path, count(*)::int as views, count(distinct session_id)::int as uniques
    from events where event = 'pageview'
    group by path order by views desc limit 12
  `);

  const referrers = await db.execute(sql`
    select coalesce(nullif(referrer,''),'(direct)') as source, count(*)::int as hits
    from events where event = 'pageview' and ts > now() - interval '30 days'
    group by 1 order by hits desc limit 10
  `);

  const campaigns = await db.execute(sql`
    select utm_source as source, utm_medium as medium, utm_campaign as campaign, count(*)::int as hits
    from events where utm_source is not null
    group by 1,2,3 order by hits desc limit 10
  `);

  const devices = await db.execute(sql`
    select coalesce(device,'unknown') as device, count(*)::int as hits
    from events where event = 'pageview' group by 1 order by hits desc
  `);

  const funnel = await db.execute(sql`
    select event, count(*)::int as n
    from events
    where event in ('pageview','cta_click','form_start','form_submit','lead')
    group by 1
  `);

  const recentEvents = await db.execute(sql`
    select ts, event, path, device, browser, referrer, props
    from events order by ts desc limit 60
  `);

  const leadsTrend = await db.execute(sql`
    select to_char(date_trunc('day', created_at), 'YYYY-MM-DD') as day, count(*)::int as leads
    from leads group by 1 order by 1 desc limit 30
  `);

  return NextResponse.json({
    kpis: kpis ?? {},
    daily, topPages, referrers, campaigns, devices, funnel,
    recentEvents, leadsTrend,
  });
}
