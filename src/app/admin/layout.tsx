import type { Metadata, Viewport } from "next";
import "@/styles/globals.css";
import { satoshi } from "@/styles/fonts";
import HolyLoader from "holy-loader";
import Providers from "../providers";
import AdminBreadcrumb from "@/components/Admin/AdminBreadcrumb";

export const metadata: Metadata = {
  title: "Trithya Admin",
  description: "Admin Dashboard",
};

export const viewport: Viewport = {
  themeColor: "#000000",
};

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-950">
      <main className="flex-1 ml-64">
        <div className="p-4 border-b dark:border-gray-800">
          <AdminBreadcrumb />
        </div>
        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  );
}