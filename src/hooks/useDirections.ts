import { useMutation } from "@tanstack/react-query";
import {
  getDirections,
  type IDirectionsApiRequest,
} from "../api/kakao/directionsApi";

export const useDirection = () => {
  const {
    mutateAsync: fetchDirection,
    isError,
    isPending,
    isSuccess,
    data,
  } = useMutation({
    mutationFn: (request: IDirectionsApiRequest) => getDirections(request),
  });

  return { fetchDirection, isError, isPending, isSuccess, data };
};
