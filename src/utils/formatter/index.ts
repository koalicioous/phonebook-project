import { Contact, RawContact } from "@/services/contact/types";

export const formatRawContact = (rawContacts?: RawContact[]): Contact[] => {
  if (!rawContacts) {
    return [];
  }
  return rawContacts.map((rawContact) => {
    return {
      createdAt: rawContact.created_at,
      firstName: rawContact.first_name,
      id: rawContact.id,
      lastName: rawContact.last_name,
      phones: rawContact.phones.map((rawPhone) => {
        return {
          id: rawPhone.id,
          number: rawPhone.number,
        };
      }),
    };
  });
};

export const formatRawContactDetail = (rawContact?: RawContact): Contact => {
  if (!rawContact) {
    return {
      createdAt: "",
      firstName: "",
      id: 0,
      lastName: "",
      phones: [],
    };
  }
  return {
    createdAt: rawContact.created_at,
    firstName: rawContact.first_name,
    id: rawContact.id,
    lastName: rawContact.last_name,
    phones: rawContact.phones.map((rawPhone) => {
      return {
        id: rawPhone.id,
        number: rawPhone.number,
      };
    }),
  };
};

export const contactToRawFormat = (contact: Contact): RawContact => {
  return {
    __typename: "contact",
    created_at: contact.createdAt,
    first_name: contact.firstName,
    id: contact.id,
    last_name: contact.lastName,
    phones: contact.phones.map((phone) => {
      return {
        __typename: "number",
        id: phone.id ?? 0,
        number: phone.number,
      };
    }),
  };
};
