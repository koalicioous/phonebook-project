import { QueryHookOptions, useQuery } from "@apollo/client";
import { GET_CONTACT_DETAIL } from "../queries";
import { useMemo } from "react";
import { formatRawContactDetail } from "@/utils/formatter";

const useGetContactById = (options?: QueryHookOptions) => {
  const res = useQuery(GET_CONTACT_DETAIL, {
    ...options,
  });

  const contact = useMemo(() => {
    return formatRawContactDetail(res.data?.contact_by_pk);
  }, [res.data?.contact_by_pk]);

  return {
    contact,
    ...res,
  };
};

export default useGetContactById;
