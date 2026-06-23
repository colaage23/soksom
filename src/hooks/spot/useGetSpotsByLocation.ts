import { useInfiniteQuery } from "@tanstack/react-query";
import type { ISearchByLocationRequest } from "../../types/spot";
import { getSpotsByLocation } from "../../api/spot/spotApi";

export const useGetSpotsByLocation = ({
  mapX,
  mapY,
  radius,
}: Omit<ISearchByLocationRequest, "pageNo">) => {
  return useInfiniteQuery({
    queryKey: ["spot-location", mapX, mapY, radius],
    queryFn: ({ pageParam }) =>
      getSpotsByLocation({ pageNo: pageParam, mapX, mapY, radius }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length === 0) return undefined;
      return allPages.length + 1;
    },
    staleTime: 1000 * 60 * 60 * 3, // 3시간
  });
};
