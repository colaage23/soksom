import { useQuery } from "@tanstack/react-query";
import { getSpotDetail } from "../../api/spot/spotApi";
import type { ISpotDetailRequest } from "../../types/spot";

export const useGetSpotDetail = ({
  contentid,
  contenttypeid,
  areaCd,
  signguCd,
  baseYmd,
}: ISpotDetailRequest) => {
  return useQuery({
    queryKey: [
      "spot-detail",
      contentid,
      contenttypeid,
      areaCd,
      signguCd,
      baseYmd,
    ],
    queryFn: () =>
      getSpotDetail({
        contentid,
        contenttypeid,
        areaCd,
        signguCd,
        baseYmd,
      }),
    staleTime: 1000 * 60 * 60 * 3, // 3시간
    gcTime: 1000 * 60 * 60 * 3,
  });
};
