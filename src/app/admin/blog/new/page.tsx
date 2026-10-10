import { PostEditor } from "@/components/admin/post-editor";

// Admin is fully dynamic — opt out of instant-navigation validation
export const instant = false;

export default function NewPostPage() {
  return <PostEditor />;
}
