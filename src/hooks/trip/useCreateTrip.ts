import { useMutation } from "@tanstack/react-query";
import { createTrip } from "../../api/trip/tripApi";

export const useCreateTrip = () => {
  return useMutation({
    mutationFn: createTrip,
  });
};
