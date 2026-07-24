import { create } from "zustand";
import type { ISearchSpotResponse } from "../types/spot";

interface ISpotStore {
  selectedSpot: ISearchSpotResponse | null;
  setSelectedSpot: (spot: ISearchSpotResponse | null) => void;

  detailSpot: ISearchSpotResponse | null;
  setDetailSpot: (spot: ISearchSpotResponse | null) => void;

  searchCenter: { mapX: number; mapY: number } | null;
  setSearchCenter: (center: { mapX: number; mapY: number }) => void;
}

export const useSpotStore = create<ISpotStore>((set) => ({
  selectedSpot: null,
  setSelectedSpot: (spot) => set({ selectedSpot: spot }),

  detailSpot: null,
  setDetailSpot: (spot) => set({ detailSpot: spot }),

  searchCenter: null,
  setSearchCenter: (center) => set({ searchCenter: center }),
}));
