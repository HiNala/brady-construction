import type { Metadata } from "next";
import { SITE, absoluteUrl } from "@/lib/site";

import { LegalLayout } from "@/components/legal-layout";

export const metadata: Metadata = {
  title: "Privacy Policy",
  alternates: { canonical: absoluteUrl("/privacy") },
  robots: { index: true },
};

export default function PrivacyPage() {
  return (
    <LegalLayout title="Privacy Policy" updated="October 2026">
      <p>
        {SITE.name} (&ldquo;we&rdquo;, &ldquo;us&rdquo;) respects your privacy. This policy explains what
        we collect on this website and why.
      </p>
      <h2>What we collect</h2>
      <ul>
        <li><strong>Contact & quote form submissions</strong> — name, email, phone, city, project details and message you choose to send us.</li>
        <li><strong>Newsletter signups</strong> — your email address, with your consent.</li>
        <li><strong>Site analytics</strong> — pages visited, approximate device/browser type, referrer and campaign (UTM) parameters. We store a one-way hash of your IP address — never the IP itself.</li>
      </ul>
      <h2>How we use it</h2>
      <ul>
        <li>To respond to your inquiry and provide a quote</li>
        <li>To send occasional project updates if you opt in (unsubscribe anytime)</li>
        <li>To understand how visitors use the site so we can improve it</li>
      </ul>
      <h2>What we never do</h2>
      <p>
        We never sell your information, share it with advertisers, or use it for
        anything beyond running this business and replying to you.
      </p>
      <h2>Cookies</h2>
      <p>
        We set anonymous, first-party cookies (<code>bc_vid</code>,{" "}
        <code>bc_sid</code>) so our own analytics can tell a new visitor from a
        returning one. No advertising or third-party tracking cookies.
      </p>
      <h2>Data retention & your rights</h2>
      <p>
        Lead and form data is kept in our private database. Email{" "}
        <a href={`mailto:${SITE.email}`}>{SITE.email}</a> anytime to see, correct
        or delete your information.
      </p>
      <h2>Contact</h2>
      <p>
        {SITE.legalName}, {SITE.address.street}, {SITE.address.city},{" "}
        {SITE.address.state} {SITE.address.zip} ·{" "}
        <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
      </p>
    </LegalLayout>
  );
}
