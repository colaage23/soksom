import { useQuery } from "@tanstack/react-query";
import { getHotPlaces } from "../../api/hotPlace/hotPlaceApi";

export const useGetHotPlaces = (baseYm: string) => {
  return useQuery({
    queryKey: ["hot-places", baseYm],
    queryFn: () => getHotPlaces(baseYm),
    staleTime: 1000 * 60 * 60 * 3,
    gcTime: 1000 * 60 * 60 * 3,
  });
};
