"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Hammer } from "lucide-react";


function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    if (res.ok) {
      router.push(params.get("next") || "/admin");
      router.refresh();
    } else {
      setError("Invalid email or password.");
      setLoading(false);
    }
  }

  return (
    <div className="grain flex min-h-screen items-center justify-center bg-ink px-4">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-lg bg-brass font-display text-2xl font-semibold text-ink">
            B
          </span>
          <h1 className="display mt-5 text-2xl font-medium text-bone">Brady Admin</h1>
          <p className="mt-1 text-[13px] text-bone/50">Site owner sign-in</p>
        </div>
        <form onSubmit={submit} className="rounded-2xl border border-bone/10 bg-coal p-7">
          <label htmlFor="admin-email" className="mb-1.5 block text-[12px] font-semibold uppercase tracking-[0.1em] text-bone/50">
            Email
          </label>
          <input
            id="admin-email"
            type="email"
            required
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-lg border border-bone/15 bg-ink px-4 py-3 text-sm text-bone placeholder:text-bone/30 focus:border-brass focus:outline-none"
            placeholder="you@bradyremodel.com"
          />
          <label htmlFor="admin-pass" className="mb-1.5 mt-5 block text-[12px] font-semibold uppercase tracking-[0.1em] text-bone/50">
            Password
          </label>
          <input
            id="admin-pass"
            type="password"
            required
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-lg border border-bone/15 bg-ink px-4 py-3 text-sm text-bone placeholder:text-bone/30 focus:border-brass focus:outline-none"
            placeholder="••••••••"
          />
          {error && <p className="mt-3 text-[13px] text-red-400">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg bg-brass py-3.5 text-sm font-bold text-ink transition-colors hover:bg-brass-bright disabled:opacity-60"
          >
            <Hammer className="h-4 w-4" />
            {loading ? "Signing in…" : "Sign in"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}
