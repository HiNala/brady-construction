-- Brady Construction — initial schema (idempotent)
-- Mounted at /docker-entrypoint-initdb.d/01-init.sql on first postgres boot.

CREATE TABLE IF NOT EXISTS leads (
  id               SERIAL PRIMARY KEY,
  kind             TEXT NOT NULL DEFAULT 'quote',
  name             TEXT NOT NULL,
  email            TEXT NOT NULL,
  phone            TEXT,
  city             TEXT,
  project_type     TEXT,
  budget           TEXT,
  timeline         TEXT,
  preferred_contact TEXT,
  message          TEXT,
  page             TEXT,
  utm_source       TEXT,
  utm_medium       TEXT,
  utm_campaign     TEXT,
  utm_term         TEXT,
  utm_content      TEXT,
  email_opt_in     BOOLEAN NOT NULL DEFAULT FALSE,
  status           TEXT NOT NULL DEFAULT 'new',
  notes            TEXT,
  email_sent       BOOLEAN NOT NULL DEFAULT FALSE,
  created_at       TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS leads_created_idx ON leads (created_at);
CREATE INDEX IF NOT EXISTS leads_status_idx  ON leads (status);
CREATE INDEX IF NOT EXISTS leads_kind_idx    ON leads (kind);

CREATE TABLE IF NOT EXISTS visitors (
  id            TEXT PRIMARY KEY,
  first_seen_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  last_seen_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  referrer      TEXT,
  utm_source    TEXT,
  utm_medium    TEXT,
  utm_campaign  TEXT,
  user_agent    TEXT,
  device        TEXT,
  browser       TEXT,
  ip_hash       TEXT
);
CREATE INDEX IF NOT EXISTS visitors_last_seen_idx ON visitors (last_seen_at);

CREATE TABLE IF NOT EXISTS sessions (
  id           TEXT PRIMARY KEY,
  visitor_id   TEXT NOT NULL,
  started_at   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  last_seen_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  landing_path TEXT,
  referrer     TEXT,
  utm_source   TEXT,
  utm_medium   TEXT,
  utm_campaign TEXT,
  user_agent   TEXT,
  device       TEXT,
  browser      TEXT,
  ip_hash      TEXT,
  converted    BOOLEAN NOT NULL DEFAULT FALSE
);
CREATE INDEX IF NOT EXISTS sessions_started_idx ON sessions (started_at);
CREATE INDEX IF NOT EXISTS sessions_visitor_idx ON sessions (visitor_id);

CREATE TABLE IF NOT EXISTS events (
  id          BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  ts          TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  event       TEXT NOT NULL,
  path        TEXT NOT NULL,
  session_id  TEXT,
  visitor_id  TEXT,
  referrer    TEXT,
  utm_source  TEXT,
  utm_medium  TEXT,
  utm_campaign TEXT,
  device      TEXT,
  browser     TEXT,
  ip_hash     TEXT,
  props       JSONB
);
CREATE INDEX IF NOT EXISTS events_ts_idx      ON events (ts);
CREATE INDEX IF NOT EXISTS events_event_idx   ON events (event);
CREATE INDEX IF NOT EXISTS events_path_idx    ON events (path);
CREATE INDEX IF NOT EXISTS events_session_idx ON events (session_id);

CREATE TABLE IF NOT EXISTS posts (
  id               SERIAL PRIMARY KEY,
  slug             TEXT NOT NULL,
  title            TEXT NOT NULL,
  excerpt          TEXT NOT NULL DEFAULT '',
  body             TEXT NOT NULL DEFAULT '',
  cover_image      TEXT,
  cover_alt        TEXT,
  category         TEXT NOT NULL DEFAULT 'Guides',
  tags             JSONB NOT NULL DEFAULT '[]',
  keywords         JSONB NOT NULL DEFAULT '[]',
  meta_title       TEXT,
  meta_description TEXT,
  author           TEXT NOT NULL DEFAULT 'Brady Construction',
  status           TEXT NOT NULL DEFAULT 'draft',
  published_at     TIMESTAMPTZ,
  created_at       TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at       TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE UNIQUE INDEX IF NOT EXISTS posts_slug_idx    ON posts (slug);
CREATE INDEX IF NOT EXISTS posts_status_idx         ON posts (status);
CREATE INDEX IF NOT EXISTS posts_category_idx       ON posts (category);

CREATE TABLE IF NOT EXISTS email_log (
  id       SERIAL PRIMARY KEY,
  lead_id  BIGINT,
  "to"     TEXT NOT NULL,
  subject  TEXT NOT NULL,
  status   TEXT NOT NULL DEFAULT 'pending',
  error    TEXT,
  sent_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS email_log_lead_idx ON email_log (lead_id);
