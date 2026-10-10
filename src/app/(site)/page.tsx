import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import {
  ArrowRight, ArrowDown, ShieldCheck, Mail, MapPin,
  Award, Users, Landmark, Sparkles,
} from "lucide-react";
import { SITE } from "@/lib/site";
import { SERVICES } from "@/data/services";
import { AREAS } from "@/data/areas";
import { HEROES, featured } from "@/lib/gallery";
import { HOME_FAQS, PROCESS_STEPS, PROJECT_SPOTLIGHTS, TRUST_CHIPS, CATEGORY_LABELS } from "@/data/content";
import { Container, Section, Kicker, Display, Button } from "@/components/ui";
import { Reveal } from "@/components/reveal";
import { Marquee } from "@/components/marquee";
import { Stats } from "@/components/stats";
import { Faq } from "@/components/faq";
import { CtaBand } from "@/components/cta-band";
import { QuoteForm } from "@/components/forms/quote-form";
import { JsonLd } from "@/components/json-ld";
import { BlogPreview } from "@/components/blog-preview";

const heroImage =
  HEROES.find((h) => h.src.includes("kitchen-048")) ??
  HEROES.find((h) => h.category === "kitchen") ??
  HEROES[0];

export default function HomePage() {
  const featuredImgs = featured(6);
  const areaNames = AREAS.flatMap((a) => [a.name, ...a.cities.slice(0, 4)]);

  return (
    <>
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: SITE.name,
            url: SITE.url,
            publisher: { "@id": `${SITE.url}/#business` },
          },
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: HOME_FAQS.map((f) => ({
              "@type": "Question",
              name: f.q,
              acceptedAnswer: { "@type": "Answer", text: f.a },
            })),
          },
        ]}
      />

      {/* ================= HERO ================= */}
      <section className="relative flex min-h-[100svh] items-end overflow-hidden bg-ink text-bone">
        <div className="absolute inset-0">
          <Image
            src={heroImage.src}
            alt={heroImage.alt}
            fill
            priority
            sizes="100vw"
            placeholder="blur"
            blurDataURL={heroImage.blur}
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/55 to-ink/25" />
          <div className="absolute inset-0 bg-gradient-to-r from-ink/70 via-transparent to-transparent" />
        </div>

        <Container className="relative z-10 pb-20 pt-36 sm:pb-24">
          <Reveal>
            <div className="flex flex-wrap items-center gap-3">
              <Kicker light>California General Contractor · License #{SITE.license}</Kicker>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="display mt-6 max-w-4xl text-[13vw] font-medium leading-[0.98] sm:text-7xl lg:text-[86px]">
              Large remodels.
              <br />
              <em className="font-light italic text-brass-bright">Wow</em>{" "}
              transformations.
            </h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-6 max-w-xl text-[16.5px] leading-relaxed text-bone/75">
              {SITE.yearsInBusiness} years remodeling Bay Area homes — open-concept
              kitchens, whole-home transformations, hillside foundations and
              custom estates. Family-owned, engineered to last, built for{" "}
              <span className="text-bone">nice people</span>.
            </p>
          </Reveal>
          <Reveal delay={0.24} className="mt-9 flex flex-wrap items-center gap-4">
            <Button href="/contact" size="lg" track="cta_click">
              Start Your Project <ArrowRight className="h-4 w-4" />
            </Button>
            <Button href="/work" variant="outlineLight" size="lg">
              View Our Work
            </Button>
          </Reveal>
          <Reveal delay={0.34} className="mt-12 flex flex-wrap items-center gap-x-6 gap-y-2">
            {TRUST_CHIPS.map((c) => (
              <span key={c} className="flex items-center gap-2 text-[12px] font-medium uppercase tracking-[0.12em] text-bone/55">
                <ShieldCheck className="h-3.5 w-3.5 text-brass-bright" /> {c}
              </span>
            ))}
          </Reveal>
        </Container>

        <div className="absolute bottom-6 right-6 z-10 hidden animate-pulse-soft items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-bone/50 sm:flex">
          Scroll <ArrowDown className="h-3.5 w-3.5" />
        </div>
      </section>

      <Marquee items={areaNames} />

      {/* ================= INTRO ================= */}
      <Section className="bg-bone">
        <Container>
          <div className="grid items-center gap-14 lg:grid-cols-2">
            <div>
              <Reveal>
                <Kicker>01 — Who we are</Kicker>
              </Reveal>
              <Reveal delay={0.06}>
                <Display className="mt-5 text-4xl sm:text-5xl">
                  Four decades of{" "}
                  <em className="italic text-brass-deep">tricks of the trade</em>
                </Display>
              </Reveal>
              <Reveal delay={0.12}>
                <p className="mt-6 text-[16px] leading-relaxed text-ink/70">
                  Brady Construction Company is family owned and operated. Since
                  1980 we&apos;ve built, remodeled and restored homes in every
                  county and city around the Bay — from historic Victorians to
                  modern hillside estates, country classics to contemporary cool.
                </p>
                <p className="mt-4 text-[16px] leading-relaxed text-ink/70">
                  We&apos;re the builders other builders call for the challenging
                  jobs — engineered foundations, seismic retrofits, moment-frame
                  wall removals, extreme hillside sites. And when you&apos;re
                  serious and ready — you know your budget and your wishes —
                  we&apos;re the seasoned crew that makes it an easy, happy
                  experience.
                </p>
              </Reveal>
              <Reveal delay={0.18} className="mt-8 flex flex-wrap gap-4">
                <Button href="/about" variant="ink">
                  Our Story <ArrowRight className="h-4 w-4" />
                </Button>
                <a
                  href={`mailto:${SITE.email}`}
                  data-track="email_click"
                  data-track-label="intro"
                  className="inline-flex items-center gap-2 px-1 py-3 text-sm font-semibold text-brass-deep hover:text-ink"
                >
                  <Mail className="h-4 w-4" /> {SITE.email}
                </a>
              </Reveal>
            </div>
            <Reveal delay={0.1} className="relative">
              <div className="zoom-frame relative aspect-[4/5] overflow-hidden rounded-2xl shadow-[var(--shadow-lift)]">
                <Image
                  src="/images/hero/interior-060.webp"
                  alt="Open-concept living room with brick fireplace, hardwood floors and exposed beams built by Brady Construction"
                  fill
                  sizes="(max-width:1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-4 rounded-xl bg-ink px-6 py-5 text-bone shadow-[var(--shadow-lift)] sm:-left-8">
                <p className="display text-4xl font-medium text-brass-bright">{SITE.yearsInBusiness}+</p>
                <p className="mt-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-bone/60">
                  Years building <br />in the Bay Area
                </p>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* ================= STATS ================= */}
      <Section dark className="border-y border-bone/10 py-16 sm:py-20">
        <Container>
          <Stats
            items={[
              { value: SITE.yearsInBusiness, suffix: "+", label: "Years in business" },
              { value: 8, label: "Service lines" },
              { value: 6, label: "County regions served" },
              { value: 100, suffix: "%", label: "Family owned & operated" },
            ]}
          />
        </Container>
      </Section>

      {/* ================= SERVICES ================= */}
      <Section id="services" className="bg-bone">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <Reveal><Kicker>02 — What we do</Kicker></Reveal>
              <Reveal delay={0.05}>
                <Display className="mt-5 max-w-2xl text-4xl sm:text-5xl">
                  Every trade. One seasoned hand.
                </Display>
              </Reveal>
            </div>
            <Reveal delay={0.1}>
              <Button href="/services" variant="outline">All Services <ArrowRight className="h-4 w-4" /></Button>
            </Reveal>
          </div>

          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {SERVICES.slice(0, 8).map((s, i) => (
              <Reveal key={s.slug} delay={(i % 4) * 0.06}>
                <Link
                  href={`/services/${s.slug}`}
                  className="card-lift group block overflow-hidden rounded-2xl border border-ink/8 bg-cream"
                >
                  <div className="zoom-frame relative aspect-[4/3]">
                    <Image
                      src={s.image}
                      alt={s.imageAlt}
                      fill
                      sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 25vw"
                      className="object-cover"
                    />
                    <span className="absolute left-3 top-3 rounded-full bg-ink/70 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-bone backdrop-blur">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <div className="p-5">
                    <h3 className="display text-xl font-medium text-ink">{s.shortTitle}</h3>
                    <p className="mt-1.5 text-[13.5px] leading-snug text-ink/55">{s.tagline}</p>
                    <span className="mt-4 inline-flex items-center gap-1.5 text-[12.5px] font-semibold text-brass-deep">
                      Explore <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* ================= FEATURED WORK ================= */}
      <Section dark id="work">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <Reveal><Kicker light>03 — Selected work</Kicker></Reveal>
              <Reveal delay={0.05}>
                <Display className="mt-5 max-w-2xl text-4xl text-bone sm:text-5xl">
                  Real projects. Real addresses.
                </Display>
              </Reveal>
            </div>
            <Reveal delay={0.1}>
              <Button href="/work" variant="outlineLight">Full Gallery <ArrowRight className="h-4 w-4" /></Button>
            </Reveal>
          </div>

          <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {featuredImgs.map((img, i) => (
              <Reveal key={img.src} delay={(i % 3) * 0.08} className={i === 0 ? "sm:col-span-2 sm:row-span-2" : ""}>
                <Link
                  href="/work"
                  className={cn_aspect(i)}
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    sizes={i === 0 ? "(max-width:1024px) 100vw, 66vw" : "(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw"}
                    placeholder="blur"
                    blurDataURL={img.blur}
                    className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-105"
                  />
                  <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/70 to-transparent p-4 pt-10 text-[11px] font-semibold uppercase tracking-[0.16em] text-bone/90 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    {CATEGORY_LABELS[img.category] ?? img.category}
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>

          <div className="mt-16 grid gap-6 lg:grid-cols-3">
            {PROJECT_SPOTLIGHTS.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.08}>
                <article className="rounded-2xl border border-bone/12 bg-coal p-7">
                  <span className="kicker text-brass-bright">{p.tag}</span>
                  <h3 className="display mt-3 text-2xl font-medium text-bone">{p.title}</h3>
                  <p className="mt-1 text-[12px] font-medium uppercase tracking-[0.14em] text-bone/45">
                    {p.location}{p.year ? ` · ${p.year}` : ""}
                  </p>
                  <p className="mt-4 text-[14.5px] leading-relaxed text-bone/65">{p.description}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* ================= STRUCTURAL EXPERTISE ================= */}
      <Section className="bg-linen">
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_1fr]">
            <Reveal className="zoom-frame relative order-2 aspect-[4/3] overflow-hidden rounded-2xl shadow-[var(--shadow-lift)] lg:order-1">
              <Image
                src="/images/gallery/structural-020.webp"
                alt="Engineered steel moment frame installed in a wall opening"
                fill
                sizes="(max-width:1024px) 100vw, 50vw"
                className="object-cover"
              />
            </Reveal>
            <div className="order-1 lg:order-2">
              <Reveal><Kicker>04 — The hard stuff</Kicker></Reveal>
              <Reveal delay={0.06}>
                <Display className="mt-5 text-4xl sm:text-5xl">
                  The jobs other contractors call us for
                </Display>
              </Reveal>
              <Reveal delay={0.12}>
                <p className="mt-6 text-[16px] leading-relaxed text-ink/70">
                  Moment frames. Hillside caissons. Seismic retrofits. Engineered
                  foundations. For {SITE.yearsInBusiness} years, architects and
                  fellow contractors have brought us the structural puzzles —
                  the work that makes open-concept living possible and keeps
                  Bay Area homes standing strong.
                </p>
              </Reveal>
              <Reveal delay={0.18}>
                <ul className="mt-8 space-y-4">
                  {[
                    { icon: Landmark, t: "Simpson Strong-Tie & welded moment frames", d: "Walls come out safely — engineered, permitted, inspected." },
                    { icon: ShieldCheck, t: "Seismic retrofitting & foundations", d: "Bolting, shear walls, corrective and hillside foundation work." },
                    { icon: Users, t: "Owner-builder & contractor friendly", d: "We do the rough stuff — you enjoy the finish." },
                    { icon: Award, t: "Licensed CA contractor", d: `California Contractor License #${SITE.license}.` },
                  ].map((f) => (
                    <li key={f.t} className="flex gap-4">
                      <span className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brass/15 text-brass-deep">
                        <f.icon className="h-4.5 w-4.5" />
                      </span>
                      <div>
                        <p className="text-[15px] font-semibold text-ink">{f.t}</p>
                        <p className="mt-0.5 text-[13.5px] text-ink/55">{f.d}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </Reveal>
              <Reveal delay={0.24} className="mt-9">
                <Button href="/services/foundations-seismic" variant="ink">
                  Structural Services <ArrowRight className="h-4 w-4" />
                </Button>
              </Reveal>
            </div>
          </div>
        </Container>
      </Section>

      {/* ================= PROCESS ================= */}
      <Section className="bg-bone">
        <Container>
          <Reveal><Kicker>05 — How it works</Kicker></Reveal>
          <Reveal delay={0.05}>
            <Display className="mt-5 max-w-2xl text-4xl sm:text-5xl">
              An easy, happy remodel — on purpose
            </Display>
          </Reveal>
          <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-ink/10 bg-ink/10 sm:grid-cols-2 lg:grid-cols-4">
            {PROCESS_STEPS.map((p, i) => (
              <Reveal key={p.n} delay={i * 0.07} className="bg-bone">
                <div className="h-full p-7">
                  <span className="display text-4xl font-medium text-brass">{p.n}</span>
                  <h3 className="display mt-4 text-xl font-medium text-ink">{p.title}</h3>
                  <p className="mt-3 text-[14px] leading-relaxed text-ink/60">{p.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* ================= SERVICE AREAS ================= */}
      <Section className="bg-cream">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr]">
            <div>
              <Reveal><Kicker>06 — Where we work</Kicker></Reveal>
              <Reveal delay={0.05}>
                <Display className="mt-5 text-4xl sm:text-5xl">Every county around the Bay</Display>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="mt-5 text-[15.5px] leading-relaxed text-ink/65">
                  From our home base in Woodside to Wine Country, Marin, the
                  city and beyond — Patrick has remodeled, built and restored in
                  every county and city around the Bay.
                </p>
              </Reveal>
              <Reveal delay={0.15} className="mt-6">
                <Button href="/areas" variant="outline">
                  <MapPin className="h-4 w-4" /> All Service Areas
                </Button>
              </Reveal>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {AREAS.map((a, i) => (
                <Reveal key={a.slug} delay={i * 0.05}>
                  <Link
                    href={`/areas/${a.slug}`}
                    className="group block rounded-xl border border-ink/10 bg-bone p-5 transition-all hover:border-brass hover:shadow-[var(--shadow-card)]"
                  >
                    <span className="display text-lg font-medium text-ink group-hover:text-brass-deep">{a.name}</span>
                    <span className="mt-1.5 block text-[12.5px] leading-relaxed text-ink/50">
                      {a.cities.slice(0, 4).join(" · ")}
                    </span>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* ================= QUOTE ================= */}
      <Section id="quote" className="bg-linen">
        <Container>
          <div className="grid items-start gap-12 lg:grid-cols-[1fr_1.15fr]">
            <div className="lg:sticky lg:top-28">
              <Reveal><Kicker>07 — Get started</Kicker></Reveal>
              <Reveal delay={0.05}>
                <Display className="mt-5 text-4xl sm:text-5xl">
                  Know your budget? <br />Know your wishes? <br />
                  <em className="italic text-brass-deep">Let&apos;s go.</em>
                </Display>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="mt-6 text-[15.5px] leading-relaxed text-ink/65">
                  Three quick steps — project, scope, and how to reach you.
                  Your request goes straight to Patrick — usually a personal
                  reply within one business day.
                </p>
              </Reveal>
              <Reveal delay={0.15}>
                <div className="mt-8 space-y-3 text-[14px] text-ink/65">
                  <p className="flex items-center gap-2.5"><Sparkles className="h-4 w-4 text-brass-deep" /> Free, no-pressure project conversation</p>
                  <p className="flex items-center gap-2.5"><ShieldCheck className="h-4 w-4 text-brass-deep" /> Licensed &amp; insured — CA #{SITE.license}</p>
                  <p className="flex items-center gap-2.5"><Mail className="h-4 w-4 text-brass-deep" /> Prefer email? {SITE.email}</p>
                </div>
              </Reveal>
            </div>
            <Reveal delay={0.1}>
              <QuoteForm source="home" />
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* ================= FAQ ================= */}
      <Section className="bg-bone">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1fr_1.5fr]">
            <div>
              <Reveal><Kicker>08 — Questions</Kicker></Reveal>
              <Reveal delay={0.05}>
                <Display className="mt-5 text-4xl sm:text-5xl">Straight answers</Display>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="mt-5 text-[15px] leading-relaxed text-ink/60">
                  The things homeowners ask us most. Something else on your mind?{" "}
                  <Link href="/contact" className="font-semibold text-brass-deep underline underline-offset-4">
                    Just ask.
                  </Link>
                </p>
              </Reveal>
            </div>
            <Reveal delay={0.1}>
              <Faq items={HOME_FAQS} />
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* ================= BLOG PREVIEW ================= */}
      <Suspense fallback={null}>
        <BlogPreview />
      </Suspense>

      <CtaBand />
    </>
  );
}

function cn_aspect(i: number) {
  return [
    "group relative block overflow-hidden rounded-xl bg-coal",
    i === 0 ? "aspect-[4/3] sm:aspect-auto sm:h-full sm:min-h-[420px]" : "aspect-[4/3]",
  ].join(" ");
}
