import { Container } from "./ui";
import { Reveal } from "./reveal";

export function LegalLayout({
  title,
  updated,
  children,
}: {
  title: string;
  updated: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-bone pb-24 pt-36 sm:pt-44">
      <Container className="max-w-3xl">
        <Reveal>
          <h1 className="display text-4xl font-medium sm:text-5xl">{title}</h1>
          <p className="mt-3 text-[13px] font-medium uppercase tracking-[0.14em] text-ink/40">
            Last updated {updated}
          </p>
        </Reveal>
        <Reveal delay={0.08} className="prose-brady mt-10">
          {children}
        </Reveal>
      </Container>
    </div>
  );
}
