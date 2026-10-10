import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { connection } from "next/server";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { getPublishedPosts } from "@/lib/posts";
import { absoluteUrl } from "@/lib/site";
import { formatDate } from "@/lib/utils";
import { Container, Section, Display } from "@/components/ui";
import { Reveal } from "@/components/reveal";
import { CtaBand } from "@/components/cta-band";

// Category lists read the DB — request-time is fine for this route
export const instant = false;

function toSlug(c: string) {
  return c.toLowerCase().replace(/\s+/g, "-");
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category } = await params;
  const name = category.replace(/-/g, " ").replace(/\b\w/g, (m) => m.toUpperCase());
  return {
    title: `${name} — The Journal`,
    description: `${name} articles from Brady Construction: Bay Area remodeling guides and cost breakdowns.`,
    alternates: { canonical: absoluteUrl(`/blog/category/${category}`) },
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  await connection();
  const posts = await getPublishedPosts();
  const filtered = posts.filter((p) => toSlug(p.category) === category);
  if (!filtered.length) notFound();
  const name = filtered[0].category;

  return (
    <>
      <section className="relative overflow-hidden bg-ink pb-16 pt-40 text-bone sm:pt-48">
        <Container className="relative z-10">
          <Reveal>
            <Link href="/blog" className="inline-flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.16em] text-bone/60 hover:text-bone">
              <ArrowLeft className="h-3.5 w-3.5" /> All articles
            </Link>
          </Reveal>
          <Reveal delay={0.06}>
            <Display as="h1" className="mt-5 text-5xl text-bone sm:text-6xl">{name}</Display>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-4 text-[15px] text-bone/60">{filtered.length} article{filtered.length > 1 ? "s" : ""}</p>
          </Reveal>
        </Container>
        <div className="grain absolute inset-0" />
      </section>
      <Section className="bg-bone pt-14">
        <Container>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((p, i) => (
              <Reveal key={p.slug} delay={(i % 3) * 0.06}>
                <Link href={`/blog/${p.slug}`} className="card-lift group flex h-full flex-col overflow-hidden rounded-2xl border border-ink/8 bg-cream">
                  {p.coverImage && (
                    <div className="zoom-frame relative aspect-[16/10]">
                      <Image src={p.coverImage} alt={p.coverAlt || p.title} fill sizes="33vw" className="object-cover" />
                    </div>
                  )}
                  <div className="flex flex-1 flex-col p-6">
                    <p className="kicker text-brass-deep">{p.category}</p>
                    <h2 className="display mt-3 text-xl font-medium leading-snug text-ink group-hover:text-brass-deep">{p.title}</h2>
                    <p className="mt-3 line-clamp-3 flex-1 text-[13.5px] text-ink/55">{p.excerpt}</p>
                    <p className="mt-4 text-[12px] font-medium uppercase tracking-[0.12em] text-ink/40">
                      {p.publishedAt ? formatDate(p.publishedAt) : "Draft"}
                    </p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>
      <CtaBand />
    </>
  );
}
