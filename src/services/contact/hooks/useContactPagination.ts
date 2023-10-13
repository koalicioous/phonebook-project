import { useAtom } from "jotai";
import { hasNextPageAtom, totalContactDataAtom } from "../atom";

const useContactPagination = (limit: number = 0) => {
  const [totalData, setTotalData] = useAtom(totalContactDataAtom);
  const [hasNextPage, setHasNextPage] = useAtom(hasNextPageAtom);

  const nextPageAvailable = totalData !== 0 && hasNextPage;
  const updateTotalData = (newLength: number) => {
    if (newLength === totalData || newLength % limit !== 0) {
      setHasNextPage(false);
    } else {
      setHasNextPage(true);
    }
    setTotalData(newLength);
  };

  return {
    totalData,
    nextPageAvailable,
    updateTotalData,
  };
};

export default useContactPagination;
