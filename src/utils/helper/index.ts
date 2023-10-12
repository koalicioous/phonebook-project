import { LocalStorageModel } from "@/services/common/LocalStorage/model";
import { AddContactPayload, ContactInput } from "@/services/contact/types";
import LocalStorageService from "@/services/common/LocalStorage";

export const checkSpecialCharacter = (value: string) => {
  const invalidCharacters = /^[^~!@#$%^&*()_+|{}“:?><[\]\\;’,.\/=-]+$/;
  return invalidCharacters.test(value);
};

export const checkValidNumber = (value: string) => {
  return /^\+?\d+$/.test(value);
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
