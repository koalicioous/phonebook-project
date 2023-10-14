import { MutationHookOptions, useMutation } from "@apollo/client";
import { EDIT_PHONE_NUMBER } from "../mutations";

const useUpdatePhoneNumber = (options?: MutationHookOptions) => {
  return useMutation(EDIT_PHONE_NUMBER, {
    ...options,
  });
};

export default useUpdatePhoneNumber;
