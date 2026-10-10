"use client";

import { Fragment, useMemo, useState } from "react";
import { ChevronDown, Mail, Inbox } from "lucide-react";
import { cn, formatDateTime } from "@/lib/utils";

export type LeadRow = {
  id: number;
  kind: string;
  name: string;
  email: string;
  phone: string | null;
  city: string | null;
  projectType: string | null;
  budget: string | null;
  timeline: string | null;
  message: string | null;
  page: string | null;
  status: string;
  notes: string | null;
  emailSent: boolean;
  createdAt: string;
};

const STATUSES = ["new", "contacted", "qualified", "won", "lost", "archived"];
const STATUS_COLORS: Record<string, string> = {
  new: "bg-brass/20 text-brass-bright",
  contacted: "bg-blue-500/15 text-blue-300",
  qualified: "bg-emerald-500/15 text-emerald-300",
  won: "bg-emerald-500/25 text-emerald-200",
  lost: "bg-red-500/15 text-red-300",
  archived: "bg-bone/10 text-bone/45",
};

export function LeadsTable({ leads: initial }: { leads: LeadRow[] }) {
  const [leads, setLeads] = useState(initial);
  const [filter, setFilter] = useState<string>("all");
  const [kindFilter, setKindFilter] = useState<string>("all");
  const [expanded, setExpanded] = useState<number | null>(null);
  const [notes, setNotes] = useState<Record<number, string>>({});

  const filtered = useMemo(
    () =>
      leads.filter(
        (l) =>
          (filter === "all" || l.status === filter) &&
          (kindFilter === "all" || l.kind === kindFilter)
      ),
    [leads, filter, kindFilter]
  );

  async function setStatus(id: number, status: string) {
    setLeads((ls) => ls.map((l) => (l.id === id ? { ...l, status } : l)));
    await fetch("/api/admin/leads", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    });
  }

  async function saveNotes(id: number) {
    await fetch("/api/admin/leads", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, notes: notes[id] ?? "" }),
    });
  }

  const chip = (active: boolean) =>
    cn(
      "rounded-full border px-3.5 py-1.5 text-[12px] font-semibold capitalize transition-colors",
      active
        ? "border-brass bg-brass/15 text-brass-bright"
        : "border-bone/15 text-bone/55 hover:border-bone/40"
    );

  return (
    <div>
      <div className="mb-5 flex flex-wrap items-center gap-2">
        {["all", ...STATUSES].map((s) => (
          <button key={s} onClick={() => setFilter(s)} className={chip(filter === s)}>
            {s === "all" ? `All (${leads.length})` : s}
          </button>
        ))}
        <span className="mx-2 h-5 w-px bg-bone/15" />
        {["all", "quote", "contact", "newsletter"].map((k) => (
          <button key={k} onClick={() => setKindFilter(k)} className={chip(kindFilter === k)}>
            {k}
          </button>
        ))}
      </div>

      <div className="overflow-hidden rounded-xl border border-bone/10">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center gap-3 bg-coal py-16 text-bone/40">
            <Inbox className="h-8 w-8" />
            <p className="text-sm">No leads match this filter.</p>
          </div>
        ) : (
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-bone/10 bg-coal text-[11px] font-bold uppercase tracking-[0.12em] text-bone/40">
                <th className="px-5 py-3.5">Lead</th>
                <th className="hidden px-5 py-3.5 md:table-cell">Project</th>
                <th className="hidden px-5 py-3.5 lg:table-cell">Budget / Timeline</th>
                <th className="px-5 py-3.5">Status</th>
                <th className="hidden px-5 py-3.5 lg:table-cell">Received</th>
                <th className="w-10" />
              </tr>
            </thead>
            <tbody className="divide-y divide-bone/8">
              {filtered.map((l) => (
                <Fragment key={l.id}>
                  <tr
                    onClick={() => {
                      setExpanded(expanded === l.id ? null : l.id);
                      setNotes((n) => ({ ...n, [l.id]: l.notes ?? "" }));
                    }}
                    className="cursor-pointer bg-coal transition-colors hover:bg-coal-2"
                  >
                    <td className="px-5 py-4">
                      <p className="text-[14px] font-semibold text-bone">{l.name}</p>
                      <p className="text-[12px] text-bone/45">{l.email}</p>
                      {l.phone && <p className="text-[12px] text-bone/45">{l.phone}</p>}
                    </td>
                    <td className="hidden px-5 py-4 md:table-cell">
                      <p className="text-[13px] capitalize text-bone/75">
                        {l.kind}{l.projectType ? ` · ${l.projectType}` : ""}
                      </p>
                      {l.city && <p className="text-[12px] text-bone/45">{l.city}</p>}
                    </td>
                    <td className="hidden px-5 py-4 lg:table-cell">
                      <p className="text-[12.5px] text-bone/65">{l.budget ?? "—"}</p>
                      <p className="text-[12px] text-bone/40">{l.timeline ?? ""}</p>
                    </td>
                    <td className="px-5 py-4" onClick={(e) => e.stopPropagation()}>
                      <select
                        value={l.status}
                        onChange={(e) => setStatus(l.id, e.target.value)}
                        className={cn(
                          "cursor-pointer rounded-full border-0 px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider focus:outline-none",
                          STATUS_COLORS[l.status] ?? STATUS_COLORS.new
                        )}
                        aria-label="Lead status"
                      >
                        {STATUSES.map((s) => (
                          <option key={s} value={s} className="bg-ink text-bone">{s}</option>
                        ))}
                      </select>
                    </td>
                    <td className="hidden px-5 py-4 lg:table-cell">
                      <p className="text-[12px] text-bone/45">{formatDateTime(l.createdAt)}</p>
                      {l.emailSent && (
                        <p className="mt-0.5 flex items-center gap-1 text-[11px] text-emerald-400">
                          <Mail className="h-3 w-3" /> emailed
                        </p>
                      )}
                    </td>
                    <td className="px-3 py-4">
                      <ChevronDown className={cn("h-4 w-4 text-bone/40 transition-transform", expanded === l.id && "rotate-180")} />
                    </td>
                  </tr>
                  {expanded === l.id && (
                    <tr className="bg-[#191511]">
                      <td colSpan={6} className="px-5 py-5">
                        <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
                          <div>
                            <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-bone/40">Message</p>
                            <p className="mt-2 whitespace-pre-wrap text-[13.5px] leading-relaxed text-bone/75">
                              {l.message || "—"}
                            </p>
                            <p className="mt-4 text-[11px] text-bone/35">
                              Page: {l.page ?? "—"} · Preferred: email
                            </p>
                          </div>
                          <div>
                            <label htmlFor={`notes-${l.id}`} className="text-[11px] font-bold uppercase tracking-[0.14em] text-bone/40">
                              Internal notes
                            </label>
                            <textarea
                              id={`notes-${l.id}`}
                              value={notes[l.id] ?? ""}
                              onChange={(e) => setNotes((n) => ({ ...n, [l.id]: e.target.value }))}
                              rows={3}
                              className="mt-2 w-full rounded-lg border border-bone/15 bg-ink px-3 py-2 text-[13px] text-bone focus:border-brass focus:outline-none"
                              placeholder="Follow-up notes…"
                            />
                            <div className="mt-2 flex gap-2">
                              <button
                                onClick={() => saveNotes(l.id)}
                                className="rounded-lg bg-brass px-4 py-2 text-[12px] font-bold text-ink hover:bg-brass-bright"
                              >
                                Save notes
                              </button>
                              <a
                                href={`mailto:${l.email}?subject=${encodeURIComponent(`Re: Your ${l.projectType ?? "project"} inquiry — Brady Construction`)}`}
                                className="rounded-lg border border-bone/20 px-4 py-2 text-[12px] font-semibold text-bone/70 hover:border-bone/40"
                              >
                                Reply by email
                              </a>
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </Fragment>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
