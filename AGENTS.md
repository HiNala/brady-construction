<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Project

Brady Construction Company site — Next.js 16 (cacheComponents + proxy.ts), Tailwind 4, Drizzle/Postgres.

## Commands

- `npm run dev` — dev server :3000
- `npm run db:dev` — embedded Postgres on :5432 (Windows-friendly, no Docker), creates tables + seeds. Keep running in a separate terminal.
- `npm run build` — typecheck + production build (must stay green)
- `npm run lint` — eslint (0 errors expected)
- `npm run db:seed` — re-seed articles (idempotent)
- `docker compose up --build` — full stack (db + seed + app); needs `.env` from `.env.example`

## Conventions

- Public pages live in `src/app/(site)/` (route group — supplies header/footer/chrome). Admin sits outside it.
- Request-time data (DB queries, `new Date()` where needed) must follow `await connection()` or live behind `instant = false` / `"use cache"` — Cache Components fails the build otherwise. Never call `new Date()` bare in render paths.
- Posts fall back to `src/data/posts.ts` seed data when Postgres is unreachable — the site must render with no DB.
- `src/proxy.ts` guards `/admin` + `/api/admin` (full verify is in `src/lib/auth.ts`).
- Business facts live in `src/lib/site.ts` — keep them accurate (no invented phone numbers).
