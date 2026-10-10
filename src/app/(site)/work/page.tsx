import type { Metadata } from "next";
import { GALLERY } from "@/lib/gallery";
import { absoluteUrl, SITE } from "@/lib/site";
import { Container, Section, Kicker, Display } from "@/components/ui";
import { Reveal } from "@/components/reveal";
import { GalleryGrid } from "@/components/gallery";
import { CtaBand } from "@/components/cta-band";
import { ShareBar } from "@/components/share-bar";
import { YoutubeEmbed } from "@/components/youtube";

export const metadata: Metadata = {
  title: "Our Work — Project Gallery Across the Bay Area",
  description:
    "Real projects by Brady Construction: open-concept kitchens, bathroom remodels, additions, hillside foundations, custom homes and estates across the Bay Area and Wine Country.",
  alternates: { canonical: absoluteUrl("/work") },
};

const YT_VIDEOS = [
  { id: "vXDnSIlZsXg", title: "Brady Construction project walkthrough" },
  { id: "pLyUjZ8Ac14", title: "Brady Construction project video" },
];

export default function WorkPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-ink pb-16 pt-40 text-bone sm:pt-48">
        <Container className="relative z-10">
          <Reveal><Kicker light>Portfolio</Kicker></Reveal>
          <Reveal delay={0.06}>
            <Display as="h1" className="mt-5 max-w-3xl text-5xl text-bone sm:text-6xl">
              Forty-five years<br />of real work
            </Display>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mt-6 max-w-2xl text-[16px] leading-relaxed text-bone/65">
              Recent projects and favorites from decades ago — it&apos;s fun to
              look back. Filter by the kind of work you&apos;re dreaming about.
            </p>
          </Reveal>
        </Container>
        <div className="grain absolute inset-0" />
      </section>

      <Section className="bg-bone pt-14">
        <Container>
          <GalleryGrid images={GALLERY.filter((g) => g.quality >= 2)} />
          <div className="mt-14 flex justify-center">
            <ShareBar path="/work" title={`${SITE.name} — project gallery`} />
          </div>
        </Container>
      </Section>

      <Section className="bg-linen">
        <Container>
          <Reveal><Kicker>On film</Kicker></Reveal>
          <Reveal delay={0.05}>
            <Display className="mt-4 text-3xl sm:text-4xl">Project videos</Display>
          </Reveal>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {YT_VIDEOS.map((v) => (
              <Reveal key={v.id}>
                <YoutubeEmbed id={v.id} title={v.title} />
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <CtaBand title="Like what you see? Let's build yours." />
    </>
  );
}
