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
          number: rawPhone.number,
        };
      }),
    };
  });
};
