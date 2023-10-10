import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import BaseProviders from "@/components/Providers/ClientProviders";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Phone Book Project",
  description: "A Tokopedia Phone Book Project Assignment by Ulil Albab",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <BaseProviders>{children}</BaseProviders>
      </body>
    </html>
  );
}
