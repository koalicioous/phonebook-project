"use client";
import { getLocalStorageValue, setLocalStorageValue } from "@/utils/helper";
import { Contact } from "../types";
import { ContactsLocalStorageKeys } from "../types/enums";
import { useState } from "react";

const useManageSavedContacts = () => {
  const [savedContacts, setSavedContacts] = useState<Contact[]>(
    getLocalStorageValue(ContactsLocalStorageKeys.FAVORITE_CONTACTS) ?? []
  );
  const saveContactToFavorite = (contact: Contact): void => {
    setSavedContacts((prev) => {
      return [...prev, contact];
    });
    const savedContactsOnDevice = getLocalStorageValue(
      ContactsLocalStorageKeys.FAVORITE_CONTACTS
    );
    let newValue: Contact[] = [];
    if (savedContactsOnDevice) {
      newValue = [...savedContactsOnDevice];
    }
    newValue.push(contact);
    setSavedContacts(newValue);

    setLocalStorageValue(ContactsLocalStorageKeys.FAVORITE_CONTACTS, newValue);
  };

  const removeSavedContact = (removeTarget: Contact) => {
    const newValue = savedContacts.filter(
      (contact) => contact.id !== removeTarget.id
    );
    setSavedContacts(newValue);
    setLocalStorageValue(ContactsLocalStorageKeys.FAVORITE_CONTACTS, newValue);
  };

  const refreshSavedContacts = () => {
    const savedContacts =
      getLocalStorageValue(ContactsLocalStorageKeys.FAVORITE_CONTACTS) || [];
    setSavedContacts(savedContacts);
  };

  return {
    refreshSavedContacts,
    savedContacts,
    saveContactToFavorite,
    removeSavedContact,
  };
};

export default useManageSavedContacts;
