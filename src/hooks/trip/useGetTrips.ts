import { useQuery } from "@tanstack/react-query";
import { getTrips } from "../../api/trip/tripApi";
import { useAuthStore } from "../../stores/auth/authStore";
import type { ITripListParams } from "../../types/trip";

export const useGetTrips = (params?: ITripListParams) => {
  const accessToken = useAuthStore((state) => state.accessToken);

  return useQuery({
    queryKey: [
      "trips",
      params?.spotName ?? "",
      params?.pageNo ?? 1,
      params?.numOfRows ?? 20,
    ],
    queryFn: () => getTrips(params),
    enabled: Boolean(accessToken),
    staleTime: 1000 * 60,
    gcTime: 1000 * 60,
  });
};
