import { useQuery } from "@tanstack/react-query";
import { getSpotDetail } from "../../api/spot/spotApi";
import type { ISpotDetailRequest } from "../../types/spot";

export const useGetSpotDetail = ({
  contentid,
  contenttypeid,
}: ISpotDetailRequest) => {
  return useQuery({
    queryKey: ["spot-detail", contentid, contenttypeid],
    queryFn: () => getSpotDetail({ contentid, contenttypeid }),
    staleTime: 1000 * 60 * 60 * 3, // 3시간
    gcTime: 1000 * 60 * 60 * 3,
  });
};
