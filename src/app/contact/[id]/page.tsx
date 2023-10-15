/** @jsxImportSource @emotion/react */
"use client";
import ContactDetailForm from "@/components/ContactDetailForm";
import { contentWrapperStyle, pageContainerStyle } from "@/styles/SharedCSS";
import { Toaster } from "react-hot-toast";

const ContactDetailPage = () => {
  return (
    <main css={pageContainerStyle}>
      <div css={contentWrapperStyle}>
        <Toaster />
        <ContactDetailForm />
      </div>
    </main>
  );
};

export default ContactDetailPage;
