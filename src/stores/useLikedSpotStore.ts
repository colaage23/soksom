import { create } from "zustand";

interface ISpotLike {
  likedSpot: number[];
  toggleLikedSpot: (id: number) => void;
}

export const useLikedSpotStore = create<ISpotLike>((set) => ({
  likedSpot: [],
  toggleLikedSpot: (id) =>
    set((state) => ({
      likedSpot: state.likedSpot.includes(id)
        ? state.likedSpot.filter((i) => i !== id)
        : [...state.likedSpot, id],
    })),
}));
