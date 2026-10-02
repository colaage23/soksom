import { useMutation, useQueryClient } from "@tanstack/react-query";
import { optimizeAiRoute } from "../../api/ai/aiApi";
import type { ITrip } from "../../types/trip";

export const useOptimizeAiRoute = (tripId: number | string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => optimizeAiRoute(tripId),
    onSuccess: (optimizedDetails) => {
      queryClient.setQueryData<ITrip>(["trip", String(tripId)], (prev) => {
        if (!prev) return prev;
        return { ...prev, details: optimizedDetails };
      });
    },
  });
};
