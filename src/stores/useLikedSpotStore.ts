import { create } from "zustand";
import type { ISpotListItem } from "../types/spot";

interface ISpotLike {
  likedSpotMap: Record<string, ISpotListItem>;
  toggleLikedSpot: (spot: ISpotListItem) => void;
  hydrateLikedSpots: (spots: ISpotListItem[]) => void;
}

export const useLikedSpotStore = create<ISpotLike>((set) => ({
  likedSpotMap: {},

  toggleLikedSpot: (spot) =>
    set((state) => {
      const next = { ...state.likedSpotMap };
      if (next[spot.contentid]) {
        delete next[spot.contentid];
      } else {
        next[spot.contentid] = spot;
      }
      return { likedSpotMap: next };
    }),

  // 서버 즐겨찾기 목록으로 로컬 상태를 통째로 교체(초기 동기화용)
  hydrateLikedSpots: (spots) =>
    set(() => ({
      likedSpotMap: spots.reduce<Record<string, ISpotListItem>>((acc, spot) => {
        acc[spot.contentid] = spot;
        return acc;
      }, {}),
    })),
}));
