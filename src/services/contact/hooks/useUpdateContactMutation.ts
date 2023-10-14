import { MutationHookOptions, useMutation } from "@apollo/client";
import { EDIT_CONTACT } from "../mutations";

const useUpdateContactMutation = (options?: MutationHookOptions) => {
  return useMutation(EDIT_CONTACT, {
    ...options,
  });
};

export default useUpdateContactMutation;
