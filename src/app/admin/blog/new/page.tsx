import { requireAdmin } from "@/lib/auth";
import { PostEditor } from "@/components/admin/post-editor";

// Admin is fully dynamic — opt out of instant-navigation validation
export const instant = false;

export default async function NewPostPage() {
  await requireAdmin();
  return <PostEditor />;
}
