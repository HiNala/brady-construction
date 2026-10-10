import type { Metadata } from "next";
import Image from "next/image";
import { Mail, MapPin, Clock, ShieldCheck, ArrowUpRight } from "lucide-react";
import { SITE, absoluteUrl } from "@/lib/site";
import { CONTACT_FAQS } from "@/data/content";
import { Container, Section, Kicker, Display } from "@/components/ui";
import { Reveal } from "@/components/reveal";
import { QuoteForm } from "@/components/forms/quote-form";
import { Faq } from "@/components/faq";
import { JsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Get a Quote — Contact Brady Construction",
  description:
    "Request a remodeling quote from Brady Construction Company. Kitchen, bath, additions, foundations & custom builds across the Bay Area. Meetings by appointment.",
  alternates: { canonical: absoluteUrl("/contact") },
};

export default function ContactPage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ContactPage",
          name: "Contact Brady Construction Company",
          url: absoluteUrl("/contact"),
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: CONTACT_FAQS.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }}
      />
      <section className="relative overflow-hidden bg-ink pb-14 pt-40 text-bone sm:pt-48">
        <Container className="relative z-10">
          <Reveal><Kicker light>Quotes &amp; consultations</Kicker></Reveal>
          <Reveal delay={0.06}>
            <Display as="h1" className="mt-5 max-w-3xl text-5xl text-bone sm:text-6xl">
              Let&apos;s talk about<br />your project
            </Display>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mt-6 max-w-2xl text-[16px] leading-relaxed text-bone/65">
              When you&apos;re serious and ready — you know your budget, your
              wishes — that&apos;s the perfect time to reach out. Patrick replies
              personally, usually within one business day.
            </p>
          </Reveal>
        </Container>
        <div className="grain absolute inset-0" />
      </section>

      <Section className="bg-linen">
        <Container>
          <div className="grid items-start gap-12 lg:grid-cols-[1fr_1.25fr]">
            <div className="space-y-8 lg:sticky lg:top-28">
              <Reveal>
                <div className="rounded-2xl border border-ink/10 bg-bone p-7">
                  <h2 className="kicker text-brass-deep">Reach us directly</h2>
                  <div className="mt-5 space-y-4">
                    <a
                      href={`mailto:${SITE.email}`}
                      data-track="email_click"
                      data-track-label="contact_page"
                      className="group flex items-center gap-4 rounded-xl border border-ink/10 bg-cream p-4 transition-all hover:border-brass"
                    >
                      <span className="flex h-11 w-11 items-center justify-center rounded-full bg-brass/15 text-brass-deep">
                        <Mail className="h-5 w-5" />
                      </span>
                      <span>
                        <span className="block text-[12px] font-semibold uppercase tracking-[0.12em] text-ink/45">Email</span>
                        <span className="block text-[15px] font-semibold text-ink group-hover:text-brass-deep">{SITE.email}</span>
                      </span>
                      <ArrowUpRight className="ml-auto h-4 w-4 text-ink/30 group-hover:text-brass-deep" />
                    </a>
                    <div className="flex items-center gap-4 rounded-xl border border-ink/10 bg-cream p-4">
                      <span className="flex h-11 w-11 items-center justify-center rounded-full bg-brass/15 text-brass-deep">
                        <MapPin className="h-5 w-5" />
                      </span>
                      <span>
                        <span className="block text-[12px] font-semibold uppercase tracking-[0.12em] text-ink/45">Office</span>
                        <span className="block text-[15px] font-semibold text-ink">
                          {SITE.address.street}, {SITE.address.city}, CA {SITE.address.zip}
                        </span>
                      </span>
                    </div>
                    <div className="flex items-center gap-4 rounded-xl border border-ink/10 bg-cream p-4">
                      <span className="flex h-11 w-11 items-center justify-center rounded-full bg-brass/15 text-brass-deep">
                        <Clock className="h-5 w-5" />
                      </span>
                      <span>
                        <span className="block text-[12px] font-semibold uppercase tracking-[0.12em] text-ink/45">Meetings</span>
                        <span className="block text-[15px] font-semibold text-ink">By appointment</span>
                      </span>
                    </div>
                  </div>
                </div>
              </Reveal>
              <Reveal delay={0.08}>
                <div className="rounded-2xl border border-brass/30 bg-brass/8 p-6">
                  <div className="flex items-center gap-4">
                    <Image
                      src="/images/gallery/people-062.webp"
                      alt="Patrick Brady holding rolled plans at a client's front door"
                      width={72}
                      height={72}
                      className="h-16 w-16 shrink-0 rounded-full border-2 border-brass/40 object-cover"
                    />
                    <p className="text-[14px] leading-relaxed text-ink/70">
                      <span className="font-semibold text-ink">This is Patrick.</span>{" "}
                      He personally reads every request — your details go to him
                      alone, never sold, never shared.
                    </p>
                  </div>
                  <p className="mt-4 flex items-start gap-3 border-t border-brass/20 pt-4 text-[13px] leading-relaxed text-ink/60">
                    <ShieldCheck className="mt-0.5 h-4.5 w-4.5 shrink-0 text-brass-deep" />
                    California Contractor License #{SITE.license} · Licensed,
                    insured &amp; family operated since {SITE.founded}.
                  </p>
                </div>
              </Reveal>
            </div>
            <Reveal delay={0.1}>
              <QuoteForm source="contact" />
            </Reveal>
          </div>

          <div className="mx-auto mt-20 max-w-3xl">
            <Reveal>
              <Kicker>Good to know</Kicker>
            </Reveal>
            <Reveal delay={0.06}>
              <h2 className="display mt-4 text-3xl font-medium sm:text-4xl">
                Before you hit send
              </h2>
            </Reveal>
            <Reveal delay={0.12} className="mt-8">
              <Faq items={CONTACT_FAQS} />
            </Reveal>
          </div>
        </Container>
      </Section>
    </>
  );
}
