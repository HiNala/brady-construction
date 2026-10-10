import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { connection } from "next/server";
import { Suspense } from "react";
import { ArrowLeft, Clock, ArrowRight } from "lucide-react";
import { getPostBySlug, getPublishedPosts } from "@/lib/posts";
import { SEED_POSTS } from "@/data/posts";
import { renderMarkdown } from "@/lib/markdown";
import { SITE, absoluteUrl } from "@/lib/site";
import { formatDate, readingTime } from "@/lib/utils";
import { Container, Kicker, Display } from "@/components/ui";
import { Reveal } from "@/components/reveal";
import { ShareBar } from "@/components/share-bar";
import { CtaBand } from "@/components/cta-band";
import { NewsletterForm } from "@/components/forms/newsletter-form";
import { JsonLd } from "@/components/json-ld";

// Seed slugs prerender; DB-posts render on demand (blocking allowed)
export const instant = false;

export function generateStaticParams() {
  return SEED_POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return {};
  return {
    title: post.metaTitle || post.title,
    description: post.metaDescription || post.excerpt,
    keywords: post.keywords,
    alternates: { canonical: absoluteUrl(`/blog/${post.slug}`) },
    openGraph: {
      type: "article",
      title: post.metaTitle || post.title,
      description: post.metaDescription || post.excerpt,
      publishedTime: post.publishedAt?.toISOString(),
      authors: [post.author],
      images: post.coverImage ? [{ url: post.coverImage, alt: post.coverAlt || post.title }] : undefined,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const html = renderMarkdown(post.body);
  const mins = readingTime(post.body);
  const url = absoluteUrl(`/blog/${post.slug}`);

  return (
    <>
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "Article",
            headline: post.title,
            description: post.excerpt,
            image: post.coverImage ? absoluteUrl(post.coverImage) : undefined,
            author: { "@type": "Organization", name: post.author, url: SITE.url },
            publisher: { "@id": `${SITE.url}/#business` },
            datePublished: post.publishedAt?.toISOString(),
            dateModified: post.updatedAt.toISOString(),
            mainEntityOfPage: url,
            keywords: post.keywords.join(", "),
            articleSection: post.category,
          },
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
              { "@type": "ListItem", position: 2, name: "Journal", item: absoluteUrl("/blog") },
              { "@type": "ListItem", position: 3, name: post.title },
            ],
          },
        ]}
      />

      <section className="relative overflow-hidden bg-ink pb-14 pt-40 text-bone sm:pt-48">
        <Container className="relative z-10">
          <Reveal>
            <Link href="/blog" className="inline-flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.16em] text-bone/60 hover:text-bone">
              <ArrowLeft className="h-3.5 w-3.5" /> The Journal
            </Link>
          </Reveal>
          <Reveal delay={0.05}>
            <p className="kicker mt-8 text-brass-bright">{post.category}</p>
          </Reveal>
          <Reveal delay={0.08}>
            <Display as="h1" className="mt-4 max-w-4xl text-4xl text-bone sm:text-5xl lg:text-6xl">
              {post.title}
            </Display>
          </Reveal>
          <Reveal delay={0.14}>
            <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-[13px] text-bone/55">
              <span>{post.author}</span>
              <span aria-hidden>·</span>
              <span>{post.publishedAt ? formatDate(post.publishedAt) : "Draft"}</span>
              <span aria-hidden>·</span>
              <span className="inline-flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" /> {mins} min read</span>
            </div>
          </Reveal>
        </Container>
        <div className="grain absolute inset-0" />
      </section>

      <article className="bg-bone pb-24">
        <Container>
          {post.coverImage && (
            <Reveal className="zoom-frame relative -mt-2 aspect-[16/8] overflow-hidden rounded-2xl shadow-[var(--shadow-lift)]">
              <Image src={post.coverImage} alt={post.coverAlt || post.title} fill sizes="(max-width:1200px) 100vw, 1152px" className="object-cover" priority />
            </Reveal>
          )}
          <div className="mx-auto mt-12 max-w-3xl">
            <div
              className="prose-brady"
              dangerouslySetInnerHTML={{ __html: html }}
            />
            <div className="mt-12 flex flex-wrap items-center justify-between gap-6 border-t border-ink/10 pt-8">
              <ShareBar path={`/blog/${post.slug}`} title={post.title} text={post.excerpt} />
              <Link
                href="/contact"
                data-track="cta_click"
                data-track-label={`article_${post.slug}`}
                className="inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-semibold text-bone transition-colors hover:bg-coal"
              >
                Talk to us <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            {post.tags.length > 0 && (
              <div className="mt-8 flex flex-wrap gap-2">
                {post.tags.map((t) => (
                  <span key={t} className="rounded-full border border-ink/12 px-3 py-1.5 text-[12px] font-medium text-ink/55">
                    {t}
                  </span>
                ))}
              </div>
            )}

            <Reveal className="mt-12">
              <div className="rounded-2xl border border-ink/10 bg-cream p-7 sm:p-9">
                <h2 className="display text-2xl font-medium">Remodeling guides, by email</h2>
                <p className="mt-2 max-w-lg text-[14px] leading-relaxed text-ink/60">
                  Cost ranges, permit know-how and honest advice — a few times a
                  year, from a contractor who&apos;s been at it for four decades.
                </p>
                <div className="max-w-md">
                  <NewsletterForm variant="light" />
                </div>
              </div>
            </Reveal>
          </div>
        </Container>

        {/* Related */}
        <Suspense fallback={null}>
          <RelatedPosts slug={post.slug} category={post.category} />
        </Suspense>
      </article>

      <CtaBand title="Inspired? Let's talk about your place." />
    </>
  );
}

async function RelatedPosts({ slug, category }: { slug: string; category: string }) {
  await connection();
  const posts = await getPublishedPosts(4);
  const related = posts.filter((p) => p.slug !== slug);
  const sameCat = related.filter((p) => p.category === category);
  const picks = [...sameCat, ...related.filter((p) => p.category !== category)].slice(0, 3);
  if (!picks.length) return null;
  return (
    <Container className="pb-8">
      <Kicker>Keep reading</Kicker>
      <div className="mt-6 grid gap-5 sm:grid-cols-3">
        {picks.map((p) => (
          <Link
            key={p.slug}
            href={`/blog/${p.slug}`}
            className="group rounded-xl border border-ink/10 bg-cream p-5 transition-all hover:border-brass hover:shadow-[var(--shadow-card)]"
          >
            <span className="kicker text-brass-deep">{p.category}</span>
            <span className="display mt-2 block text-lg font-medium leading-snug text-ink group-hover:text-brass-deep">
              {p.title}
            </span>
          </Link>
        ))}
      </div>
    </Container>
  );
}
