import { create } from "zustand";
import type { Spot } from "../pages/Map/mock";

interface ISpotStore {
  selectedSpot: Spot | null;
  detailSpot: Spot | null;
  setSelectedSpot: (spot: Spot | null) => void;
  setDetailSpot: (spot: Spot | null) => void;
}

export const useSpotStore = create<ISpotStore>((set) => ({
  selectedSpot: null,
  setSelectedSpot: (spot) => set({ selectedSpot: spot }),

  detailSpot: null,
  setDetailSpot: (spot) => set({ detailSpot: spot }),
}));
