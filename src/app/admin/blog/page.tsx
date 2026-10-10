import Link from "next/link";
import { connection } from "next/server";
import { Plus, Eye, FileText } from "lucide-react";
import { getAllPostsAdmin } from "@/lib/posts";
import { formatDate } from "@/lib/utils";
import { cn } from "@/lib/utils";

export default async function AdminBlogPage() {
  await connection();
  const posts = await getAllPostsAdmin();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="display text-3xl font-medium">Journal Posts</h1>
        <Link
          href="/admin/blog/new"
          className="flex items-center gap-2 rounded-lg bg-brass px-4 py-2.5 text-[13px] font-bold text-ink hover:bg-brass-bright"
        >
          <Plus className="h-4 w-4" /> New post
        </Link>
      </div>

      <div className="overflow-hidden rounded-xl border border-bone/10">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-bone/10 bg-coal text-[11px] font-bold uppercase tracking-[0.12em] text-bone/40">
              <th className="px-5 py-3.5">Post</th>
              <th className="hidden px-5 py-3.5 md:table-cell">Category</th>
              <th className="px-5 py-3.5">Status</th>
              <th className="hidden px-5 py-3.5 lg:table-cell">Published</th>
              <th className="px-5 py-3.5 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-bone/8">
            {posts.map((p) => (
              <tr key={p.id} className="bg-coal transition-colors hover:bg-coal-2">
                <td className="px-5 py-4">
                  <p className="flex items-center gap-2 text-[14px] font-semibold text-bone">
                    <FileText className="h-3.5 w-3.5 text-bone/40" />
                    {p.title}
                  </p>
                  <p className="mt-0.5 text-[12px] text-bone/40">/blog/{p.slug}</p>
                </td>
                <td className="hidden px-5 py-4 md:table-cell">
                  <span className="text-[13px] text-bone/65">{p.category}</span>
                </td>
                <td className="px-5 py-4">
                  <span
                    className={cn(
                      "rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider",
                      p.status === "published"
                        ? "bg-emerald-500/15 text-emerald-300"
                        : "bg-bone/10 text-bone/45"
                    )}
                  >
                    {p.status}
                  </span>
                </td>
                <td className="hidden px-5 py-4 lg:table-cell">
                  <span className="text-[12.5px] text-bone/50">
                    {p.publishedAt ? formatDate(p.publishedAt) : "—"}
                  </span>
                </td>
                <td className="px-5 py-4">
                  <div className="flex items-center justify-end gap-2">
                    {p.status === "published" && (
                      <Link
                        href={`/blog/${p.slug}`}
                        target="_blank"
                        aria-label="View post"
                        className="flex h-8 w-8 items-center justify-center rounded-lg border border-bone/15 text-bone/55 hover:border-bone/40"
                      >
                        <Eye className="h-3.5 w-3.5" />
                      </Link>
                    )}
                    <Link
                      href={`/admin/blog/${p.id}`}
                      className="rounded-lg border border-bone/15 px-3.5 py-1.5 text-[12px] font-semibold text-bone/70 hover:border-brass hover:text-brass-bright"
                    >
                      Edit
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
