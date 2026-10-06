import { useQuery } from "@tanstack/react-query";
import { getAlternativeSpots } from "../../api/spot/alternative";

interface Params {
  keyword: string;
  contentId: string;
  areaCd: string;
  signguCd: string;
  enabled: boolean;
  baseYm: string;
}

export const useAlternativeSpots = ({
  keyword,
  contentId,
  areaCd,
  signguCd,
  enabled,
  baseYm,
}: Params) => {
  return useQuery({
    queryKey: ["alternative", contentId, baseYm],
    queryFn: () =>
      getAlternativeSpots({
        keyword,
        contentId,
        areaCd,
        signguCd,
        pageNo: 1,
        baseYm,
      }),
    enabled: enabled && Boolean(contentId) && Boolean(keyword),
  });
};
