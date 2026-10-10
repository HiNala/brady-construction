"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { ArrowLeft, Eye, Trash2, Save } from "lucide-react";
import { GALLERY } from "@/lib/gallery";
import { renderMarkdown } from "@/lib/markdown";
import { cn } from "@/lib/utils";

export type EditablePost = {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  body: string;
  coverImage: string | null;
  coverAlt: string | null;
  category: string;
  tags: string[];
  keywords: string[];
  metaTitle: string | null;
  metaDescription: string | null;
  status: string;
};

const inputCls =
  "w-full rounded-lg border border-bone/15 bg-ink px-4 py-2.5 text-[14px] text-bone placeholder:text-bone/30 focus:border-brass focus:outline-none";
const labelCls = "mb-1.5 block text-[11px] font-bold uppercase tracking-[0.12em] text-bone/45";

export function PostEditor({ initial }: { initial?: EditablePost }) {
  const router = useRouter();
  const [p, setP] = useState<EditablePost>(
    initial ?? {
      id: 0,
      slug: "",
      title: "",
      excerpt: "",
      body: "",
      coverImage: null,
      coverAlt: null,
      category: "Guides",
      tags: [],
      keywords: [],
      metaTitle: null,
      metaDescription: null,
      status: "draft",
    }
  );
  const [tab, setTab] = useState<"write" | "preview" | "seo">("write");
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);
  const [pickerOpen, setPickerOpen] = useState(false);

  function set<K extends keyof EditablePost>(k: K, v: EditablePost[K]) {
    setP((prev) => ({ ...prev, [k]: v }));
  }

  async function save(status?: string) {
    setSaving(true);
    setMsg(null);
    const payload = { ...p, status: status ?? p.status };
    const isNew = p.id === 0;
    const res = await fetch(isNew ? "/api/admin/posts" : `/api/admin/posts/${p.id}`, {
      method: isNew ? "POST" : "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const json = await res.json().catch(() => ({}));
    setSaving(false);
    if (!res.ok) {
      setMsg(json.error ?? "Save failed");
      return;
    }
    if (isNew && json.post?.id) {
      router.push(`/admin/blog/${json.post.id}`);
      return;
    }
    if (json.post?.id) setP((prev) => ({ ...prev, id: json.post.id }));
    setMsg("Saved ✓");
    setTimeout(() => setMsg(null), 2500);
    router.refresh();
  }

  async function remove() {
    if (!confirm("Delete this post permanently?")) return;
    await fetch(`/api/admin/posts/${p.id}`, { method: "DELETE" });
    router.push("/admin/blog");
    router.refresh();
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <button onClick={() => router.push("/admin/blog")} className="flex items-center gap-2 text-[13px] font-semibold text-bone/55 hover:text-bone">
          <ArrowLeft className="h-4 w-4" /> All posts
        </button>
        <div className="flex items-center gap-2">
          {msg && <span className="text-[13px] text-emerald-400">{msg}</span>}
          {p.status === "published" && p.slug && (
            <a href={`/blog/${p.slug}`} target="_blank" className="flex h-9 items-center gap-1.5 rounded-lg border border-bone/15 px-3.5 text-[12px] font-semibold text-bone/65 hover:border-bone/40">
              <Eye className="h-3.5 w-3.5" /> View
            </a>
          )}
          {p.id !== 0 && p.id > 0 && (
            <button onClick={remove} aria-label="Delete post" className="flex h-9 w-9 items-center justify-center rounded-lg border border-red-500/30 text-red-400 hover:bg-red-500/10">
              <Trash2 className="h-4 w-4" />
            </button>
          )}
          <button
            onClick={() => save("draft")}
            disabled={saving}
            className="rounded-lg border border-bone/20 px-4 py-2 text-[13px] font-semibold text-bone/75 hover:border-bone/40 disabled:opacity-50"
          >
            Save draft
          </button>
          <button
            onClick={() => save("published")}
            disabled={saving}
            className="flex items-center gap-2 rounded-lg bg-brass px-4 py-2 text-[13px] font-bold text-ink hover:bg-brass-bright disabled:opacity-50"
          >
            <Save className="h-3.5 w-3.5" /> {saving ? "Saving…" : "Publish"}
          </button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.6fr_1fr]">
        {/* Main column */}
        <div className="space-y-5">
          <div>
            <label htmlFor="pe-title" className={labelCls}>Title</label>
            <input
              id="pe-title"
              value={p.title}
              onChange={(e) => set("title", e.target.value)}
              placeholder="Post title"
              className={cn(inputCls, "display text-xl")}
            />
          </div>
          <div>
            <label htmlFor="pe-slug" className={labelCls}>Slug</label>
            <input
              id="pe-slug"
              value={p.slug}
              onChange={(e) => set("slug", e.target.value)}
              placeholder="auto-from-title"
              className={cn(inputCls, "font-mono text-[13px]")}
            />
          </div>
          <div>
            <label htmlFor="pe-excerpt" className={labelCls}>Excerpt</label>
            <textarea
              id="pe-excerpt"
              value={p.excerpt}
              onChange={(e) => set("excerpt", e.target.value)}
              rows={2}
              placeholder="One-sentence summary shown on cards & in search…"
              className={inputCls}
            />
          </div>

          <div>
            <div className="mb-2 flex gap-1 rounded-lg border border-bone/10 p-1">
              {(["write", "preview", "seo"] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  className={cn(
                    "flex-1 rounded-md px-3 py-1.5 text-[12px] font-semibold capitalize transition-colors",
                    tab === t ? "bg-brass/20 text-brass-bright" : "text-bone/50 hover:text-bone"
                  )}
                >
                  {t === "seo" ? "SEO" : t}
                </button>
              ))}
            </div>

            {tab === "write" && (
              <textarea
                value={p.body}
                onChange={(e) => set("body", e.target.value)}
                rows={22}
                placeholder={"Write in Markdown…\n\n## Section\nBody text with **bold**, lists, tables…"}
                className={cn(inputCls, "font-mono text-[13px] leading-relaxed")}
                aria-label="Post body (Markdown)"
              />
            )}
            {tab === "preview" && (
              <div className="rounded-lg border border-bone/15 bg-bone p-6">
                <div
                  className="prose-brady"
                  dangerouslySetInnerHTML={{ __html: renderMarkdown(p.body || "*Nothing yet…*") }}
                />
              </div>
            )}
            {tab === "seo" && (
              <div className="space-y-4 rounded-lg border border-bone/15 bg-coal p-5">
                <div>
                  <label htmlFor="pe-metatitle" className={labelCls}>Meta title</label>
                  <input id="pe-metatitle" value={p.metaTitle ?? ""} onChange={(e) => set("metaTitle", e.target.value)} placeholder={p.title} className={inputCls} />
                  <p className="mt-1 text-[11px] text-bone/35">{(p.metaTitle ?? p.title).length}/70 chars</p>
                </div>
                <div>
                  <label htmlFor="pe-metadesc" className={labelCls}>Meta description</label>
                  <textarea id="pe-metadesc" value={p.metaDescription ?? ""} onChange={(e) => set("metaDescription", e.target.value)} rows={3} placeholder={p.excerpt} className={inputCls} />
                  <p className="mt-1 text-[11px] text-bone/35">{(p.metaDescription ?? p.excerpt).length}/160 chars</p>
                </div>
                <div>
                  <label htmlFor="pe-keywords" className={labelCls}>Target keywords (comma-separated)</label>
                  <input
                    id="pe-keywords"
                    value={p.keywords.join(", ")}
                    onChange={(e) => set("keywords", e.target.value.split(",").map((s) => s.trim()).filter(Boolean))}
                    placeholder="kitchen remodel cost bay area, …"
                    className={inputCls}
                  />
                </div>
                {/* SERP preview */}
                <div className="rounded-lg bg-[#f5f2ec] p-4">
                  <p className="text-[12px] text-bone/0">preview</p>
                  <p className="text-[13px] text-[#1a0dab] underline decoration-1">
                    {(p.metaTitle || p.title || "Post title").slice(0, 70)}
                  </p>
                  <p className="text-[12px] text-[#006621]">bradyremodel.com/blog/{p.slug || "post-slug"}</p>
                  <p className="text-[12.5px] text-[#4d5156]">
                    {(p.metaDescription || p.excerpt || "Post description…").slice(0, 160)}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-5">
          <div>
            <label htmlFor="pe-category" className={labelCls}>Category</label>
            <input
              id="pe-category"
              value={p.category}
              onChange={(e) => set("category", e.target.value)}
              list="bc-cats"
              className={inputCls}
            />
            <datalist id="bc-cats">
              {["Cost Guides", "Remodeling Guides", "Structural & Foundations", "Bay Area Living", "Planning", "Guides"].map((c) => (
                <option key={c} value={c} />
              ))}
            </datalist>
          </div>
          <div>
            <label htmlFor="pe-tags" className={labelCls}>Tags (comma-separated)</label>
            <input
              id="pe-tags"
              value={p.tags.join(", ")}
              onChange={(e) => set("tags", e.target.value.split(",").map((s) => s.trim()).filter(Boolean))}
              placeholder="kitchen, costs"
              className={inputCls}
            />
          </div>
          <div>
            <span className={labelCls}>Cover image</span>
            {p.coverImage ? (
              <div className="relative aspect-[16/9] overflow-hidden rounded-lg border border-bone/15">
                <Image src={p.coverImage} alt={p.coverAlt ?? ""} fill sizes="400px" className="object-cover" />
              </div>
            ) : (
              <div className="flex aspect-[16/9] items-center justify-center rounded-lg border border-dashed border-bone/20 text-[12px] text-bone/35">
                No cover
              </div>
            )}
            <button
              onClick={() => setPickerOpen(!pickerOpen)}
              className="mt-2 w-full rounded-lg border border-bone/15 px-4 py-2 text-[12px] font-semibold text-bone/65 hover:border-brass hover:text-brass-bright"
            >
              {pickerOpen ? "Close gallery" : "Choose from project gallery"}
            </button>
            {pickerOpen && (
              <div className="mt-3 grid max-h-64 grid-cols-3 gap-2 overflow-y-auto rounded-lg border border-bone/10 p-2">
                {GALLERY.filter((g) => g.quality >= 4).map((g) => (
                  <button
                    key={g.src}
                    onClick={() => {
                      set("coverImage", g.src);
                      set("coverAlt", g.alt);
                      setPickerOpen(false);
                    }}
                    className={cn(
                      "relative aspect-[4/3] overflow-hidden rounded-md border-2 transition-colors",
                      p.coverImage === g.src ? "border-brass" : "border-transparent hover:border-bone/40"
                    )}
                  >
                    <Image src={g.src} alt={g.alt} fill className="object-cover" sizes="120px" />
                  </button>
                ))}
              </div>
            )}
            <label htmlFor="pe-coveralt" className={cn(labelCls, "mt-3")}>Cover alt text</label>
            <input
              id="pe-coveralt"
              value={p.coverAlt ?? ""}
              onChange={(e) => set("coverAlt", e.target.value)}
              className={inputCls}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
