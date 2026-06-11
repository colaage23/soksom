import { create } from "zustand";
import type { Spot } from "../pages/Map/mock";

interface IWayPoint {
  wayPoint: Spot[];
  toggleWayPoint: (spot: Spot) => void;

  moveItem: (from: number, to: number) => void;
}

export const useWayPointStore = create<IWayPoint>((set) => ({
  wayPoint: [],
  toggleWayPoint: (spot) =>
    set((state) => {
      return {
        wayPoint: state.wayPoint.includes(spot)
          ? state.wayPoint.filter((i) => i.id !== spot.id)
          : [...state.wayPoint, spot],
      };
    }),

  moveItem: (from, to) =>
    set((state) => {
      const arr = [...state.wayPoint];

      const [item] = arr.splice(from, 1);
      arr.splice(to, 0, item);
      return { wayPoint: arr };
    }),
}));
