import { useMutation } from "@tanstack/react-query";

import {
  getKakaoCategorySearch,
  type IKakaoCategorySearch,
} from "../api/kakao/categorySearchApi";

export const useNearestParking = () => {
  const {
    mutateAsync: fetchNearestParking,
    isError,
    isPending,
    isSuccess,
    data,
  } = useMutation({
    mutationFn: ({ x, y }: IKakaoCategorySearch) =>
      getKakaoCategorySearch({ x, y }),
  });

  return { fetchNearestParking, isError, isPending, isSuccess, data };
};
