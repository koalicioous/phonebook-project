/** @jsxImportSource @emotion/react */
"use client";
import CreateContactForm from "@/components/CreateContactForm";
import { contentWrapperStyle, pageContainerStyle } from "@/styles/SharedCSS";
import { Toaster } from "react-hot-toast";

const CreateContactPage = () => {
  return (
    <main css={pageContainerStyle}>
      <div css={contentWrapperStyle}>
        <Toaster />
        <CreateContactForm />
      </div>
    </main>
  );
};

export default CreateContactPage;
