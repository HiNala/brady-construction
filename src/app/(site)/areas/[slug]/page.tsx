import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, MapPin, ArrowRight } from "lucide-react";
import { AREAS, areaBySlug } from "@/data/areas";
import { SERVICES } from "@/data/services";
import { SITE, absoluteUrl } from "@/lib/site";
import { Container, Section, Kicker, Display, Button } from "@/components/ui";
import { Reveal } from "@/components/reveal";
import { CtaBand } from "@/components/cta-band";
import { JsonLd } from "@/components/json-ld";

export function generateStaticParams() {
  return AREAS.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const a = areaBySlug(slug);
  if (!a) return {};
  return {
    title: `Remodeling Contractor in ${a.name}`,
    description: `${a.name} general contractor for remodels, additions, kitchens, bathrooms and foundations. ${a.cities.slice(0, 4).join(", ")} and nearby. License #${SITE.license}.`,
    keywords: [
      `${a.name} remodeling contractor`, `${a.name} general contractor`,
      ...a.cities.slice(0, 5).map((c) => `${c} remodel`),
    ],
    alternates: { canonical: absoluteUrl(`/areas/${slug}`) },
  };
}

export default async function AreaPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const area = areaBySlug(slug);
  if (!area) notFound();
  const others = AREAS.filter((a) => a.slug !== slug).slice(0, 5);

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
            { "@type": "ListItem", position: 2, name: "Service Areas", item: absoluteUrl("/areas") },
            { "@type": "ListItem", position: 3, name: area.name },
          ],
        }}
      />
      <section className="relative overflow-hidden bg-ink pb-16 pt-40 text-bone sm:pt-48">
        <Container className="relative z-10">
          <Reveal>
            <Link href="/areas" className="inline-flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.16em] text-bone/60 hover:text-bone">
              <ArrowLeft className="h-3.5 w-3.5" /> All areas
            </Link>
          </Reveal>
          <Reveal delay={0.06}>
            <Display as="h1" className="mt-5 max-w-3xl text-5xl text-bone sm:text-6xl">
              Building in<br />{area.name}
            </Display>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mt-6 max-w-2xl text-[16px] leading-relaxed text-bone/65">{area.blurb}</p>
          </Reveal>
        </Container>
        <div className="grain absolute inset-0" />
      </section>

      <Section className="bg-bone">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr]">
            <div>
              <Reveal><Kicker>Cities & towns</Kicker></Reveal>
              <div className="mt-6 flex flex-wrap gap-2.5">
                {area.cities.map((c) => (
                  <span key={c} className="inline-flex items-center gap-1.5 rounded-full border border-ink/15 bg-cream px-4 py-2 text-[13.5px] font-medium text-ink/75">
                    <MapPin className="h-3.5 w-3.5 text-brass-deep" /> {c}
                  </span>
                ))}
              </div>
              <Reveal delay={0.1}>
                <h2 className="display mt-12 text-3xl font-medium">Our work in {area.name}</h2>
                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  {SERVICES.slice(0, 6).map((s) => (
                    <Link
                      key={s.slug}
                      href={`/services/${s.slug}`}
                      className="group flex items-center justify-between rounded-xl border border-ink/10 bg-cream px-5 py-4 transition-all hover:border-brass"
                    >
                      <span className="text-[14.5px] font-medium text-ink">{s.shortTitle}</span>
                      <ArrowRight className="h-4 w-4 text-brass-deep transition-transform group-hover:translate-x-1" />
                    </Link>
                  ))}
                </div>
              </Reveal>
            </div>
            <Reveal delay={0.1} className="lg:sticky lg:top-28">
              <div className="rounded-2xl border border-ink/10 bg-linen p-7">
                <p className="kicker text-brass-deep">Local project?</p>
                <h3 className="display mt-3 text-2xl font-medium">
                  Tell us about your {area.name.split(" ")[0]} home
                </h3>
                <p className="mt-3 text-[14px] leading-relaxed text-ink/60">
                  Ideas and budget — that&apos;s all we need to start. Meetings
                  by appointment throughout {area.name}.
                </p>
                <Button href="/contact" className="mt-6 w-full" track="cta_click">
                  Get a Quote <ArrowRight className="h-4 w-4" />
                </Button>
                <div className="mt-6 border-t border-ink/10 pt-5">
                  <p className="kicker mb-3 text-ink/45">Also serving</p>
                  <div className="flex flex-wrap gap-x-4 gap-y-1.5">
                    {others.map((o) => (
                      <Link key={o.slug} href={`/areas/${o.slug}`} className="text-[13px] font-medium text-ink/60 underline-offset-4 hover:text-brass-deep hover:underline">
                        {o.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      <CtaBand title={`Remodeling in ${area.name}?`} />
    </>
  );
}
