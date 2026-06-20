import { useQuery } from "@tanstack/react-query";
import { getSpotsByKeyword } from "../../api/spot/spotApi";
import type { ISpotRequest } from "../../types/spot";

export const useGetSpotsByKeyword = ({ keyword, pageNo }: ISpotRequest) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["spot-keyword", keyword, pageNo],
    queryFn: () => getSpotsByKeyword({ pageNo, keyword }),
  });
  return { data, isLoading, isError };
};
