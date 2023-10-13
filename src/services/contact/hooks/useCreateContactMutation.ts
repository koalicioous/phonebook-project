import { MutationHookOptions, useMutation } from "@apollo/client";
import { ADD_CONTACT_WITH_PHONES } from "../mutations";
import { GET_CONTACT_LIST } from "../queries";
import useGetContactAggregate from "./useGetContactAggregate";

const useCreateContactMutation = (options?: MutationHookOptions) => {
  const { count: totalData } = useGetContactAggregate();
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
