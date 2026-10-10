import type { Metadata } from "next";
import Link from "next/link";
import { MapPin, ArrowRight } from "lucide-react";
import { AREAS } from "@/data/areas";
import { absoluteUrl } from "@/lib/site";
import { Container, Section, Kicker, Display } from "@/components/ui";
import { Reveal } from "@/components/reveal";
import { CtaBand } from "@/components/cta-band";
import { JsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Service Areas — Bay Area, Wine Country & Northern California",
  description:
    "Brady Construction serves Sonoma, Marin, Napa, San Mateo and San Francisco counties plus the greater Bay Area — remodeling, additions, foundations and custom builds.",
  alternates: { canonical: absoluteUrl("/areas") },
};

export default function AreasPage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          itemListElement: AREAS.map((a, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: a.name,
            url: absoluteUrl(`/areas/${a.slug}`),
          })),
        }}
      />
      <section className="relative overflow-hidden bg-ink pb-16 pt-40 text-bone sm:pt-48">
        <Container className="relative z-10">
          <Reveal><Kicker light>Where we work</Kicker></Reveal>
          <Reveal delay={0.06}>
            <Display as="h1" className="mt-5 max-w-3xl text-5xl text-bone sm:text-6xl">
              Every county<br />around the Bay
            </Display>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mt-6 max-w-2xl text-[16px] leading-relaxed text-bone/65">
              Patrick has remodeled, built and restored in every county and city
              around the Bay — and we travel further for the right project and
              the right client.
            </p>
          </Reveal>
        </Container>
        <div className="grain absolute inset-0" />
      </section>

      <Section className="bg-bone pt-16">
        <Container>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {AREAS.map((a, i) => (
              <Reveal key={a.slug} delay={i * 0.06}>
                <Link
                  href={`/areas/${a.slug}`}
                  className="card-lift group flex h-full flex-col rounded-2xl border border-ink/10 bg-cream p-7"
                >
                  <MapPin className="h-6 w-6 text-brass-deep" />
                  <h2 className="display mt-4 text-2xl font-medium text-ink group-hover:text-brass-deep">
                    {a.name}
                  </h2>
                  <p className="mt-3 flex-1 text-[14px] leading-relaxed text-ink/60">
                    {a.blurb}
                  </p>
                  <p className="mt-4 text-[12px] leading-relaxed text-ink/45">
                    {a.cities.slice(0, 6).join(" · ")}
                    {a.cities.length > 6 ? " · more" : ""}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-[13px] font-semibold text-brass-deep">
                    Explore <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.1} className="mt-10 text-center text-[14px] text-ink/55">
            Don&apos;t see your town?{" "}
            <Link href="/contact" className="font-semibold text-brass-deep underline underline-offset-4">
              Ask us
            </Link>{" "}
            — we go where good projects are.
          </Reveal>
        </Container>
      </Section>

      <CtaBand title="Your town. Our tools." />
    </>
  );
}
