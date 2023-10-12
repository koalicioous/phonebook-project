import { ContactsLocalStorageKeys } from "@/services/contact/types/enums";
import { Contact } from "@/services/contact/types";

export interface LocalStorageModel {
  [ContactsLocalStorageKeys.FAVORITE_CONTACTS]: Contact[];
}
