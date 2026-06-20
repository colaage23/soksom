import { create } from "zustand";
import type { ISpotResponse } from "../types/spot";

interface ISpotStore {
  selectedSpot: ISpotResponse | null;
  setSelectedSpot: (spot: ISpotResponse | null) => void;

  detailSpot: ISpotResponse | null;
  setDetailSpot: (spot: ISpotResponse | null) => void;
}

export const useSpotStore = create<ISpotStore>((set) => ({
  selectedSpot: null,
  setSelectedSpot: (spot) => set({ selectedSpot: spot }),

  detailSpot: null,
  setDetailSpot: (spot) => set({ detailSpot: spot }),
}));
