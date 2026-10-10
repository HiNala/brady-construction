import Link from "next/link";
import Image from "next/image";
import { connection } from "next/server";
import { ArrowRight } from "lucide-react";
import { getPublishedPosts } from "@/lib/posts";
import { Container, Section, Kicker, Display } from "@/components/ui";
import { Reveal } from "@/components/reveal";
import { formatDate } from "@/lib/utils";

export async function BlogPreview() {
  await connection();
  const posts = await getPublishedPosts(3);
  if (!posts.length) return null;

  return (
    <Section className="bg-linen">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <Reveal><Kicker>09 — The Journal</Kicker></Reveal>
            <Reveal delay={0.05}>
              <Display className="mt-5 text-4xl sm:text-5xl">Remodeling wisdom, honestly told</Display>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <Link href="/blog" className="group inline-flex items-center gap-2 text-sm font-semibold text-brass-deep hover:text-ink">
              All articles <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Reveal>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((p, i) => (
            <Reveal key={p.slug} delay={i * 0.08}>
              <Link
                href={`/blog/${p.slug}`}
                className="card-lift group block overflow-hidden rounded-2xl border border-ink/8 bg-cream"
              >
                {p.coverImage && (
                  <div className="zoom-frame relative aspect-[16/10]">
                    <Image
                      src={p.coverImage}
                      alt={p.coverAlt || p.title}
                      fill
                      sizes="(max-width:1024px) 100vw, 33vw"
                      className="object-cover"
                    />
                  </div>
                )}
                <div className="p-6">
                  <p className="kicker text-brass-deep">{p.category}</p>
                  <h3 className="display mt-3 text-xl font-medium leading-snug text-ink group-hover:text-brass-deep">
                    {p.title}
                  </h3>
                  <p className="mt-3 line-clamp-2 text-[13.5px] leading-relaxed text-ink/55">
                    {p.excerpt}
                  </p>
                  <p className="mt-4 text-[12px] font-medium uppercase tracking-[0.12em] text-ink/40">
                    {p.publishedAt ? formatDate(p.publishedAt) : "Coming soon"}
                  </p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
