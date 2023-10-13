/** @jsxImportSource @emotion/react */
"use client";
import dynamic from "next/dynamic";
import { css } from "@emotion/react";
import { Toaster } from "react-hot-toast";

const ContactsListWrapper = dynamic(
  () => import("@/components/ContactsListWrapper"),
  {
    ssr: false,
  }
);

const containerStyle = css`
  display: flex;
  min-height: 100vh; /* Equivalent to min-h-screen in Tailwind */
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export default function Home() {
  return (
    <main css={containerStyle}>
      <Toaster />
      <ContactsListWrapper />
    </main>
  );
}
