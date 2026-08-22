import { useEffect } from "react";
import { useGetFavoriteSpots } from "./useGetFavoriteSpots";
import { useLikedSpotStore } from "../../stores/useLikedSpotStore";

export const useSyncLikedSpots = () => {
  const { data } = useGetFavoriteSpots();
  const hydrateLikedSpots = useLikedSpotStore(
    (state) => state.hydrateLikedSpots,
  );

  useEffect(() => {
    if (!data) return;
    hydrateLikedSpots(data);
  }, [data, hydrateLikedSpots]);
};
