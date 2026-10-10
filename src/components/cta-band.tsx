import Link from "next/link";
import { ArrowRight, Mail } from "lucide-react";
import { SITE } from "@/lib/site";
import { Container, Kicker, Display } from "./ui";
import { Reveal } from "./reveal";

export function CtaBand({
  title = "Ready to transform your home?",
  text = `Tell us your ideas and your budget — you'll get a straight answer and a real plan, usually within one business day. ${SITE.yearsInBusiness} years of Bay Area craft, one email away.`,
}: {
  title?: string;
  text?: string;
}) {
  return (
    <section className="grain relative overflow-hidden bg-ink py-20 text-bone sm:py-24">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 -top-40 h-[480px] w-[480px] rounded-full opacity-25"
        style={{ background: "radial-gradient(circle, #b08850 0%, transparent 65%)" }}
      />
      <Container className="relative">
        <Reveal>
          <Kicker light>Start here</Kicker>
        </Reveal>
        <div className="mt-5 flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-end">
          <div className="max-w-2xl">
            <Reveal delay={0.05}>
              <Display className="text-4xl sm:text-5xl">{title}</Display>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-4 max-w-xl text-[15.5px] leading-relaxed text-bone/65">
                {text}
              </p>
            </Reveal>
          </div>
          <Reveal delay={0.15} className="flex flex-col items-start gap-3 sm:flex-row lg:flex-col lg:items-end">
            <Link
              href="/contact"
              data-track="cta_click"
              data-track-label="cta_band"
              className="inline-flex items-center gap-2 rounded-full bg-brass px-8 py-4 text-sm font-bold text-ink transition-all hover:bg-brass-bright active:scale-[0.98]"
            >
              Get a Free Quote <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href={`mailto:${SITE.email}`}
              data-track="email_click"
              data-track-label="cta_band"
              className="inline-flex items-center gap-2 text-sm font-medium text-bone/70 transition-colors hover:text-bone"
            >
              <Mail className="h-4 w-4" /> {SITE.email}
            </a>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
