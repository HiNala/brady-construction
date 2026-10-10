import type { Metadata } from "next";
import { SITE, absoluteUrl } from "@/lib/site";
import { LegalLayout } from "@/components/legal-layout";

export const metadata: Metadata = {
  title: "Accessibility Statement",
  alternates: { canonical: absoluteUrl("/accessibility") },
};

export default function AccessibilityPage() {
  return (
    <LegalLayout title="Accessibility Statement" updated="October 2026">
      <p>
        {SITE.name} is committed to making this website usable by everyone,
        including people using assistive technology.
      </p>
      <h2>What we do</h2>
      <ul>
        <li>Semantic HTML landmarks, headings and skip-to-content links</li>
        <li>Alt text on all project imagery</li>
        <li>Visible keyboard focus styles and full keyboard navigation</li>
        <li>Color contrast targeting WCAG 2.2 AA</li>
        <li>Reduced-motion support for users who prefer it</li>
        <li>Form labels, validation messages and status updates announced to screen readers</li>
      </ul>
      <h2>Feedback</h2>
      <p>
        Found a barrier? We want to fix it. Email{" "}
        <a href={`mailto:${SITE.email}`}>{SITE.email}</a> with
        &ldquo;Accessibility&rdquo; in the subject and tell us what happened and
        where.
      </p>
    </LegalLayout>
  );
}
