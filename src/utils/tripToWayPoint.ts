import type { ISpotListItem } from "../types/spot";
import type { ITrip, ITripDetail } from "../types/trip";

const toDateOnly = (value: string) => new Date(value.slice(0, 10));

const diffDays = (from: Date, to: Date) =>
  Math.round((to.getTime() - from.getTime()) / (1000 * 60 * 60 * 24));

const toSpotListItem = (detail: ITripDetail): ISpotListItem => ({
  contentid: detail.contentid,
  contenttypeid: detail.contenttypeid,
  zipcode: detail.zipcode,
  title: detail.title,
  addr1: detail.addr1,
  addr2: detail.addr2,
  firstimage: detail.firstimage,
  mapx: detail.mapx,
  mapy: detail.mapy,
  tel: detail.tel,
  lclsSystm1: detail.lclsSystm1,
  lclsSystm2: detail.lclsSystm2,
  lclsSystm3: detail.lclsSystm3,
  lclsSystm1Nm: detail.lclsSystm1Nm,
  lclsSystm2Nm: detail.lclsSystm2Nm,
  lclsSystm3Nm: detail.lclsSystm3Nm,
  lDongRegnCd: detail.ldongRegnCd,
  lDongSignguCd: detail.ldongSignguCd,
  congestion: detail.congestion ?? null,
});

// 여행 상세를 일차별 wayPoint 배열로 변환. 날짜 범위 밖 상세는 보관함(pool)으로 보냄
export const tripToWayPoint = (trip: ITrip) => {
  const startDate = toDateOnly(trip.startDate);
  const endDate = toDateOnly(trip.endDate);
  const dayCount = Math.max(1, diffDays(startDate, endDate) + 1);

  const wayPoint: ISpotListItem[][] = Array.from(
    { length: dayCount },
    () => [],
  );
  const pool: ISpotListItem[] = [];

  const sortedDetails = [...trip.details].sort(
    (a, b) => Number(a.visitOrder) - Number(b.visitOrder),
  );

  sortedDetails.forEach((detail) => {
    const dayIdx = detail.visitDate
      ? diffDays(startDate, toDateOnly(detail.visitDate))
      : -1;

    const spot = toSpotListItem(detail);

    if (dayIdx >= 0 && dayIdx < dayCount) {
      wayPoint[dayIdx].push(spot);
    } else {
      pool.push(spot);
    }
  });

  return {
    pool,
    wayPoint,
    dayCount,
    dateRange: { startDate, endDate },
  };
};
