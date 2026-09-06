import { useInfiniteQuery } from "@tanstack/react-query";
import { getSpotsByKeyword } from "../../api/spot/spotApi";
import type { ISearchByKeywordRequest } from "../../types/spot";

export const useGetSpotsByKeyword = ({
  keyword,
  baseYmd,
}: Omit<ISearchByKeywordRequest, "pageNo">) => {
  return useInfiniteQuery({
    queryKey: ["spot-keyword", keyword, baseYmd],
    queryFn: ({ pageParam }) =>
      getSpotsByKeyword({ pageNo: pageParam, keyword, baseYmd }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length === 0) return undefined;
      return allPages.length + 1;
    },
    staleTime: 1000 * 60 * 60 * 3, // 3시간
    gcTime: 1000 * 60 * 60 * 3,
  });
};
