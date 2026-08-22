import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { ISpotListItem } from "../types/spot";

export const MAX_DAY_COUNT = 7;

// wayPoint 배열의 day 인덱스로 함께 쓰이는 특수값: "아직 일차 미배정 = 보관함"
export const POOL_DAY = -1;

interface DateRange {
  startDate: Date | null;
  endDate: Date | null;
}

interface IWayPoint {
  pool: ISpotListItem[]; // 일차 미배정 관광지 보관함
  wayPoint: ISpotListItem[][]; // wayPoint[dayIndex] = 해당 일차의 관광지 목록
  dayCount: number; // 1 ~ MAX_DAY_COUNT
  expandedDay: number | null; // 현재 펼쳐진(아코디언) 일차. null = 전부 접힘
  dateRange: DateRange; // 여행 시작/종료 날짜

  setDayCount: (count: number) => void;
  setExpandedDay: (day: number) => void; // 같은 일차를 다시 누르면 접힘(토글)
  setDateRange: (range: DateRange) => void;

  // 관광지 추가/제거는 특정 일차가 아니라 보관함(pool) 기준으로 토글
  toggleWayPoint: (spot: ISpotListItem) => void;
  // dayIndex: POOL_DAY(-1) = 보관함, 0 이상 = 해당 일차
  removeItem: (dayIndex: number, contentId: string) => void;
  // fromDay/toDay 모두 POOL_DAY 또는 실제 일차 인덱스 (보관함 ↔ 일차, 일차 ↔ 일차 모두 지원)
  moveItem: (
    fromDay: number,
    fromIndex: number,
    toDay: number,
    toIndex: number,
  ) => void;

  isSelected: (spot: ISpotListItem) => boolean;

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
            // 줄어드는 일차에 있던 관광지는 삭제하지 않고 보관함으로 되돌림
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
          // 보관함에 이미 있으면 제거
          if (state.pool.some((i) => i.contentid === spot.contentid)) {
            return {
              pool: state.pool.filter((i) => i.contentid !== spot.contentid),
            };
          }

          // 어떤 일차에 이미 들어있으면 그 일차에서 제거
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

          // 둘 다 아니면 보관함에 새로 추가 (특정 일차로 바로 들어가지 않음)
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
        }),
    }),
    {
      name: "wayPoint-storage",
      storage: createJSONStorage(() => localStorage),
      // pool, wayPoint, dayCount, dateRange를 localStorage에 저장 (expandedDay는 UI 상태라 저장 안 함)
      partialize: (state) => ({
        pool: state.pool,
        wayPoint: state.wayPoint,
        dayCount: state.dayCount,
        dateRange: state.dateRange,
      }),
    },
  ),
);
