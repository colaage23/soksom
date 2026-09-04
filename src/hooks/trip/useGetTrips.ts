import { useQuery } from "@tanstack/react-query";
import {
  getNextTrips,
  getPreviousTrips,
  getTrips,
} from "../../api/trip/tripApi";
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

export const useGetNextTrips = (params?: ITripListParams) => {
  const accessToken = useAuthStore((state) => state.accessToken);

  return useQuery({
    queryKey: [
      "trips",
      "next",
      params?.spotName ?? "",
      params?.pageNo ?? 1,
      params?.numOfRows ?? 20,
    ],
    queryFn: () => getNextTrips(params),
    enabled: Boolean(accessToken),
    staleTime: 1000 * 60,
    gcTime: 1000 * 60,
  });
};

export const useGetPreviousTrips = (params?: ITripListParams) => {
  const accessToken = useAuthStore((state) => state.accessToken);

  return useQuery({
    queryKey: [
      "trips",
      "previous",
      params?.spotName ?? "",
      params?.pageNo ?? 1,
      params?.numOfRows ?? 20,
    ],
    queryFn: () => getPreviousTrips(params),
    enabled: Boolean(accessToken),
    staleTime: 1000 * 60,
    gcTime: 1000 * 60,
  });
};
