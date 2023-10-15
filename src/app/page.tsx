/** @jsxImportSource @emotion/react */
"use client";
import dynamic from "next/dynamic";
import { Toaster } from "react-hot-toast";
import { pageContainerStyle } from "@/styles/SharedCSS";

const ContactsListWrapper = dynamic(
  () => import("@/components/ContactsListWrapper"),
  {
    ssr: false,
  }
);

export default function Home() {
  return (
    <main css={pageContainerStyle}>
      <Toaster />
      <ContactsListWrapper />
    </main>
  );
}
