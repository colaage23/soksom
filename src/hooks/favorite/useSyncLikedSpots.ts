import { useEffect } from "react";
import { useGetFavoriteSpots } from "./useGetFavoriteSpots";
import { useLikedSpotStore } from "../../stores/useLikedSpotStore";

export const useSyncLikedSpots = () => {
  const { data } = useGetFavoriteSpots();
  const setLikedSpots = useLikedSpotStore((state) => state.setLikedSpots);

  useEffect(() => {
    if (!data) return;

    const map = data.reduce<Record<string, string>>((acc, spot) => {
      if (spot.favoriteId) {
        acc[spot.contentid] = spot.favoriteId;
      }
      return acc;
    }, {});

    setLikedSpots(map);
  }, [data, setLikedSpots]);
};
