import type { Metadata } from "next";
import { AdminShell } from "@/components/admin/shell";

// Admin is request-time only — opt out of instant-navigation validation
export const instant = false;

export const metadata: Metadata = {
  title: { default: "Admin", template: "%s | Brady Admin" },
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <AdminShell>{children}</AdminShell>;
}
