import { create } from "zustand";
import type { ISpotListItem } from "../types/spot";

interface ISpotLike {
  likedSpotMap: Record<string, ISpotListItem>;
  addLikedSpot: (spot: ISpotListItem, favoriteId: string) => void;
  removeLikedSpot: (contentId: string) => void;
  hydrateLikedSpots: (spots: ISpotListItem[]) => void;
}

export const useLikedSpotStore = create<ISpotLike>((set) => ({
  likedSpotMap: {},

  addLikedSpot: (spot, favoriteId) =>
    set((state) => ({
      likedSpotMap: {
        ...state.likedSpotMap,
        [spot.contentid]: { ...spot, favoriteId },
      },
    })),

  removeLikedSpot: (contentId) =>
    set((state) => {
      const next = { ...state.likedSpotMap };
      delete next[contentId];
      return { likedSpotMap: next };
    }),

  hydrateLikedSpots: (spots) =>
    set(() => ({
      likedSpotMap: spots.reduce<Record<string, ISpotListItem>>((acc, spot) => {
        acc[spot.contentid] = spot;
        return acc;
      }, {}),
    })),
}));
