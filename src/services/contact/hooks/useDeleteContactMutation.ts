import { MutationHookOptions, useMutation } from "@apollo/client";
import { DELETE_CONTACT } from "../mutations";
import { GET_CONTACT_LIST } from "../queries";

const useDeleteContactMutation = (options?: MutationHookOptions) => {
  const [deleteContact, { loading, error }] = useMutation(DELETE_CONTACT, {
    refetchQueries: [GET_CONTACT_LIST],
    ...options,
  });

  return {
    deleteContact,
    loading,
    error,
  };
};

export default useDeleteContactMutation;
