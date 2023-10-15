import { LocalStorageModel } from "@/services/common/LocalStorage/model";
import {
  AddContactPayload,
  Contact,
  ContactInput,
} from "@/services/contact/types";
import LocalStorageService from "@/services/common/LocalStorage";
import { ContactsLocalStorageKeys } from "@/services/contact/types/enums";

export const checkSpecialCharacter = (value: string) => {
  // eslint-disable-next-line no-useless-escape
  const invalidCharacters = /^[^~!@#$%^&*()_+|{}“:?><[\]\\;’,.\/=-]+$/;
  return invalidCharacters.test(value);
};

export const checkValidNumber = (value: string) => {
  return /^\+?\d+$/.test(value);
};

export const debounce = (func: Function, wait: number) => {
  let timeout: any;
  return (...args: any) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

export const formatAddContactPayload = (
  data: ContactInput
): AddContactPayload => {
  return {
    first_name: data.firstName,
    last_name: data.lastName,
    phones: data.numbers.map((number) => ({
      number: number.value,
    })),
  };
};

export const contactIsSaved = (id: number): boolean => {
  const savedContacts =
    getLocalStorageValue(ContactsLocalStorageKeys.FAVORITE_CONTACTS) || [];
  return savedContacts.some((contact) => contact.id === id);
};

export const updateSavedContact = (id: number, data: Contact): void => {
  const savedContacts =
    getLocalStorageValue(ContactsLocalStorageKeys.FAVORITE_CONTACTS) || [];
  const index = savedContacts.findIndex((contact) => contact.id === id);
  savedContacts[index] = data;
  setLocalStorageValue(
    ContactsLocalStorageKeys.FAVORITE_CONTACTS,
    savedContacts
  );
};

/**
 * Local Storage API
 */

export const getLocalStorageValue = <
  T = LocalStorageModel,
  K extends keyof T = keyof T
>(
  key: K
): T[K] | null => {
  const localStorageService = new LocalStorageService<T>();
  return localStorageService.get(key);
};

export const setLocalStorageValue = <
  T = LocalStorageModel,
  K extends keyof T = keyof T
>(
  key: K,
  value: T[K]
) => {
  const localStorageService = new LocalStorageService<T>();
  return localStorageService.set(key, value);
};

export const removeLocalStorageValue = <
  T = LocalStorageModel,
  K extends keyof T = keyof T
>(
  key: K
) => {
  const localStorageService = new LocalStorageService<T>();
  return localStorageService.remove(key);
};
