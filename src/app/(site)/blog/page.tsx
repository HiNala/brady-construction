import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { connection } from "next/server";
import { ArrowRight, Rss } from "lucide-react";
import { getPublishedPosts } from "@/lib/posts";
import { absoluteUrl, SITE } from "@/lib/site";
import { formatDate } from "@/lib/utils";
import { Container, Section, Kicker, Display } from "@/components/ui";
import { Reveal } from "@/components/reveal";
import { CtaBand } from "@/components/cta-band";

export const metadata: Metadata = {
  title: "The Journal — Bay Area Remodeling Guides & Cost Breakdowns",
  description:
    `Remodeling wisdom from ${SITE.yearsInBusiness} years of Bay Area building: real cost guides, structural explainers, planning playbooks for Sonoma, Marin, Napa, the Peninsula and SF.`,
  alternates: { canonical: absoluteUrl("/blog"), types: { "application/rss+xml": absoluteUrl("/feed.xml") } },
};

async function BlogList() {
  await connection();
  const posts = await getPublishedPosts();
  if (!posts.length) {
    return <p className="py-20 text-center text-ink/50">Articles coming soon.</p>;
  }
  const [first, ...rest] = posts;
  const cats = [...new Set(posts.map((p) => p.category))];

  return (
    <>
      {/* Category pills */}
      <div className="mb-12 flex flex-wrap gap-2">
        <Link href="/blog" className="rounded-full bg-ink px-4 py-2 text-[13px] font-semibold text-bone">All</Link>
        {cats.map((c) => (
          <Link
            key={c}
            href={`/blog/category/${encodeURIComponent(c.toLowerCase().replace(/\s+/g, "-"))}`}
            className="rounded-full border border-ink/15 bg-cream px-4 py-2 text-[13px] font-semibold text-ink/65 transition-colors hover:border-ink/35"
          >
            {c}
          </Link>
        ))}
      </div>

      {/* Featured */}
      <Reveal>
        <Link href={`/blog/${first.slug}`} className="card-lift group grid overflow-hidden rounded-3xl border border-ink/8 bg-cream lg:grid-cols-2">
          {first.coverImage && (
            <div className="zoom-frame relative aspect-[16/10] lg:aspect-auto lg:min-h-[380px]">
              <Image src={first.coverImage} alt={first.coverAlt || first.title} fill sizes="(max-width:1024px) 100vw, 50vw" className="object-cover" priority />
            </div>
          )}
          <div className="flex flex-col justify-center p-8 sm:p-12">
            <p className="kicker text-brass-deep">{first.category}</p>
            <h2 className="display mt-4 text-3xl font-medium leading-tight text-ink group-hover:text-brass-deep sm:text-4xl">
              {first.title}
            </h2>
            <p className="mt-4 text-[15px] leading-relaxed text-ink/60">{first.excerpt}</p>
            <p className="mt-6 text-[12px] font-semibold uppercase tracking-[0.14em] text-ink/40">
              {first.publishedAt ? formatDate(first.publishedAt) : ""} · {first.author}
            </p>
            <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-brass-deep">
              Read the guide <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </span>
          </div>
        </Link>
      </Reveal>

      {/* Grid */}
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {rest.map((p, i) => (
          <Reveal key={p.slug} delay={(i % 3) * 0.06}>
            <Link href={`/blog/${p.slug}`} className="card-lift group flex h-full flex-col overflow-hidden rounded-2xl border border-ink/8 bg-cream">
              {p.coverImage && (
                <div className="zoom-frame relative aspect-[16/10]">
                  <Image src={p.coverImage} alt={p.coverAlt || p.title} fill sizes="(max-width:1024px) 100vw, 33vw" className="object-cover" />
                </div>
              )}
              <div className="flex flex-1 flex-col p-6">
                <p className="kicker text-brass-deep">{p.category}</p>
                <h3 className="display mt-3 text-xl font-medium leading-snug text-ink group-hover:text-brass-deep">
                  {p.title}
                </h3>
                <p className="mt-3 line-clamp-3 flex-1 text-[13.5px] leading-relaxed text-ink/55">{p.excerpt}</p>
                <p className="mt-4 text-[12px] font-medium uppercase tracking-[0.12em] text-ink/40">
                  {p.publishedAt ? formatDate(p.publishedAt) : "Draft"}
                </p>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </>
  );
}

export default function BlogPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-ink pb-16 pt-40 text-bone sm:pt-48">
        <Container className="relative z-10">
          <Reveal><Kicker light>The Journal</Kicker></Reveal>
          <Reveal delay={0.06}>
            <Display as="h1" className="mt-5 max-w-3xl text-5xl text-bone sm:text-6xl">
              Remodeling wisdom, <br />honestly told
            </Display>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mt-6 flex max-w-2xl items-center gap-4 text-[16px] leading-relaxed text-bone/65">
              Cost guides, structural explainers and planning playbooks from
              four decades of Bay Area building.
              <a href="/feed.xml" aria-label="RSS feed" className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-bone/20 text-bone/60 transition-colors hover:text-brass-bright">
                <Rss className="h-4 w-4" />
              </a>
            </p>
          </Reveal>
        </Container>
        <div className="grain absolute inset-0" />
      </section>
      <Section className="bg-bone pt-14">
        <Container>
          <Suspense fallback={<div className="py-20 text-center text-ink/40">Loading articles…</div>}>
            <BlogList />
          </Suspense>
        </Container>
      </Section>
      <CtaBand title="Learned something? Let's talk projects." />
    </>
  );
}
