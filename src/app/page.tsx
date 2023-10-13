/** @jsxImportSource @emotion/react */
"use client";
import dynamic from "next/dynamic";
import { css } from "@emotion/react";
import useGetContactList from "@/services/contact/hooks/useGetContactList";
import { Toaster } from "react-hot-toast";
import useContactPagination from "@/services/contact/hooks/useContactPagination";
import { CONTACT_LIST_QUERY_LIMIT } from "@/utils/contants";

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
  const { updateTotalData } = useContactPagination(CONTACT_LIST_QUERY_LIMIT);
  const { contacts, loading, fetchMore } = useGetContactList({
    variables: {
      order_by: [
        {
          created_at: "desc",
        },
      ],
      offset: 0,
      limit: CONTACT_LIST_QUERY_LIMIT,
    },
    options: {
      onCompleted: (data) => {
        updateTotalData(data.contact.length);
      },
      notifyOnNetworkStatusChange: true,
    },
  });

  const loadMoreData = (newOffset: number) => {
    fetchMore({
      variables: {
        offset: newOffset,
      },
    });
  };

  return (
    <main css={containerStyle}>
      <Toaster />
      <ContactsListWrapper
        contacts={contacts}
        loading={loading}
        fetchMore={loadMoreData}
      />
    </main>
  );
}
