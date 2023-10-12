import { AddContactPayload, ContactInput } from "@/services/contact/types";

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
