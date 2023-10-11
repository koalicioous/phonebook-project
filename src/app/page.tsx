/** @jsxImportSource @emotion/react */
"use client";
import { css } from "@emotion/react";
import ContactsListWrapper from "@/components/ContactsListWrapper";
import useGetContactList from "@/services/contact/hooks/useGetContactList";

const containerStyle = css`
  display: flex;
  min-height: 100vh; /* Equivalent to min-h-screen in Tailwind */
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export default function Home() {
  const { contacts, fetchMore } = useGetContactList();
  console.log(contacts);

  return (
    <main css={containerStyle}>
      <ContactsListWrapper favorites={[]} contacts={contacts} />
    </main>
  );
}
