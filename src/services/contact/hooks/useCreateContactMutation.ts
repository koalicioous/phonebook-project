import { MutationHookOptions, useMutation } from "@apollo/client";
import { ADD_CONTACT_WITH_PHONES } from "../mutations";
import { GET_CONTACT_LIST } from "../queries";

const useCreateContactMutation = (options?: MutationHookOptions) => {
  const [createContact, { loading, error }] = useMutation(
    ADD_CONTACT_WITH_PHONES,
    {
      refetchQueries: [GET_CONTACT_LIST],
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
