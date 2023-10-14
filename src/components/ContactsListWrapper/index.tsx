/** @jsxImportSource @emotion/react */

import { Contact } from "@/services/contact/types";
import { css, keyframes } from "@emotion/react";
import ContactListItem from "../ContactListItem";
import ConditionalRender from "../ConditionalRender";
import AddContactModal from "../AddContactModal";
import { useAtom } from "jotai";
import {
  deleteConfirmationModalVisible,
  searchFieldAtom,
  searchQueryAtom,
} from "@/services/contact/atom";
import DeleteConfirmationModal from "../DeleteConfirmationModal";
import LoadingAnimation from "../Spinner";
import useManageSavedContacts from "@/services/contact/hooks/useManageSavedContacts";
import { ChangeEvent, useMemo } from "react";
import { CONTACT_LIST_QUERY_LIMIT } from "@/utils/contants";
import useGetContactList from "@/services/contact/hooks/useGetContactList";
import { debounce } from "@/utils/helper";
import useGetContactAggregate from "@/services/contact/hooks/useGetContactAggregate";
import SearchBar from "../SearchBar";
import EditContactModal from "../EditContactModal";

const ContactsListWrapper = () => {
  const [searchQuery, setSearchQuery] = useAtom(searchQueryAtom);
  const [searchField, setSearchField] = useAtom(searchFieldAtom);
  const [deleteModalAtom, setDeleteModalAtom] = useAtom(
    deleteConfirmationModalVisible
  );

  const { saveContactToFavorite, savedContacts, removeSavedContact } =
    useManageSavedContacts();
  const { count } = useGetContactAggregate();

  const savedContactIds = useMemo(() => {
    return savedContacts.map((item) => item.id);
  }, [savedContacts]);

  const { contacts, loading, fetchMore, refetch } = useGetContactList({
    variables: {
      order_by: [
        {
          created_at: "desc",
        },
      ],
      offset: 0,
      limit: CONTACT_LIST_QUERY_LIMIT,
      ...(savedContactIds.length > 0 &&
        !searchQuery && {
          where: {
            _not: {
              id: {
                _in: savedContactIds,
              },
            },
          },
        }),
      ...(!!searchQuery && {
        where: {
          ...(searchField === "number"
            ? {
                phones: {
                  number: {
                    _ilike: `%${searchQuery}%`,
                  },
                },
              }
            : {
                [searchField]: {
                  _ilike: `%${searchQuery}%`,
                },
              }),
        },
      }),
    },
  });

  const hasNextPage =
    !searchQuery && count > contacts.length + savedContactIds.length;

  const loadMoreData = (newOffset: number) => {
    fetchMore({
      variables: {
        offset: newOffset,
      },
    });
  };

  const removeFromFavorite = (contact: Contact) => {
    removeSavedContact(contact);
    setTimeout(() => {
      refetch();
    }, 100);
  };

  const saveToFavorite = (contact: Contact) => {
    saveContactToFavorite(contact);
    setTimeout(() => {
      refetch();
    }, 200);
  };

  const handleSearchContact = debounce((e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setTimeout(() => {
      refetch();
    }, 100);
  }, 500);

  return (
    <>
      <DeleteConfirmationModal
        open={deleteModalAtom}
        onOpenChange={setDeleteModalAtom}
        onSuccess={removeFromFavorite}
      ></DeleteConfirmationModal>
      <EditContactModal />
      <div css={contactsListWrapperStyle}>
        <SearchBar handleSearchContact={handleSearchContact} />
        <ConditionalRender condition={!searchQuery}>
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
        </ConditionalRender>
        <div css={contactListSectionStyle}>
          <div css={headingWrapperStyle}>
            <h1 css={headingStyle}>
              {!searchQuery ? "Contacts List" : "Search Result"}
            </h1>
            <ConditionalRender condition={!searchQuery}>
              <AddContactModal>
                <button css={addButtonStyle}>+ Add Contact</button>
              </AddContactModal>
            </ConditionalRender>
          </div>
          <div css={scrollableListStyle}>
            {contacts
              .filter((item) => {
                return true;
                // TODO: Remove filter logic from here
                return !savedContactIds.includes(item.id);
              })
              .map((contact) => {
                const saved = savedContactIds.includes(contact.id);
                return (
                  <ContactListItem
                    key={contact.id}
                    contact={contact}
                    onFavoriteButtonClicked={
                      saved ? removeFromFavorite : saveToFavorite
                    }
                    favorite={saved ? true : false}
                  />
                );
              })}
            {loading && <LoadingAnimation />}
            {!hasNextPage && !loading && !searchQuery && (
              <div
                css={{
                  padding: "8px 16px",
                  width: "100%",
                  text: "12px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "#f1f5f9",
                  color: "#0f172a",
                  marginTop: "8px",
                }}
              >
                {contacts.length > 0 && "You have reached the end of list"}
                {count === savedContactIds.length && "No More Contacts"}
              </div>
            )}
            {!!searchQuery && contacts.length === 0 && (
              <div
                css={{
                  padding: "8px 16px",
                  width: "100%",
                  text: "12px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "#f1f5f9",
                  color: "#0f172a",
                  marginTop: "8px",
                }}
              >
                No result found
              </div>
            )}
            {hasNextPage && (
              <button
                css={loadMoreButtonStyle}
                onClick={() => {
                  loadMoreData(contacts.length);
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
  gap: 12px;

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

const fadeInOut = keyframes`
  from {
    max-height: 0;
    opacity: 0;
  }

  to {
    max-height: 50vh; /* Adjust max-height as needed */
    opacity: 1;
  }
`;

const addButtonStyle = css`
  border: 1px solid #e0e0e0;
  padding: 8px 12px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 12px;
  font-weight: 600;
  animation: ${fadeInOut} 0.3s ease;
  &:hover {
    background-color: #e0e0e0;
  }
`;

const contactListSectionStyle = css`
  height: 100%;
  max-height: calc(50vh - 40px);
  animation: ${fadeInOut} 0.3s ease;
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
