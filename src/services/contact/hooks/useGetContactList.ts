import { useQuery } from "@apollo/client";
import { GET_CONTACT_LIST } from "../queries";
import { ContactListQueryVariables, RawContact } from "../types";
import { formatRawContact } from "@/utils/formatter";

type UseGetContactListProps = {
  variables?: ContactListQueryVariables;
};

const useGetContactList = ({ variables = {} }: UseGetContactListProps = {}) => {
  const res = useQuery<
    {
      contact: RawContact[];
    },
    ContactListQueryVariables
  >(GET_CONTACT_LIST, {
    variables,
  });

  return {
    contacts: formatRawContact(res?.data?.contact),
    ...res,
  };
};

export default useGetContactList;
