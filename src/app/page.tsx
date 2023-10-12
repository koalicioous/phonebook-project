/** @jsxImportSource @emotion/react */
"use client";
import { css } from "@emotion/react";
import ContactsListWrapper from "@/components/ContactsListWrapper";
import useGetContactList from "@/services/contact/hooks/useGetContactList";
import { Toaster } from "react-hot-toast";

const containerStyle = css`
  display: flex;
  min-height: 100vh; /* Equivalent to min-h-screen in Tailwind */
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export default function Home() {
  const { contacts } = useGetContactList({
    variables: {
      order_by: [
        {
          created_at: "desc",
        },
      ],
    },
  });

  return (
    <main css={containerStyle}>
      <Toaster />
      <ContactsListWrapper favorites={[]} contacts={contacts} />
    </main>
  );
}
