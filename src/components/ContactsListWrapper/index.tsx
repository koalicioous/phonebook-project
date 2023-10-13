/** @jsxImportSource @emotion/react */

import { Contact } from "@/services/contact/types";
import { css } from "@emotion/react";
import ContactListItem from "../ContactListItem";
import ConditionalRender from "../ConditionalRender";
import AddContactModal from "../AddContactModal";
import { useAtom } from "jotai";
import { deleteConfirmationModalVisible } from "@/services/contact/atom";
import DeleteConfirmationModal from "../DeleteConfirmationModal";
import LoadingAnimation from "../Spinner";
import useContactPagination from "@/services/contact/hooks/useContactPagination";
import useManageSavedContacts from "@/services/contact/hooks/useManageSavedContacts";
import { useMemo } from "react";

type ContactListWrapperProps = {
  contacts: Contact[];
  loading: boolean;
  fetchMore: (newOffset: number) => void;
};

const ContactsListWrapper = ({
  contacts,
  loading,
  fetchMore,
}: ContactListWrapperProps) => {
  const [deleteModalAtom, setDeleteModalAtom] = useAtom(
    deleteConfirmationModalVisible
  );
  const { nextPageAvailable } = useContactPagination();
  const { saveContactToFavorite, savedContacts, removeSavedContact } =
    useManageSavedContacts();

  const removeFromFavorite = (contact: Contact) => {
    removeSavedContact(contact);
  };

  const saveToFavorite = (contact: Contact) => {
    saveContactToFavorite(contact);
  };

  const savedContactIds = useMemo(() => {
    return savedContacts.map((item) => item.id);
  }, [savedContacts]);

  return (
    <>
      <DeleteConfirmationModal
        open={deleteModalAtom}
        onOpenChange={setDeleteModalAtom}
        onSuccess={removeFromFavorite}
      ></DeleteConfirmationModal>
      <div css={contactsListWrapperStyle}>
        <div css={contactListSectionStyle}>
          <h1 css={headingStyle}>Favorites</h1>
          <ConditionalRender condition={savedContacts.length === 0}>
            <div css={favoritesEmptyState}>
              You have not added any favorites yet
            </div>
          </ConditionalRender>
          <ConditionalRender condition={savedContacts.length > 0}>
            <div css={scrollableListStyle}>
              {savedContacts.map((contact) => {
                return (
                  <ContactListItem
                    key={contact.id}
                    contact={contact}
                    onFavoriteButtonClicked={removeFromFavorite}
                    favorite={true}
                  />
                );
              })}
            </div>
          </ConditionalRender>
        </div>
        <div css={contactListSectionStyle}>
          <div css={headingWrapperStyle}>
            <h1 css={headingStyle}>Contacts List</h1>
            <AddContactModal>
              <button css={addButtonStyle}>+ Add Contact</button>
            </AddContactModal>
          </div>
          <div css={scrollableListStyle}>
            {contacts
              .filter((item) => {
                return !savedContactIds.includes(item.id);
              })
              .map((contact) => {
                return (
                  <ContactListItem
                    key={contact.id}
                    contact={contact}
                    onFavoriteButtonClicked={saveToFavorite}
                    favorite={false}
                  />
                );
              })}
            {loading && <LoadingAnimation />}
            {!nextPageAvailable && contacts.length > 0 && (
              <div
                css={{
                  padding: "8px 16px",
                  width: "100%",
                  text: "12px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "#f1f5f9",
                  color: "#64748b",
                  marginTop: "8px",
                }}
              >
                You have reached the end of list
              </div>
            )}
            {nextPageAvailable && (
              <button
                css={loadMoreButtonStyle}
                onClick={() => {
                  fetchMore(contacts.length);
                }}
              >
                Load More
              </button>
            )}
          </div>
        </div>
      </div>
    </>
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
  padding: 8px 12px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 12px;
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
