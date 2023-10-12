import { atom } from "jotai";

export const deleteConfirmationModalVisible = atom<boolean>(false);
export const deleteConfirmationModalData = atom<{
  id: number | null;
  firstName: string;
  lastName: string;
}>({
  id: null,
  firstName: "",
  lastName: "",
});

export const createContactModalVisible = atom<boolean>(false);
