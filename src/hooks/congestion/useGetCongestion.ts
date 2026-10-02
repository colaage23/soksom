import { useQueries } from "@tanstack/react-query";
import type { ICongestionApiRequest } from "../../types/congestion";
import { getCongestion } from "../../api/congestion/congestion";

export const useGetCongestion = (requests: ICongestionApiRequest[]) => {
  return useQueries({
    queries: requests.map((req) => ({
      queryKey: ["congestion", req.areaCd, req.spotName, req.signguCd],
      queryFn: () => getCongestion(req),
      staleTime: 1000 * 60 * 60 * 3,
      gcTime: 1000 * 60 * 60 * 3,
      enabled: !!req.areaCd && !!req.spotName && !!req.signguCd,
    })),
  });
};
