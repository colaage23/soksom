import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateTrip } from "../../api/trip/tripApi";

export const useUpdateTrip = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateTrip,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["trips"] });
      queryClient.invalidateQueries({ queryKey: ["trip", variables.tripId] });
    },
  });
};
