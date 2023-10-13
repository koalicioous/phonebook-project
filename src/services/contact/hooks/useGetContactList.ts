import { QueryHookOptions, useQuery } from "@apollo/client";
import { GET_CONTACT_LIST } from "../queries";
import { ContactListQueryVariables, RawContact } from "../types";
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
    variables,
    ...options,
  });

  const contacts = useMemo(() => {
    return formatRawContact(res?.data?.contact);
  }, [res]);

  return {
    contacts,
    ...res,
  };
};

export default useGetContactList;
