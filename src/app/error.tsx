"use client";

import { useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, RotateCw } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="grain flex min-h-[100svh] items-center bg-ink text-bone">
      <div className="mx-auto max-w-2xl px-6 text-center">
        <p className="kicker text-brass-bright">Something went wrong</p>
        <h1 className="display mt-5 text-5xl font-medium sm:text-6xl">
          The site hit a snag
        </h1>
        <p className="mx-auto mt-6 max-w-md text-[15.5px] leading-relaxed text-bone/60">
          Our apologies — the page didn&apos;t load as it should. Try again, or
          head back home.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={reset}
            className="inline-flex items-center gap-2 rounded-full bg-brass px-7 py-3.5 text-sm font-bold text-ink transition-colors hover:bg-brass-bright"
          >
            <RotateCw className="h-4 w-4" /> Try again
          </button>
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full border border-bone/25 px-7 py-3.5 text-sm font-semibold text-bone transition-colors hover:border-bone"
          >
            <ArrowLeft className="h-4 w-4" /> Back home
          </Link>
        </div>
      </div>
    </div>
  );
}
