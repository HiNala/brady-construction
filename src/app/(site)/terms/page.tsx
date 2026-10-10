import type { Metadata } from "next";
import { SITE, absoluteUrl } from "@/lib/site";
import { LegalLayout } from "@/components/legal-layout";

export const metadata: Metadata = {
  title: "Terms of Service",
  alternates: { canonical: absoluteUrl("/terms") },
};

export default function TermsPage() {
  return (
    <LegalLayout title="Terms of Service" updated="October 2026">
      <p>
        By using this website you agree to these terms. If you don&apos;t, please
        don&apos;t use the site.
      </p>
      <h2>Informational use</h2>
      <p>
        This site describes the services of {SITE.legalName} (California
        Contractor License #{SITE.license}). Content is general information, not
        a bid, contract, or professional/engineering advice for your specific
        property. Every project is quoted individually after a real
        conversation.
      </p>
      <h2>Accuracy</h2>
      <p>
        Cost figures in articles and on pages are typical ranges for the San
        Francisco Bay Area and are provided for planning only — they are not
        quotes. Actual pricing depends on your scope, site and selections.
      </p>
      <h2>Your submissions</h2>
      <p>
        You confirm information you send through our forms is accurate and that
        you&apos;re authorized to send it. We use it to respond to you (see our{" "}
        <a href="/privacy">Privacy Policy</a>).
      </p>
      <h2>Intellectual property</h2>
      <p>
        Site content, photos of our work, and this design are the property of{" "}
        {SITE.legalName} or its licensors. Please don&apos;t reuse them without
        written permission.
      </p>
      <h2>Limitation of liability</h2>
      <p>
        The site is provided &ldquo;as is&rdquo;. We&apos;re not liable for
        decisions made based on general information here — for real advice on
        your project, <a href="/contact">contact us</a>.
      </p>
      <h2>Governing law</h2>
      <p>These terms are governed by the laws of the State of California.</p>
      <h2>Contact</h2>
      <p>
        {SITE.legalName}, {SITE.address.street}, {SITE.address.city},{" "}
        {SITE.address.state} {SITE.address.zip} ·{" "}
        <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
      </p>
    </LegalLayout>
  );
}
