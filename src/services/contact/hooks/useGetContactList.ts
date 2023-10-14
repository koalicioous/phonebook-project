import { QueryHookOptions, useQuery } from "@apollo/client";
import { GET_CONTACT_LIST } from "../queries";
import { Contact, ContactListQueryVariables, RawContact } from "../types";
import { formatRawContact } from "@/utils/formatter";
import { useMemo } from "react";

type UseGetContactListProps = {
  variables?: ContactListQueryVariables;
  options?: QueryHookOptions;
};

const useGetContactList = ({
  variables = {},
  options = {},
}: UseGetContactListProps = {}) => {
  const res = useQuery<
    {
      contact: RawContact[];
    },
    ContactListQueryVariables
  >(GET_CONTACT_LIST, {
    skip: Object.keys(variables).length === 0,
    variables,
    ...options,
  });

  const contacts: Contact[] = useMemo(() => {
    return formatRawContact(res?.data?.contact);
  }, [res]);

  return {
    contacts,
    ...res,
  };
};

export default useGetContactList;
