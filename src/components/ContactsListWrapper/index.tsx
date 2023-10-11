/** @jsxImportSource @emotion/react */

import { Contact } from "@/services/contact/types";
import { css } from "@emotion/react";
import ContactListItem from "../ContactListItem";
import ConditionalRender from "../ConditionalRender";

type ContactListWrapperProps = {
  favorites: Contact[];
  contacts: Contact[];
};

const ContactsListWrapper = ({
  favorites,
  contacts,
}: ContactListWrapperProps) => {
  return (
    <div css={contactsListWrapperStyle}>
      <div css={contactListSectionStyle}>
        <h1 css={headingStyle}>Favorites</h1>
        <ConditionalRender condition={favorites.length === 0}>
          <div css={favoritesEmptyState}>
            You have not added any favorites yet
          </div>
        </ConditionalRender>
      </div>
      <div css={contactListSectionStyle}>
        <div css={headingWrapperStyle}>
          <h1 css={headingStyle}>Contacts List</h1>
          <button css={addButtonStyle}>+ Add Contact</button>
        </div>
        <div css={scrollableListStyle}>
          {contacts.map((contact) => {
            return <ContactListItem key={contact.id} contact={contact} />;
          })}
          <button css={loadMoreButtonStyle} onClick={() => {}}>
            Load More
          </button>
        </div>
      </div>
    </div>
  );
};

const contactsListWrapperStyle = css`
  background-color: white;
  padding: 20px;
  width: 100%;
  height: 100%;
  max-width: 750px;
  margin: 0 auto;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  height: 100vh;
  display: flex;
  flex-direction: column;
  gap: 20px;

  @media (max-width: 600px) {
    border-radius: 0;
    height: 100vh;
  }

  @media (min-width: 600px) {
    max-height: 90vh;
  }
`;

const headingWrapperStyle = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
`;

const headingStyle = css`
  font-size: 16px;
  font-weight: 600;
  @media (min-width: 600px) {
    font-size: 20px;
  }
`;

const addButtonStyle = css`
  border: 1px solid #e0e0e0;
  padding: 10px 20px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 600;
  &:hover {
    background-color: #e0e0e0;
  }
`;

const contactListSectionStyle = css`
  height: 100%;
  max-height: calc(50vh - 40px);
  @media (min-width: 600px) {
    max-height: calc(45vh - 40px);
  }
`;

const scrollableListStyle = css`
  overflow-y: auto;
  height: calc(100% - 40px);
`;

const loadMoreButtonStyle = css`
  background-color: #f5f5f5;
  border: none;
  width: 100%;
  padding: 10px 20px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 600;
  margin-top: 10px;
  &:hover {
    background-color: #e0e0e0;
  }
`;

const favoritesEmptyState = css`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f9fafb;
  padding: 20px;
  border-radius: 8px;
  width: 100%;
  height: 80%;
`;

export default ContactsListWrapper;
