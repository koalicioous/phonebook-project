/** @jsxImportSource @emotion/react */
"use client";
import { css } from "@emotion/react";
import ContactsListWrapper from "@/components/ContactsListWrapper";

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
      <ContactsListWrapper />
    </main>
  );
}
