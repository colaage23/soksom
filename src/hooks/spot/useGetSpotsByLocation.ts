import { useInfiniteQuery } from "@tanstack/react-query";
import type { ISearchByLocationRequest } from "../../types/spot";
import { getSpotsByLocation } from "../../api/spot/spotApi";

export const useGetSpotsByLocation = ({
  mapX,
  mapY,
  radius,
  baseYmd,
}: Omit<ISearchByLocationRequest, "pageNo">) => {
  return useInfiniteQuery({
    queryKey: ["spot-location", mapX, mapY, radius, baseYmd],
    queryFn: ({ pageParam }) =>
      getSpotsByLocation({ pageNo: pageParam, mapX, mapY, radius, baseYmd }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      const hasValidSpot = lastPage.some((item) => item !== null);
      if (!hasValidSpot) return undefined;
      return allPages.length + 1;
    },
    staleTime: 1000 * 60 * 60 * 3, // 3시간
    gcTime: 1000 * 60 * 60 * 3,
  });
};
