import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import BaseProviders from "@/components/Providers/ClientProviders";
import RootStyleRegistry from "./emotion";
import { ReactNode } from "react";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Phone Book Project",
  description: "A Tokopedia Phone Book Project Assignment by Ulil Albab",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1"
        />
      </Head>
      <html lang="en">
        <body className={inter.className}>
          <RootStyleRegistry>
            <BaseProviders>{children}</BaseProviders>
          </RootStyleRegistry>
        </body>
      </html>
    </>
  );
}
