/** @jsxImportSource @emotion/react */

import { Contact } from "@/services/contact/types";
import { css } from "@emotion/react";

type ContactListItemProps = {
  contact: Contact;
};

const ContactListItem = ({ contact }: ContactListItemProps) => {
  return (
    <div css={contactListItemStyle}>
      {contact.firstName} - {contact.phones[0].number}
    </div>
  );
};

const contactListItemStyle = css`
  display: flex;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #e0e0e0;
  cursor: pointer;
  &:hover {
    background-color: #f5f5f5;
  }
`;

export default ContactListItem;
