import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteTrip } from "../../api/trip/tripApi";

export const useDeleteTrip = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteTrip,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["trips"] });
    },
  });
};
