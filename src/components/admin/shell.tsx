"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard, Inbox, BarChart3, Newspaper, ExternalLink, LogOut, Hammer,
} from "lucide-react";
import { cn } from "@/lib/utils";

const LINKS = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/leads", label: "Leads", icon: Inbox },
  { href: "/admin/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/admin/blog", label: "Journal Posts", icon: Newspaper },
];

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <div className="flex min-h-screen bg-[#14110d] text-bone">
      {/* Sidebar */}
      <aside className="fixed inset-y-0 left-0 z-40 flex w-60 flex-col border-r border-bone/10 bg-[#14110d]">
        <div className="border-b border-bone/10 px-6 py-6">
          <Link href="/admin" className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-sm bg-brass font-display text-lg font-semibold text-ink">
              B
            </span>
            <span className="leading-tight">
              <span className="display block text-[15px] font-semibold tracking-[0.08em]">BRADY</span>
              <span className="block text-[9px] font-semibold uppercase tracking-[0.24em] text-bone/50">Admin</span>
            </span>
          </Link>
        </div>
        <nav className="flex-1 space-y-1 p-4">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-4 py-2.5 text-[13.5px] font-medium transition-colors",
                pathname === l.href
                  ? "bg-brass/15 text-brass-bright"
                  : "text-bone/60 hover:bg-bone/5 hover:text-bone"
              )}
            >
              <l.icon className="h-4 w-4" />
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="space-y-1 border-t border-bone/10 p-4">
          <Link
            href="/"
            className="flex items-center gap-3 rounded-lg px-4 py-2.5 text-[13.5px] font-medium text-bone/60 hover:bg-bone/5 hover:text-bone"
          >
            <ExternalLink className="h-4 w-4" /> View site
          </Link>
          <button
            onClick={logout}
            className="flex w-full items-center gap-3 rounded-lg px-4 py-2.5 text-left text-[13.5px] font-medium text-bone/60 hover:bg-bone/5 hover:text-bone"
          >
            <LogOut className="h-4 w-4" /> Sign out
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="ml-60 flex-1">
        <div className="border-b border-bone/10 px-8 py-4">
          <p className="text-[12px] font-medium uppercase tracking-[0.16em] text-bone/40">
            <Hammer className="mr-2 inline h-3.5 w-3.5 text-brass-bright" />
            Brady Construction · Site Admin
          </p>
        </div>
        <main className="p-8">{children}</main>
      </div>
    </div>
  );
}
