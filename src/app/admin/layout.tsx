import type { Metadata, Viewport } from "next";
import "@/styles/globals.css";
import { satoshi } from "@/styles/fonts";
import HolyLoader from "holy-loader";
import Providers from "../providers";

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
    <html lang="en">
      <body className={satoshi.className}>
        <HolyLoader color="#868686" />
        <Providers>
          {/* Add your admin-specific navigation here */}
          <main>{children}</main>
        </Providers>
      </body>
    </html>
  );
}