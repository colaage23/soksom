import { create } from "zustand";
import type { IDirectionsApiResponse } from "../api/kakao/directionsApi";

interface IDirection {
  directions: IDirectionsApiResponse | null;
  setDirections: (directions: IDirectionsApiResponse | null) => void;
}

export const useDirectionStore = create<IDirection>((set) => ({
  directions: null,
  setDirections: (directions: IDirectionsApiResponse | null) =>
    set({ directions }),
}));
