"use client";

import { useState } from "react";
import { Play } from "lucide-react";

export function YoutubeEmbed({ id, title }: { id: string; title: string }) {
  const [play, setPlay] = useState(false);
  return (
    <div className="relative aspect-video overflow-hidden rounded-2xl border border-ink/10 bg-ink shadow-[var(--shadow-card)]">
      {play ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 h-full w-full"
        />
      ) : (
        <button
          onClick={() => {
            setPlay(true);
            window.bctrack?.("cta_click", { label: "video_play", id });
          }}
          className="group absolute inset-0 flex items-center justify-center"
          aria-label={`Play video: ${title}`}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`}
            alt={title}
            className="absolute inset-0 h-full w-full object-cover opacity-80 transition-opacity group-hover:opacity-70"
            loading="lazy"
          />
          <span className="relative flex h-16 w-16 items-center justify-center rounded-full bg-brass text-ink shadow-xl transition-transform group-hover:scale-110">
            <Play className="ml-1 h-6 w-6 fill-current" />
          </span>
        </button>
      )}
    </div>
  );
}
