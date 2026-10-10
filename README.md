# Brady Construction Company — Website

Premium 2026 rebuild of [bradyremodel.com](http://bradyremodel.com): a Next.js marketing +
lead-generation platform for Brady Construction Company, a family-owned general contractor
(CA License #479385) serving the Bay Area, Wine Country, and Northern California since 1980.

## Stack

- **Next.js 16** (App Router, Cache Components, Partial Prerendering, `proxy.ts`)
- **React 19** + TypeScript + Tailwind CSS 4 + Framer Motion + Lucide
- **PostgreSQL** (Drizzle ORM + `postgres`) — leads, analytics, blog posts
- **Auth**: HMAC session cookie (`/admin`)
- **Email**: Resend or SMTP via nodemailer
- **Docker**: multi-stage `Dockerfile` (standalone output) + `docker-compose.yml` (app + Postgres + seed)

## Features

- **Marketing site** — home, 8 service pages, project gallery (~50 real photos), about,
  6 service-area pages, contact, legal pages
- **Blog ("The Journal")** — 11 SEO-targeted starter articles, markdown → sanitized HTML,
  categories, related posts, share bar, RSS feed
- **Quote funnel** — 3-step form → `/api/lead` → Postgres + email forward (Resend/SMTP)
- **Privacy-first analytics** — beacon endpoint, hashed IPs, visitor/session/events tables
- **Admin** (`/admin`) — dashboard, lead inbox w/ status management, analytics, blog CRUD
- **SEO/AEO/GEO** — per-page metadata, JSON-LD (contractor + article), OG/Twitter images,
  sitemap, robots, RSS, `llms.txt`, canonical URLs

## Quick start (local, no Docker)

```bash
npm ci
npm run db:dev    # boots embedded Postgres on :5432, creates tables, seeds articles
npm run dev       # http://localhost:3000
```

Admin: `http://localhost:3000/admin` — credentials come from `.env.local`
(see `.env.example`; the site works without a DB — it falls back to built-in article data).

## Quick start (Docker)

```bash
cp .env.example .env   # set ADMIN_PASSWORD + SESSION_SECRET
docker compose up --build
```

`db` runs `db/init.sql` on first boot; `seed` inserts the starter articles; `app` serves on :3000.

## Database

Schema lives in `src/lib/db/schema.ts` (tables: `leads`, `visitors`, `sessions`,
`events`, `posts`, `email_log`). `db/init.sql` is the authoritative bootstrap DDL.

- `npm run db:dev` — embedded local Postgres (Windows-friendly, no Docker/admin rights)
- `npm run db:push` — `drizzle-kit push` (schema → connected DB)
- `npm run db:seed` — insert starter articles (idempotent)
- `npm run db:studio` — Drizzle Studio

## Environment

See `.env.example`. Required for production:

| Var | Purpose |
|---|---|
| `DATABASE_URL` | Postgres connection string |
| `NEXT_PUBLIC_SITE_URL` | Canonical origin (metadata, sitemap, RSS) |
| `ADMIN_EMAIL` / `ADMIN_PASSWORD` | `/admin` credentials |
| `SESSION_SECRET` | HMAC key for admin sessions |
| `RESEND_API_KEY` **or** `SMTP_*` | Lead email forwarding (optional — leads always land in DB) |
| `LEAD_EMAIL_TO` / `LEAD_EMAIL_FROM` | Lead notification addresses |

## Checks

```bash
npm run lint        # eslint
npm run build       # typecheck + production build
```

## Structure

```
src/app/(site)/       public pages (route group — header/footer chrome)
src/app/admin/        owner dashboard (protected by src/proxy.ts)
src/app/api/          lead capture, tracking beacon, admin CRUD
src/components/       design system, forms, admin tables
src/data/             services, areas, seed articles, gallery manifest
src/lib/              site constants, db, auth, email, markdown, analytics
public/images/        real project photography (hero + gallery)
db/init.sql           idempotent bootstrap schema
scripts/              build-images, seed, dev-db
```
