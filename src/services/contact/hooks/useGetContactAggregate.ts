import { useQuery } from "@apollo/client";
import { GET_CONTACT_COUNT } from "../queries";

const useGetContactAggregate = () => {
  const res = useQuery(GET_CONTACT_COUNT);

  return {
    ...res,
    count: res?.data?.contact_aggregate?.aggregate?.count ?? 0,
  };
};

export default useGetContactAggregate;
