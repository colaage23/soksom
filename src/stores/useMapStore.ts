import { create } from "zustand";

interface IMapStore {
  mode: "explore" | "route";
  setMode: (mode: "explore" | "route") => void;
}

export const useMapStore = create<IMapStore>((set) => ({
  mode: "explore",
  setMode: (mode) => set({ mode: mode }),
}));
