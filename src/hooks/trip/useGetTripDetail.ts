import { useQuery } from "@tanstack/react-query";
import type { ITrip } from "../../types/trip";
import { getTripDetail } from "../../api/trip/tripApi";

export const useGetTripDetail = (tripId: number | string) => {
  return useQuery<ITrip>({
    queryKey: ["trip", tripId],
    queryFn: () => getTripDetail(tripId),
    enabled: !!tripId,
  });
};
