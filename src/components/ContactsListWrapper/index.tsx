/** @jsxImportSource @emotion/react */

import { css } from "@emotion/react";

const contactsListWrapperStyle = css`
  background-color: white;
  padding: 20px;
  width: 100%;
  height: 100%;
  max-width: 500px;
  margin: 0 auto;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

  @media (max-width: 600px) {
    border-radius: 0;
  }
`;

const ContactsListWrapper = () => {
  return (
    <div css={contactsListWrapperStyle}>
      <h1>ContactsListWrapper</h1>
    </div>
  );
};

export default ContactsListWrapper;
