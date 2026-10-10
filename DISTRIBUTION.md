# Distribution Plan — Brady Construction

How this site gets found, indexed, and turned into leads. What the code already
supports, what needs manual setup, and the operating cadence.

## What's already wired into the codebase

| Channel | Support | Where |
|---|---|---|
| Google / Bing | Sitemap + images + lastmod | `src/app/sitemap.ts` |
| Robots | Sitemap pointer, admin/API excluded | `src/app/robots.ts` |
| RSS | `/feed.xml` + autodiscovery `link` in head | `src/app/feed.xml/`, layout metadata |
| AI engines | `/llms.txt` full site summary | `public/llms.txt` |
| Open Graph / Twitter | Branded OG card on every page + article covers | `metadata.openGraph`, `opengraph-image` |
| Local SEO | `GeneralContractor` + `HomeAndConstructionBusiness` JSON-LD: license, geo, 6-county areaServed, `sameAs` YouTube | `src/app/layout.tsx` |
| IndexNow | `npm run indexnow` pushes all URLs to Bing/Yandex/Naver | `scripts/indexnow.mjs` |
| Email | Newsletter capture (footer + every blog post) | `NewsletterForm` → `/api/lead` |
| Share | Share bars on articles + work gallery | `ShareBar` |
| YouTube | Embedded walkthroughs on `/work` | `YoutubeEmbed` |
| Verification | `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` / `NEXT_PUBLIC_BING_VERIFICATION` env → meta tags | layout `metadata.verification` |
| Blog SEO | 13 articles, TOC anchors, Person author, internal link cluster | `src/app/(site)/blog/` |
| Structured data | Article, FAQPage, BreadcrumbList, Service, ContactPage | per-page `JsonLd` |

## Manual setup (30 min, one-time)

1. **Google Search Console** — create property for `bradyremodel.com`, grab the
   meta-tag token, set `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` env var, redeploy,
   then submit `https://bradyremodel.com/sitemap.xml`.
2. **Bing Webmaster Tools** — same flow with `NEXT_PUBLIC_BING_VERIFICATION`;
   IndexNow runs instantly once verified.
3. **Google Business Profile** — claim "Brady Construction Company", 8 Cedar
   Lane Woodside; website → bradyremodel.com; add license #, service areas
   (Sonoma/Marin/Napa/San Mateo/SF/East Bay), hours = "by appointment". This
   drives the local map pack — the #1 lead source for contractors.
4. **Bing Places** — sync from GBP (built-in import).
5. **Directory citations** (NAP consistency: same name/address/email everywhere):
   Houzz Pro, Yelp for Business, Nextdoor Business, Angi, HomeAdvisor,
   Nextdoor, LinkedIn Company, BBB, local permit lists where public.

## Operating cadence

**Weekly**
- Publish 1 journal article (admin → `/admin/blog/new`). Target the unanswered
  Bay Area queries: permit guides, cost ranges, county-specific pages.
- Run `npm run indexnow /blog/<new-slug>` after publishing.

**Monthly**
- GBP: upload 4–8 real project photos (from `public/images/gallery`).
- Check Search Console: coverage errors, top queries, click-through rates.
- Adjust article meta descriptions for low-CTR keywords.

**Quarterly**
- Post a YouTube walkthrough → embed on `/work` (add to `YT_VIDEOS`).
- Refresh the 2–3 highest-traffic articles (updated stats → `dateModified`
  bumps automatically when you edit in admin).
- GBP posts: a "before/after" mini-feature.

## Content priorities (next articles)

- "Do I Need a Permit to Remodel? Bay Area Guide by City" (permit queries are
  huge and hyper-local)
- "Bathroom Remodel Timeline" (pairs with the existing timeline post)
- "ADU Cost in the Bay Area" (extends the ADU-vs-addition cluster)
- County pages: "Kitchen Remodel Cost in Marin / Woodside / San Francisco"
  (the Sonoma bathroom post proves the formula)

## Email distribution

Leads + newsletter signups already land in Postgres (`leads` table, kind =
`newsletter`). To send: export from `/admin/leads`, use any ESP (Mailchimp,
Buttondown, Substack) — or wire `RESEND_API_KEY` and send from the domain.
Cadence: quarterly is plenty — the list is small and valuable.

## Measurement

The funnel is instrumented: `pageview → cta_click → form_start →
form_submit → lead` events stream to `/api/track`, visible in
`/admin/analytics`. UTM params on shared links (`?utm_source=newsletter`)
surface in the analytics view. Watch `cta_click` rate on `/blog/*` — that's
the content-funnel health check.
