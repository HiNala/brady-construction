import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";

export default function NotFound() {
  return (
    <div className="grain flex min-h-[100svh] items-center bg-ink text-bone">
      <div className="mx-auto max-w-2xl px-6 text-center">
        <p className="kicker text-brass-bright">404 — Lost on the jobsite</p>
        <h1 className="display mt-5 text-6xl font-medium sm:text-7xl">
          This page isn&apos;t on the plans
        </h1>
        <p className="mx-auto mt-6 max-w-md text-[15.5px] leading-relaxed text-bone/60">
          The link may be old or the page moved. Let&apos;s get you back to
          solid ground.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full bg-brass px-7 py-3.5 text-sm font-bold text-ink transition-colors hover:bg-brass-bright"
          >
            <ArrowLeft className="h-4 w-4" /> Back home
          </Link>
          <Link
            href="/work"
            className="inline-flex items-center gap-2 rounded-full border border-bone/25 px-7 py-3.5 text-sm font-semibold text-bone transition-colors hover:border-bone"
          >
            View our work <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
