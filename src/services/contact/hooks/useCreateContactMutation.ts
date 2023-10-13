import { MutationHookOptions, useMutation } from "@apollo/client";
import { ADD_CONTACT_WITH_PHONES } from "../mutations";
import { GET_CONTACT_LIST } from "../queries";
import useContactPagination from "./useContactPagination";
import { CONTACT_LIST_QUERY_LIMIT } from "@/utils/contants";

const useCreateContactMutation = (options?: MutationHookOptions) => {
  const { totalData } = useContactPagination();
  const [createContact, { loading, error }] = useMutation(
    ADD_CONTACT_WITH_PHONES,
    {
      refetchQueries: [
        {
          query: GET_CONTACT_LIST,
          variables: {
            limit: totalData + 1,
            offset: 0,
            order_by: [
              {
                created_at: "desc",
              },
            ],
          },
        },
      ],
      ...options,
    }
  );

  return {
    createContact,
    loading,
    error,
  };
};

export default useCreateContactMutation;
