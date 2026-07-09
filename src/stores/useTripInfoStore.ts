import { create } from "zustand";

interface DateRange {
  startDate: Date | null;
  endDate: Date | null;
}

interface TripInfoStore {
  dateRange: DateRange;
  setDateRange: (range: DateRange) => void;

  reset: () => void;
}

export const useTripInfoStore = create<TripInfoStore>((set) => ({
  dateRange: { startDate: null, endDate: null },
  setDateRange: (range) => set({ dateRange: range }),

  reset: () =>
    set({
      dateRange: { startDate: null, endDate: null },
    }),
}));
