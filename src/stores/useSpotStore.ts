import { create } from "zustand";
import type { ISpotListItem } from "../types/spot";

interface ISpotStore {
  selectedSpot: ISpotListItem | null;
  setSelectedSpot: (spot: ISpotListItem | null) => void;

  detailSpot: ISpotListItem | null;
  setDetailSpot: (spot: ISpotListItem | null) => void;

  searchCenter: { mapX: number; mapY: number } | null;
  setSearchCenter: (center: { mapX: number; mapY: number }) => void;

  visibleSpots: ISpotListItem[];
  setVisibleSpots: (spots: ISpotListItem[]) => void;
}

export const useSpotStore = create<ISpotStore>((set) => ({
  selectedSpot: null,
  setSelectedSpot: (spot) => set({ selectedSpot: spot }),

  detailSpot: null,
  setDetailSpot: (spot) => set({ detailSpot: spot }),

  searchCenter: null,
  setSearchCenter: (center) => set({ searchCenter: center }),

  visibleSpots: [],
  setVisibleSpots: (spots) => set({ visibleSpots: spots }),
}));
