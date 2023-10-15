/* eslint-disable no-undef */
import {
  formatRawContact,
  formatRawContactDetail,
  contactToRawFormat,
} from "../";
import { RawContact, Contact } from "@/services/contact/types";

describe("Contact Formatting Functions", () => {
  const rawContacts: RawContact[] = [
    {
      __typename: "contact",
      created_at: "2023-01-01T00:00:00Z",
      first_name: "John",
      id: 1,
      last_name: "Doe",
      phones: [
        {
          __typename: "number",
          id: 101,
          number: "123456789",
        },
      ],
    },
  ];

  const formattedContacts: Contact[] = [
    {
      createdAt: "2023-01-01T00:00:00Z",
      firstName: "John",
      id: 1,
      lastName: "Doe",
      phones: [
        {
          id: 101,
          number: "123456789",
        },
      ],
    },
  ];

  it("formats raw contacts correctly", () => {
    const result = formatRawContact(rawContacts);
    expect(result).toEqual(formattedContacts);
  });

  it("formats a raw contact detail correctly", () => {
    const result = formatRawContactDetail(rawContacts[0]);
    expect(result).toEqual(formattedContacts[0]);
  });

  it("converts contact to raw format correctly", () => {
    const result = contactToRawFormat(formattedContacts[0]);
    expect(result).toEqual(rawContacts[0]);
  });
});
