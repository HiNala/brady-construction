"use client";

import { useState } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

export function NewsletterForm({ variant = "dark" }: { variant?: "dark" | "light" }) {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "loading" | "done" | "error">("idle");
  const light = variant === "light";

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setState("loading");
    window.bctrack?.("form_start", { form: "newsletter" });
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ kind: "newsletter", email, name: "Newsletter subscriber", emailOptIn: true }),
      });
      if (!res.ok) throw new Error();
      window.bctrack?.("lead", { kind: "newsletter" });
      setState("done");
    } catch {
      setState("error");
    }
  }

  if (state === "done") {
    return (
      <p className={cn("mt-4 flex items-center gap-2 text-sm", light ? "text-brass-deep" : "text-brass-bright")}>
        <CheckCircle2 className="h-4 w-4" /> You&apos;re on the list — thank you.
      </p>
    );
  }

  return (
    <form onSubmit={submit} className="mt-4">
      <label htmlFor="nl-email" className="sr-only">Email address</label>
      <div className={cn(
        "flex overflow-hidden rounded-full border backdrop-blur",
        light ? "border-ink/15 bg-bone" : "border-bone/20 bg-bone/5"
      )}>
        <input
          id="nl-email"
          type="email"
          autoComplete="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@email.com"
          className={cn(
            "w-full bg-transparent px-4 py-3 text-sm focus:outline-none",
            light ? "text-ink placeholder:text-ink/40" : "text-bone placeholder:text-bone/40"
          )}
        />
        <button
          type="submit"
          disabled={state === "loading"}
          aria-label="Subscribe"
          className="flex items-center gap-1.5 bg-brass px-5 text-sm font-semibold text-ink transition-colors hover:bg-brass-bright disabled:opacity-60"
        >
          {state === "loading" ? "…" : <ArrowRight className="h-4 w-4" />}
        </button>
      </div>
      {state === "error" && (
        <p className={cn("mt-2 text-xs", light ? "text-red-700" : "text-red-300")}>Something went wrong — please try again.</p>
      )}
    </form>
  );
}
