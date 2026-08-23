import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  addFavorite,
  removeFavorite,
  toAddFavoritePayload,
  type IAddFavoritePayload,
} from "../../api/favorite/favoriteApi";
import { useLikedSpotStore } from "../../stores/useLikedSpotStore";

export const useToggleFavorite = () => {
  const queryClient = useQueryClient();
  const { addLikedSpot, removeLikedSpot } = useLikedSpotStore();

  const addMutation = useMutation({
    mutationFn: (payload: IAddFavoritePayload) => addFavorite(payload),
    onSuccess: (favoriteId, payload) => {
      addLikedSpot(payload.contentId, favoriteId);
      queryClient.invalidateQueries({ queryKey: ["favorite-spots"] });
    },
  });

  const removeMutation = useMutation({
    mutationFn: (params: { favoriteId: string; contentId: string }) =>
      removeFavorite(params.favoriteId),
    onSuccess: (_data, params) => {
      removeLikedSpot(params.contentId);
      queryClient.invalidateQueries({ queryKey: ["favorite-spots"] });
    },
  });

  const toggleFavorite = (
    spot: Parameters<typeof toAddFavoritePayload>[0],
    favoriteId?: string,
  ) => {
    if (favoriteId) {
      removeMutation.mutate({ favoriteId, contentId: spot.contentid });
    } else {
      addMutation.mutate(toAddFavoritePayload(spot));
    }
  };

  return {
    toggleFavorite,
    isPending: addMutation.isPending || removeMutation.isPending,
  };
};
