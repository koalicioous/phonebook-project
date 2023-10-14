import { MutationHookOptions, useMutation } from "@apollo/client";
import { ADD_NUMBER_TO_CONTACT } from "../mutations";

const useAddPhoneToContactMutation = (options?: MutationHookOptions) => {
  return useMutation(ADD_NUMBER_TO_CONTACT, {
    ...options,
  });
};

export default useAddPhoneToContactMutation;
