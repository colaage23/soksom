import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  addFavorite,
  removeFavorite,
  toAddFavoritePayload,
} from "../../api/favorite/favoriteApi";
import { useLikedSpotStore } from "../../stores/useLikedSpotStore";
import type { ISpotListItem } from "../../types/spot";

export const useToggleFavorite = () => {
  const queryClient = useQueryClient();
  const { addLikedSpot, removeLikedSpot } = useLikedSpotStore();

  const addMutation = useMutation({
    mutationFn: (spot: ISpotListItem) =>
      addFavorite(toAddFavoritePayload(spot)),
  });

  const removeMutation = useMutation({
    mutationFn: (favoriteId: string) => removeFavorite(favoriteId),
  });

  const toggleFavorite = (spot: ISpotListItem, favoriteId?: string) => {
    if (favoriteId) {
      removeMutation.mutate(favoriteId, {
        onSuccess: () => {
          removeLikedSpot(spot.contentid);
          queryClient.invalidateQueries({ queryKey: ["favorite-spots"] });
        },
      });
    } else {
      addMutation.mutate(spot, {
        onSuccess: (newFavoriteId) => {
          addLikedSpot(spot, newFavoriteId);
          queryClient.invalidateQueries({ queryKey: ["favorite-spots"] });
        },
      });
    }
  };

  return {
    toggleFavorite,
    isPending: addMutation.isPending || removeMutation.isPending,
  };
};
