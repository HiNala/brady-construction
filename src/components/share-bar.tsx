"use client";

import { useState } from "react";
import { Share2, Link2, Check, Mail, MessageSquare } from "lucide-react";
import { SITE } from "@/lib/site";

function XIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047v-2.66c0-3.025 1.792-4.697 4.533-4.697 1.313 0 2.686.236 2.686.236v2.971H15.83c-1.491 0-1.956.93-1.956 1.886v2.264h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z" />
    </svg>
  );
}

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.125 2.062 2.062 0 0 1 0 4.125zM7.119 20.452H3.554V9h3.565v11.452z" />
    </svg>
  );
}

export function ShareBar({
  path,
  title,
  text,
  dark = false,
}: {
  path: string;
  title: string;
  text?: string;
  dark?: boolean;
}) {
  const [copied, setCopied] = useState(false);
  const url = `${SITE.url.replace(/\/$/, "")}${path}`;
  const shareText = text ?? title;

  async function copy() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.bctrack?.("share", { method: "copy", path });
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  }

  async function native() {
    if (navigator.share) {
      try {
        await navigator.share({ title, text: shareText, url });
        window.bctrack?.("share", { method: "native", path });
      } catch {}
    } else {
      copy();
    }
  }

  const btn =
    "flex h-10 w-10 items-center justify-center rounded-full border transition-all hover:-translate-y-0.5";
  const theme = dark
    ? "border-bone/20 text-bone/75 hover:border-brass-bright hover:text-brass-bright"
    : "border-ink/15 text-ink/65 hover:border-brass-deep hover:text-brass-deep";

  const track = (method: string) => window.bctrack?.("share", { method, path });

  return (
    <div className="flex items-center gap-2">
      <span className={dark ? "kicker mr-2 text-bone/50" : "kicker mr-2 text-ink/45"}>
        Share
      </span>
      <button onClick={native} aria-label="Share" className={`${btn} ${theme}`}>
        <Share2 className="h-4 w-4" />
      </button>
      <a
        href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`}
        target="_blank" rel="noopener noreferrer" aria-label="Share on X"
        className={`${btn} ${theme}`} onClick={() => track("x")}
      >
        <XIcon className="h-4 w-4" />
      </a>
      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`}
        target="_blank" rel="noopener noreferrer" aria-label="Share on Facebook"
        className={`${btn} ${theme}`} onClick={() => track("facebook")}
      >
        <FacebookIcon className="h-4 w-4" />
      </a>
      <a
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`}
        target="_blank" rel="noopener noreferrer" aria-label="Share on LinkedIn"
        className={`${btn} ${theme}`} onClick={() => track("linkedin")}
      >
        <LinkedInIcon className="h-4 w-4" />
      </a>
      <a
        href={`mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(`${shareText}\n\n${url}`)}`}
        aria-label="Share by email" className={`${btn} ${theme}`}
        onClick={() => track("email")}
      >
        <Mail className="h-4 w-4" />
      </a>
      <a
        href={`sms:?&body=${encodeURIComponent(`${title} ${url}`)}`}
        aria-label="Share by text message" className={`${btn} ${theme}`}
        onClick={() => track("sms")}
      >
        <MessageSquare className="h-4 w-4" />
      </a>
      <button onClick={copy} aria-label="Copy link" className={`${btn} ${theme}`}>
        {copied ? <Check className="h-4 w-4 text-green-600" /> : <Link2 className="h-4 w-4" />}
      </button>
    </div>
  );
}
