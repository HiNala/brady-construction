import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Users, Landmark, Hammer } from "lucide-react";
import { SERVICES } from "@/data/services";
import { SITE, absoluteUrl } from "@/lib/site";
import { Container, Section, Kicker, Display } from "@/components/ui";
import { Reveal } from "@/components/reveal";
import { CtaBand } from "@/components/cta-band";
import { JsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Services — Remodeling, Additions, Foundations & Custom Builds",
  description:
    "Kitchen & bathroom remodels, home additions, basements, foundations & seismic work, concrete, custom homes and owner-builder rough-ins — Bay Area general contractor since 1980.",
  alternates: { canonical: absoluteUrl("/services") },
};

export default function ServicesPage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          itemListElement: SERVICES.map((s, i) => ({
            "@type": "ListItem",
            position: i + 1,
            item: {
              "@type": "Service",
              name: s.title,
              url: absoluteUrl(`/services/${s.slug}`),
              provider: { "@id": `${SITE.url}/#business` },
              areaServed: "San Francisco Bay Area",
            },
          })),
        }}
      />

      <Section className="bg-bone pt-36 sm:pt-44">
        <Container>
          <Reveal><Kicker>What we do</Kicker></Reveal>
          <Reveal delay={0.05}>
            <Display as="h1" className="mt-5 max-w-3xl text-5xl sm:text-6xl">
              An array of jobs,<br />one seasoned hand
            </Display>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-2xl text-[16.5px] leading-relaxed text-ink/65">
              Complete remodels, new builds and rebuilds of homes, buildings and
              businesses. From historical to modern, contemporary to classic
              artistic cool — {SITE.yearsInBusiness} years of Bay Area craft.
            </p>
          </Reveal>
        </Container>
      </Section>

      <Section className="bg-cream pt-0">
        <Container>
          <div className="space-y-5">
            {SERVICES.map((s, i) => (
              <Reveal key={s.slug} delay={Math.min(i * 0.03, 0.15)}>
                <Link
                  href={`/services/${s.slug}`}
                  className="card-lift group grid overflow-hidden rounded-2xl border border-ink/8 bg-bone sm:grid-cols-[280px_1fr_auto]"
                >
                  <div className="zoom-frame relative h-48 sm:h-auto">
                    <Image
                      src={s.image}
                      alt={s.imageAlt}
                      fill
                      sizes="(max-width:640px) 100vw, 280px"
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6 sm:p-8">
                    <span className="kicker text-brass-deep">{String(i + 1).padStart(2, "0")}</span>
                    <h2 className="display mt-2 text-2xl font-medium text-ink group-hover:text-brass-deep sm:text-3xl">
                      {s.title}
                    </h2>
                    <p className="mt-3 max-w-xl text-[14.5px] leading-relaxed text-ink/60">
                      {s.description}
                    </p>
                  </div>
                  <div className="hidden items-center pr-8 sm:flex">
                    <span className="flex h-12 w-12 items-center justify-center rounded-full border border-ink/15 transition-all group-hover:border-brass group-hover:bg-brass group-hover:text-ink">
                      <ArrowRight className="h-5 w-5" />
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* Partnerships note */}
      <Section className="bg-linen">
        <Container>
          <div className="grid gap-10 lg:grid-cols-3">
            <Reveal>
              <div className="h-full rounded-2xl border border-ink/10 bg-bone p-8">
                <Users className="h-7 w-7 text-brass-deep" />
                <h3 className="display mt-4 text-2xl font-medium">Owner-builders & DIY</h3>
                <p className="mt-3 text-[14.5px] leading-relaxed text-ink/60">
                  We do the &ldquo;rough stuff&rdquo; — foundation, frame, rough
                  plumbing, electrical, windows and roof — and you enjoy the finish.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.07}>
              <div className="h-full rounded-2xl border border-ink/10 bg-bone p-8">
                <Landmark className="h-7 w-7 text-brass-deep" />
                <h3 className="display mt-4 text-2xl font-medium">Architects & contractors</h3>
                <p className="mt-3 text-[14.5px] leading-relaxed text-ink/60">
                  We partner with architects, designers, realtors and fellow
                  contractors on the challenging structural work.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.14}>
              <div className="h-full rounded-2xl border border-ink/10 bg-bone p-8">
                <Hammer className="h-7 w-7 text-brass-deep" />
                <h3 className="display mt-4 text-2xl font-medium">Investors & JV</h3>
                <p className="mt-3 text-[14.5px] leading-relaxed text-ink/60">
                  We joint-venture on property development and buy fixer and
                  distressed properties — bring us the situation.
                </p>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      <CtaBand />
    </>
  );
}
