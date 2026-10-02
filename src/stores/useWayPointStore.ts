import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { ISpotListItem } from "../types/spot";
import type { ITrip } from "../types/trip";
import { tripToWayPoint } from "../utils/tripToWayPoint";

export const MAX_DAY_COUNT = 7;

// 아직 일차 미배정 = 보관함
export const POOL_DAY = -1;

interface DateRange {
  startDate: Date | null;
  endDate: Date | null;
}

interface IEditingTrip {
  tripId: number;
  tripName: string;
  isAiRoute: string;
  shareCode: string;
}

interface IWayPoint {
  pool: ISpotListItem[];
  wayPoint: ISpotListItem[][];
  dayCount: number;
  expandedDay: number | null;
  dateRange: DateRange;
  editingTrip: IEditingTrip | null;

  setDayCount: (count: number) => void;
  setExpandedDay: (day: number) => void;
  setDateRange: (range: DateRange) => void;

  // 관광지 추가/제거는 특정 일차가 아니라 보관함 기준.
  toggleWayPoint: (spot: ISpotListItem) => void;

  removeItem: (dayIndex: number, contentId: string) => void;

  moveItem: (
    fromDay: number,
    fromIndex: number,
    toDay: number,
    toIndex: number,
  ) => void;

  isSelected: (spot: ISpotListItem) => boolean;

  loadTripForEdit: (trip: ITrip) => void;
  resetWayPoint: () => void;
}

export const useWayPointStore = create<IWayPoint>()(
  persist(
    (set, get) => ({
      pool: [],
      wayPoint: [[]],
      dayCount: 1,
      expandedDay: null,
      dateRange: { startDate: null, endDate: null },
      editingTrip: null,

      setDayCount: (count) =>
        set((state) => {
          const clamped = Math.min(MAX_DAY_COUNT, Math.max(1, count));
          const wayPoint = [...state.wayPoint];

          if (clamped > wayPoint.length) {
            while (wayPoint.length < clamped) wayPoint.push([]);

            return {
              dayCount: clamped,
              wayPoint,
            };
          }

          if (clamped < wayPoint.length) {
            const returnedSpots = wayPoint.slice(clamped).flat();
            wayPoint.length = clamped;

            return {
              dayCount: clamped,
              wayPoint,
              pool: [...state.pool, ...returnedSpots],
              expandedDay:
                state.expandedDay !== null
                  ? Math.min(state.expandedDay, clamped - 1)
                  : null,
            };
          }

          return { dayCount: clamped };
        }),

      setExpandedDay: (day) =>
        set((state) => ({
          expandedDay: state.expandedDay === day ? null : day,
        })),

      setDateRange: (range) => set({ dateRange: range }),

      toggleWayPoint: (spot) =>
        set((state) => {
          // 보관함에 이미 있으면 제거.
          if (state.pool.some((i) => i.contentid === spot.contentid)) {
            return {
              pool: state.pool.filter((i) => i.contentid !== spot.contentid),
            };
          }

          // 어떤 일차에 이미 들어있으면 그 일차에서 제거.
          const dayIdx = state.wayPoint.findIndex((daySpots) =>
            daySpots.some((i) => i.contentid === spot.contentid),
          );
          if (dayIdx !== -1) {
            const wayPoint = state.wayPoint.map((daySpots, idx) =>
              idx === dayIdx
                ? daySpots.filter((i) => i.contentid !== spot.contentid)
                : daySpots,
            );
            return { wayPoint };
          }

          // 둘 다 아니면 보관함에 새로 추가.
          return { pool: [...state.pool, spot] };
        }),

      removeItem: (dayIndex, contentId) =>
        set((state) => {
          if (dayIndex === POOL_DAY) {
            return {
              pool: state.pool.filter((i) => i.contentid !== contentId),
            };
          }

          const wayPoint = state.wayPoint.map((daySpots, idx) =>
            idx === dayIndex
              ? daySpots.filter((i) => i.contentid !== contentId)
              : daySpots,
          );
          return { wayPoint };
        }),

      moveItem: (fromDay, fromIndex, toDay, toIndex) =>
        set((state) => {
          const pool = [...state.pool];
          const wayPoint = state.wayPoint.map((daySpots) => [...daySpots]);

          const fromList = fromDay === POOL_DAY ? pool : wayPoint[fromDay];
          if (!fromList) return {};

          const [item] = fromList.splice(fromIndex, 1);
          if (!item) return { pool, wayPoint };

          const toList = toDay === POOL_DAY ? pool : wayPoint[toDay];
          if (!toList) return { pool, wayPoint };

          toList.splice(toIndex, 0, item);

          return { pool, wayPoint };
        }),

      isSelected: (spot) => {
        const state = get();
        return (
          state.pool.some((i) => i.contentid === spot.contentid) ||
          state.wayPoint.some((daySpots) =>
            daySpots.some((i) => i.contentid === spot.contentid),
          )
        );
      },

      resetWayPoint: () =>
        set({
          pool: [],
          wayPoint: [[]],
          dayCount: 1,
          expandedDay: null,
          dateRange: { startDate: null, endDate: null },
          editingTrip: null,
        }),

      loadTripForEdit: (trip) => {
        const { pool, wayPoint, dayCount, dateRange } = tripToWayPoint(trip);

        set({
          pool,
          wayPoint,
          dayCount,
          dateRange,
          expandedDay: null,
          editingTrip: {
            tripId: trip.tripId,
            tripName: trip.tripName,
            isAiRoute: trip.isAiRoute,
            shareCode: trip.shareCode,
          },
        });
      },
    }),
    {
      name: "wayPoint-storage",
      storage: createJSONStorage(() => localStorage),
      // pool, wayPoint, dayCount, dateRange를 localStorage에 저장.
      partialize: (state) => ({
        pool: state.pool,
        wayPoint: state.wayPoint,
        dayCount: state.dayCount,
        dateRange: state.dateRange,
      }),
      onRehydrateStorage: () => (state) => {
        if (state?.dateRange) {
          state.dateRange = {
            startDate: state.dateRange.startDate
              ? new Date(state.dateRange.startDate)
              : null,
            endDate: state.dateRange.endDate
              ? new Date(state.dateRange.endDate)
              : null,
          };
        }
      },
    },
  ),
);
