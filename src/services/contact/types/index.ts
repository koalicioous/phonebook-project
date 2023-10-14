import { FixMeLater } from "@/services/common/types";

export type RawContact = {
  __typename: string;
  created_at: string;
  first_name: string;
  id: number;
  last_name: string;
  phones: RawPhone[];
};

export type Contact = {
  createdAt: string;
  firstName: string;
  id: number;
  lastName: string;
  phones: Phone[];
};

export type RawPhone = {
  __typename: string;
  id: number;
  number: string;
};

export type Phone = {
  id?: number;
  number: string;
};

type ContactSelectColumn =
  | "created_at"
  | "first_name"
  | "id"
  | "last_name"
  | "updated_at";

export type ContactInput = {
  firstName: string;
  lastName: string;
  numbers: { value: string }[];
};

export type AddContactPayload = {
  first_name: string;
  last_name: string;
  phones: {
    number: string;
  }[];
};

export type ContactListQueryVariables = {
  distinct_on?: ContactSelectColumn[];
  limit?: number;
  offset?: number;
  // Contact Order By
  order_by?: FixMeLater[];
  // Contact Bool Exp
  where?: FixMeLater;
};
