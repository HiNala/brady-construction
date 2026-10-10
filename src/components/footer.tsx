import Link from "next/link";
import { MapPin, Mail, ShieldCheck, Play } from "lucide-react";
import { NAV, SITE } from "@/lib/site";
import { SERVICES } from "@/data/services";
import { AREAS } from "@/data/areas";
import { Logo } from "./header";
import { NewsletterForm } from "./forms/newsletter-form";

async function CopyrightYear() {
  "use cache";
  return <>{new Date().getFullYear()}</>;
}

export function Footer() {
  return (
    <footer className="grain relative bg-ink text-bone">
      <div className="mx-auto max-w-6xl px-5 pb-12 pt-20 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_1fr_1fr_1.2fr]">
          <div>
            <Logo light />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-bone/60">
              Family-owned and operated since {SITE.founded}. Building and
              remodeling across San Francisco and Northern California for over
              four decades.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-brass-bright/30 bg-brass-bright/10 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-brass-bright">
                <ShieldCheck className="h-3.5 w-3.5" />
                CA License #{SITE.license}
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-bone/15 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-bone/60">
                Since {SITE.founded}
              </span>
            </div>
          </div>

          <nav aria-label="Services">
            <h3 className="kicker text-brass-bright">Services</h3>
            <ul className="mt-5 space-y-2.5">
              {SERVICES.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`/services/${s.slug}`}
                    className="link-sweep text-sm text-bone/70 hover:text-bone"
                  >
                    {s.shortTitle}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Company">
            <h3 className="kicker text-brass-bright">Company</h3>
            <ul className="mt-5 space-y-2.5">
              {NAV.map((n) => (
                <li key={n.href}>
                  <Link
                    href={n.href}
                    className="link-sweep text-sm text-bone/70 hover:text-bone"
                  >
                    {n.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/feed.xml"
                  className="link-sweep text-sm text-bone/70 hover:text-bone"
                >
                  RSS Feed
                </Link>
              </li>
            </ul>
            <h3 className="kicker mt-8 text-brass-bright">Service Areas</h3>
            <ul className="mt-4 space-y-2">
              {AREAS.map((a) => (
                <li key={a.slug}>
                  <Link
                    href={`/areas/${a.slug}`}
                    className="link-sweep text-sm text-bone/70 hover:text-bone"
                  >
                    {a.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h3 className="kicker text-brass-bright">Stay in touch</h3>
            <p className="mt-5 text-sm leading-relaxed text-bone/60">
              Remodeling guides, cost breakdowns and project stories — a few
              times a year, never spam.
            </p>
            <NewsletterForm />
            <div className="mt-8 space-y-3 text-sm text-bone/70">
              <a
                href={`mailto:${SITE.email}`}
                data-track="email_click"
                className="flex items-center gap-2.5 hover:text-bone"
              >
                <Mail className="h-4 w-4 text-brass-bright" />
                {SITE.email}
              </a>
              <p className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brass-bright" />
                {SITE.address.street}, {SITE.address.city}, {SITE.address.state}{" "}
                {SITE.address.zip}
                <br />
                <span className="text-bone/45">{SITE.hours}</span>
              </p>
              <a
                href={SITE.socials.youtube}
                target="_blank"
                rel="noopener noreferrer"
                data-track="outbound_click"
                className="flex items-center gap-2.5 hover:text-bone"
              >
                <Play className="h-4 w-4 text-brass-bright" />
                YouTube
              </a>
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-bone/10 pt-8 text-[12px] text-bone/45 sm:flex-row">
          <p>
            © <CopyrightYear /> {SITE.legalName}. CA Contractor License
            #{SITE.license}. All rights reserved.
          </p>
          <div className="flex items-center gap-5">
            <Link href="/privacy" className="hover:text-bone">Privacy</Link>
            <Link href="/terms" className="hover:text-bone">Terms</Link>
            <Link href="/accessibility" className="hover:text-bone">Accessibility</Link>
            <Link href="/sitemap.xml" className="hover:text-bone">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
