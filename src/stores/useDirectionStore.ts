import { create } from "zustand";
import type { IDirectionsApiResponse } from "../api/kakao/directionsApi";

interface IDirection {
  directions: IDirectionsApiResponse | null;
  setDirections: (directions: IDirectionsApiResponse) => void;
}

export const useDirectionStore = create<IDirection>((set) => ({
  directions: null,
  setDirections: (directions: IDirectionsApiResponse) => set({ directions }),
}));
