import {
  pgTable,
  serial,
  text,
  timestamp,
  boolean,
  jsonb,
  bigint,
  index,
  uniqueIndex,
} from "drizzle-orm/pg-core";

export const leads = pgTable(
  "leads",
  {
    id: serial("id").primaryKey(),
    kind: text("kind").notNull().default("quote"), // quote | contact | newsletter
    name: text("name").notNull(),
    email: text("email").notNull(),
    phone: text("phone"),
    city: text("city"),
    projectType: text("project_type"),
    budget: text("budget"),
    timeline: text("timeline"),
    preferredContact: text("preferred_contact"),
    message: text("message"),
    page: text("page"),
    utmSource: text("utm_source"),
    utmMedium: text("utm_medium"),
    utmCampaign: text("utm_campaign"),
    utmTerm: text("utm_term"),
    utmContent: text("utm_content"),
    emailOptIn: boolean("email_opt_in").notNull().default(false),
    status: text("status").notNull().default("new"), // new|contacted|qualified|won|lost|archived
    notes: text("notes"),
    emailSent: boolean("email_sent").notNull().default(false),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (t) => [
    index("leads_created_idx").on(t.createdAt),
    index("leads_status_idx").on(t.status),
    index("leads_kind_idx").on(t.kind),
  ]
);

export const visitors = pgTable(
  "visitors",
  {
    id: text("id").primaryKey(), // bc_vid cookie
    firstSeenAt: timestamp("first_seen_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
    lastSeenAt: timestamp("last_seen_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
    referrer: text("referrer"),
    utmSource: text("utm_source"),
    utmMedium: text("utm_medium"),
    utmCampaign: text("utm_campaign"),
    userAgent: text("user_agent"),
    device: text("device"),
    browser: text("browser"),
    ipHash: text("ip_hash"),
  },
  (t) => [index("visitors_last_seen_idx").on(t.lastSeenAt)]
);

export const sessions = pgTable(
  "sessions",
  {
    id: text("id").primaryKey(), // bc_sid cookie
    visitorId: text("visitor_id").notNull(),
    startedAt: timestamp("started_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
    lastSeenAt: timestamp("last_seen_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
    landingPath: text("landing_path"),
    referrer: text("referrer"),
    utmSource: text("utm_source"),
    utmMedium: text("utm_medium"),
    utmCampaign: text("utm_campaign"),
    userAgent: text("user_agent"),
    device: text("device"),
    browser: text("browser"),
    ipHash: text("ip_hash"),
    converted: boolean("converted").notNull().default(false),
  },
  (t) => [
    index("sessions_started_idx").on(t.startedAt),
    index("sessions_visitor_idx").on(t.visitorId),
  ]
);

export const events = pgTable(
  "events",
  {
    id: bigint("id", { mode: "number" }).primaryKey().generatedAlwaysAsIdentity(),
    ts: timestamp("ts", { withTimezone: true }).notNull().defaultNow(),
    event: text("event").notNull(),
    path: text("path").notNull(),
    sessionId: text("session_id"),
    visitorId: text("visitor_id"),
    referrer: text("referrer"),
    utmSource: text("utm_source"),
    utmMedium: text("utm_medium"),
    utmCampaign: text("utm_campaign"),
    device: text("device"),
    browser: text("browser"),
    ipHash: text("ip_hash"),
    props: jsonb("props"),
  },
  (t) => [
    index("events_ts_idx").on(t.ts),
    index("events_event_idx").on(t.event),
    index("events_path_idx").on(t.path),
    index("events_session_idx").on(t.sessionId),
  ]
);

export const posts = pgTable(
  "posts",
  {
    id: serial("id").primaryKey(),
    slug: text("slug").notNull(),
    title: text("title").notNull(),
    excerpt: text("excerpt").notNull().default(""),
    body: text("body").notNull().default(""),
    coverImage: text("cover_image"),
    coverAlt: text("cover_alt"),
    category: text("category").notNull().default("Guides"),
    tags: jsonb("tags").$type<string[]>().notNull().default([]),
    keywords: jsonb("keywords").$type<string[]>().notNull().default([]),
    metaTitle: text("meta_title"),
    metaDescription: text("meta_description"),
    author: text("author").notNull().default("Brady Construction"),
    status: text("status").notNull().default("draft"), // draft|published
    publishedAt: timestamp("published_at", { withTimezone: true }),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (t) => [
    uniqueIndex("posts_slug_idx").on(t.slug),
    index("posts_status_idx").on(t.status),
    index("posts_category_idx").on(t.category),
  ]
);

export const emailLog = pgTable(
  "email_log",
  {
    id: serial("id").primaryKey(),
    leadId: bigint("lead_id", { mode: "number" }),
    to: text("to").notNull(),
    subject: text("subject").notNull(),
    status: text("status").notNull().default("pending"), // sent|failed|skipped
    error: text("error"),
    sentAt: timestamp("sent_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (t) => [index("email_log_lead_idx").on(t.leadId)]
);

export type Lead = typeof leads.$inferSelect;
export type NewLead = typeof leads.$inferInsert;
export type Post = typeof posts.$inferSelect;
export type NewPost = typeof posts.$inferInsert;
export type AnalyticsEvent = typeof events.$inferSelect;
export type Session = typeof sessions.$inferSelect;
export type Visitor = typeof visitors.$inferSelect;
