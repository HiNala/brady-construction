import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Check, ArrowLeft } from "lucide-react";
import { SERVICES, serviceBySlug } from "@/data/services";
import { SITE, absoluteUrl } from "@/lib/site";
import { byCategory } from "@/lib/gallery";
import { Container, Section, Kicker, Display, Button } from "@/components/ui";
import { Reveal } from "@/components/reveal";
import { Faq } from "@/components/faq";
import { CtaBand } from "@/components/cta-band";
import { JsonLd } from "@/components/json-ld";
import { GalleryGrid } from "@/components/gallery";

const CATEGORY_MAP: Record<string, string> = {
  "kitchen-remodeling": "kitchen",
  "bathroom-remodeling": "bathroom",
  "home-additions": "addition",
  basements: "basement",
  "foundations-seismic": "foundation",
  "concrete-exterior": "concrete",
  "custom-builds": "exterior",
  "owner-builder": "addition",
};

export function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const s = serviceBySlug(slug);
  if (!s) return {};
  return {
    title: `${s.title} — Bay Area`,
    description: `${s.description} Licensed CA general contractor #${SITE.license}, serving the Bay Area since ${SITE.founded}.`,
    keywords: [...s.keywords, `${s.shortTitle} bay area`, `${s.shortTitle} sonoma`, `${s.shortTitle} woodside`],
    alternates: { canonical: absoluteUrl(`/services/${slug}`) },
    openGraph: {
      title: `${s.title} | ${SITE.shortName}`,
      description: s.description,
      images: [{ url: s.image, alt: s.imageAlt }],
    },
  };
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const s = serviceBySlug(slug);
  if (!s) notFound();

  const others = SERVICES.filter((x) => x.slug !== slug).slice(0, 4);
  const galleryCat = CATEGORY_MAP[slug];
  const imgs = galleryCat ? byCategory(galleryCat).filter((g) => g.quality >= 3) : [];

  return (
    <>
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "Service",
            name: s.title,
            description: s.description,
            provider: { "@id": `${SITE.url}/#business` },
            areaServed: "San Francisco Bay Area",
            url: absoluteUrl(`/services/${slug}`),
          },
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
              { "@type": "ListItem", position: 2, name: "Services", item: absoluteUrl("/services") },
              { "@type": "ListItem", position: 3, name: s.shortTitle },
            ],
          },
          ...(s.faqs.length
            ? [{
                "@context": "https://schema.org",
                "@type": "FAQPage",
                mainEntity: s.faqs.map((f) => ({
                  "@type": "Question",
                  name: f.q,
                  acceptedAnswer: { "@type": "Answer", text: f.a },
                })),
              }]
            : []),
        ]}
      />

      {/* Hero */}
      <section className="relative flex min-h-[70svh] items-end overflow-hidden bg-ink pt-24 text-bone">
        <div className="absolute inset-0">
          <Image src={s.image} alt={s.imageAlt} fill priority sizes="100vw" className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/50 to-ink/20" />
        </div>
        <Container className="relative z-10 pb-14">
          <Reveal>
            <Link href="/services" className="inline-flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.16em] text-bone/60 hover:text-bone">
              <ArrowLeft className="h-3.5 w-3.5" /> All services
            </Link>
          </Reveal>
          <Reveal delay={0.06}>
            <h1 className="display mt-4 max-w-3xl text-5xl font-medium leading-[1.02] sm:text-6xl">
              {s.title}
            </h1>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="display mt-3 text-xl italic text-brass-bright">{s.tagline}</p>
          </Reveal>
        </Container>
      </section>

      <Section className="bg-bone">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr]">
            <div>
              <Reveal>
                <p className="text-[17px] leading-relaxed text-ink/75">{s.description}</p>
              </Reveal>
              <Reveal delay={0.08}>
                <ul className="mt-8 space-y-4">
                  {s.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-3.5">
                      <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brass/15">
                        <Check className="h-3.5 w-3.5 text-brass-deep" />
                      </span>
                      <span className="text-[15.5px] leading-relaxed text-ink/75">{b}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>
              <Reveal delay={0.14} className="mt-10">
                <Button href="/contact" size="lg" track="cta_click">
                  Get a Quote for {s.shortTitle} <ArrowRight className="h-4 w-4" />
                </Button>
              </Reveal>
            </div>

            {/* Sidebar card */}
            <Reveal delay={0.1} className="lg:sticky lg:top-28">
              <div className="rounded-2xl border border-ink/10 bg-linen p-7">
                <p className="kicker text-brass-deep">Good to know</p>
                <dl className="mt-5 space-y-4 text-[14px]">
                  <div className="flex justify-between gap-4 border-b border-ink/8 pb-3">
                    <dt className="text-ink/50">License</dt>
                    <dd className="font-semibold text-ink">CA #{SITE.license}</dd>
                  </div>
                  <div className="flex justify-between gap-4 border-b border-ink/8 pb-3">
                    <dt className="text-ink/50">Serving since</dt>
                    <dd className="font-semibold text-ink">{SITE.founded}</dd>
                  </div>
                  <div className="flex justify-between gap-4 border-b border-ink/8 pb-3">
                    <dt className="text-ink/50">Permits &amp; engineering</dt>
                    <dd className="font-semibold text-ink">Handled</dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="text-ink/50">Meetings</dt>
                    <dd className="font-semibold text-ink">By appointment</dd>
                  </div>
                </dl>
                <a
                  href={`mailto:${SITE.email}?subject=${encodeURIComponent(`Quote request: ${s.title}`)}`}
                  data-track="email_click"
                  data-track-label={`service_${slug}`}
                  className="mt-6 block rounded-xl bg-ink px-5 py-4 text-center text-sm font-semibold text-bone transition-colors hover:bg-coal"
                >
                  Email us directly
                </a>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* Category gallery */}
      {imgs.length > 3 && (
        <Section className="bg-cream pt-0">
          <Container>
            <Reveal><Kicker>Real work, real sites</Kicker></Reveal>
            <Reveal delay={0.05}>
              <Display className="mb-10 mt-4 text-3xl sm:text-4xl">{s.shortTitle} in the field</Display>
            </Reveal>
            <GalleryGrid images={imgs.slice(0, 12)} />
          </Container>
        </Section>
      )}

      {/* FAQs */}
      {s.faqs.length > 0 && (
        <Section className="bg-bone">
          <Container>
            <div className="grid gap-12 lg:grid-cols-[1fr_1.5fr]">
              <div>
                <Reveal><Kicker>Questions</Kicker></Reveal>
                <Reveal delay={0.05}>
                  <Display className="mt-4 text-3xl sm:text-4xl">About {s.shortTitle.toLowerCase()}</Display>
                </Reveal>
              </div>
              <Reveal delay={0.08}><Faq items={s.faqs} /></Reveal>
            </div>
          </Container>
        </Section>
      )}

      {/* Other services */}
      <Section className="bg-linen">
        <Container>
          <Reveal><Kicker>Keep exploring</Kicker></Reveal>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {others.map((o) => (
              <Link
                key={o.slug}
                href={`/services/${o.slug}`}
                className="group rounded-xl border border-ink/10 bg-bone p-5 transition-all hover:border-brass hover:shadow-[var(--shadow-card)]"
              >
                <span className="display block text-lg font-medium text-ink group-hover:text-brass-deep">{o.shortTitle}</span>
                <span className="mt-1 block text-[12.5px] text-ink/50">{o.tagline}</span>
                <span className="mt-3 inline-flex items-center gap-1 text-[12px] font-semibold text-brass-deep">
                  View <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
                </span>
              </Link>
            ))}
          </div>
        </Container>
      </Section>

      <CtaBand title={`Ready to talk ${s.shortTitle.toLowerCase()}?`} />
    </>
  );
}
