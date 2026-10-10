import type { Metadata } from "next";
import Image from "next/image";
import { ArrowRight, ShieldCheck, Heart, Wrench, Landmark } from "lucide-react";
import { SITE, absoluteUrl } from "@/lib/site";
import { PROJECT_SPOTLIGHTS } from "@/data/content";
import { Container, Section, Kicker, Display, Button } from "@/components/ui";
import { Reveal } from "@/components/reveal";
import { Stats } from "@/components/stats";
import { CtaBand } from "@/components/cta-band";
import { JsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "About — Family Owned Since 1980",
  description:
    "Brady Construction Company: a family-owned California general contractor building and remodeling across the Bay Area for four decades. License #479385.",
  alternates: { canonical: absoluteUrl("/about") },
};

export default function AboutPage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "AboutPage",
          name: `About ${SITE.name}`,
          url: absoluteUrl("/about"),
          mainEntity: { "@id": `${SITE.url}/#business` },
        }}
      />

      <section className="relative overflow-hidden bg-ink pb-20 pt-40 text-bone sm:pt-48">
        <Container className="relative z-10">
          <Reveal><Kicker light>Since {SITE.founded}</Kicker></Reveal>
          <Reveal delay={0.06}>
            <Display as="h1" className="mt-5 max-w-3xl text-5xl text-bone sm:text-7xl">
              Family hands,<br />built to last
            </Display>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mt-6 max-w-2xl text-[16.5px] leading-relaxed text-bone/65">
              We work for nice people who are ready to transform their homes
              into their very special place. You are your environment — so
              improve your home and life today.
            </p>
          </Reveal>
        </Container>
        <div className="grain absolute inset-0" />
      </section>

      <Section className="bg-bone">
        <Container>
          <div className="grid items-start gap-14 lg:grid-cols-[1.2fr_1fr]">
            <div>
              <Reveal><Kicker>The story</Kicker></Reveal>
              <Reveal delay={0.06}>
                <Display className="mt-4 text-4xl sm:text-5xl">
                  Built in the Bay, for the Bay
                </Display>
              </Reveal>
              <Reveal delay={0.12}>
                <div className="mt-6 space-y-5 text-[16px] leading-relaxed text-ink/70">
                  <p>
                    Brady Construction Company is family owned and operated.
                    Since {SITE.founded}, Patrick and the family have been
                    building and remodeling in San Francisco and all of Northern
                    California — every county, every city around the Bay.
                  </p>
                  <p>
                    The work spans historical, modern, contemporary and classic
                    artistic cool: complete remodels and rebuilds of homes and
                    businesses, open floor plan country houses in Sonoma, a
                    historic-style carriage barn in Woodside, extreme hillside
                    foundations, and the seismic retrofits that keep Bay Area
                    homes standing.
                  </p>
                  <p>
                    After {SITE.yearsInBusiness} years, Patrick knows the tricks
                    of the trade — the methods that make remodeling an easy and
                    happy experience, saving valuable time and money. We help
                    architects, fellow contractors, owner-builders and nice
                    people with the more challenging jobs.
                  </p>
                </div>
              </Reveal>
            </div>
            <Reveal delay={0.1} className="lg:sticky lg:top-28">
              <div className="zoom-frame relative aspect-[4/5] overflow-hidden rounded-2xl shadow-[var(--shadow-lift)]">
                <Image
                  src="/images/gallery/people-062.webp"
                  alt="Patrick Brady of Brady Construction reviewing plans at a client's front door"
                  fill
                  sizes="(max-width:1024px) 100vw, 40vw"
                  className="object-cover"
                />
              </div>
              <p className="mt-4 text-center text-[13px] text-ink/50">
                Patrick Brady — {SITE.yearsInBusiness} years of Bay Area building
              </p>
            </Reveal>
          </div>
        </Container>
      </Section>

      <Section dark className="py-16">
        <Container>
          <Stats
            items={[
              { value: SITE.yearsInBusiness, suffix: "+", label: "Years in business" },
              { value: 500, suffix: "+", label: "Projects completed" },
              { value: 6, label: "County regions" },
              { value: 4, suffix: "", label: "Decades licensed" },
            ]}
          />
        </Container>
      </Section>

      <Section className="bg-cream">
        <Container>
          <Reveal><Kicker>What we believe</Kicker></Reveal>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {[
              {
                icon: Heart,
                t: "Nice people only",
                d: "We work for nice people ready to transform their homes into their very special place. Good clients make great projects.",
              },
              {
                icon: Wrench,
                t: "The challenging jobs",
                d: "Moment frames, hillside caissons, seismic retrofits, historic restoration — the work other contractors call us for.",
              },
              {
                icon: Landmark,
                t: "Licensed & honest",
                d: `California License #${SITE.license} since ${SITE.founded}. Straight numbers, real schedules, no games.`,
              },
            ].map((v, i) => (
              <Reveal key={v.t} delay={i * 0.07}>
                <div className="h-full rounded-2xl border border-ink/10 bg-bone p-8">
                  <v.icon className="h-7 w-7 text-brass-deep" />
                  <h3 className="display mt-4 text-2xl font-medium">{v.t}</h3>
                  <p className="mt-3 text-[14.5px] leading-relaxed text-ink/60">{v.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* Signature projects */}
      <Section className="bg-bone">
        <Container>
          <Reveal><Kicker>Signature work</Kicker></Reveal>
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {PROJECT_SPOTLIGHTS.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.08}>
                <article className="card-lift overflow-hidden rounded-2xl border border-ink/8 bg-cream">
                  <div className="zoom-frame relative aspect-[4/3]">
                    <Image src={p.image} alt={p.title} fill sizes="(max-width:1024px) 100vw, 33vw" className="object-cover" />
                    <span className="absolute left-4 top-4 rounded-full bg-ink/70 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-bone backdrop-blur">
                      {p.tag}
                    </span>
                  </div>
                  <div className="p-6">
                    <h3 className="display text-2xl font-medium">{p.title}</h3>
                    <p className="mt-1 text-[12px] font-semibold uppercase tracking-[0.14em] text-brass-deep">
                      {p.location}{p.year ? ` · ${p.year}` : ""}
                    </p>
                    <p className="mt-3 text-[14px] leading-relaxed text-ink/60">{p.description}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* Credentials */}
      <Section className="bg-linen">
        <Container>
          <div className="flex flex-col items-start justify-between gap-8 rounded-2xl border border-ink/10 bg-bone p-8 sm:p-10 lg:flex-row lg:items-center">
            <div className="flex items-start gap-4">
              <ShieldCheck className="mt-1 h-8 w-8 text-brass-deep" />
              <div>
                <h2 className="display text-2xl font-medium sm:text-3xl">
                  Licensed since {SITE.founded} — verify us
                </h2>
                <p className="mt-2 max-w-xl text-[14.5px] leading-relaxed text-ink/60">
                  California Contractor License #{SITE.license}. Every legitimate
                  contractor wants you to check — look us up at cslb.ca.gov.
                </p>
              </div>
            </div>
            <Button href="/contact" size="lg" track="cta_click">
              Work With Us <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </Container>
      </Section>

      <CtaBand />
    </>
  );
}
