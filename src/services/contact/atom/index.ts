import { atom } from "jotai";
import { Contact } from "../types";

export const deleteConfirmationModalVisible = atom<boolean>(false);
export const deleteConfirmationModalData = atom<Contact>({
  createdAt: "",
  firstName: "",
  id: 0,
  lastName: "string",
  phones: [],
});

export const createContactModalVisible = atom<boolean>(false);

/**
 * Contact Filter & Pagination Atom
 */

export const searchQueryAtom = atom<string>("");

export type SearchFields = "first_name" | "last_name" | "number";
export const searchFieldAtom = atom<SearchFields>("first_name");
