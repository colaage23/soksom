import { useQueries } from "@tanstack/react-query";
import { getSpotDetail } from "../../api/spot/spotApi";
import type { ISpotDetailRequest } from "../../types/spot";

export const useGetSpotsDetail = (requests: ISpotDetailRequest[]) => {
  return useQueries({
    queries: requests.map((req) => ({
      queryKey: [
        "spot-detail",
        req.contentid,
        req.contenttypeid,
        req.spotName,
        req.areaCd,
        req.signguCd,
        req.baseYmd,
      ],
      queryFn: () => getSpotDetail(req),
      staleTime: 1000 * 60 * 60 * 3,
      gcTime: 1000 * 60 * 60 * 3,
      enabled: !!req.contentid,
    })),
  });
};
