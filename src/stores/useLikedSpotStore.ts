import { create } from "zustand";

interface ISpotLike {
  likedSpotMap: Record<string, string>;
  setLikedSpots: (map: Record<string, string>) => void;
  addLikedSpot: (contentId: string, favoriteId: string) => void;
  removeLikedSpot: (contentId: string) => void;
}

export const useLikedSpotStore = create<ISpotLike>((set) => ({
  likedSpotMap: {},
  setLikedSpots: (map) => set({ likedSpotMap: map }),
  addLikedSpot: (contentId, favoriteId) =>
    set((state) => ({
      likedSpotMap: { ...state.likedSpotMap, [contentId]: favoriteId },
    })),
  removeLikedSpot: (contentId) =>
    set((state) => {
      const next = { ...state.likedSpotMap };
      delete next[contentId];
      return { likedSpotMap: next };
    }),
}));
