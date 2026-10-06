import type { ICreateTripDetailPayload } from "../api/trip/tripApi";
import type { ISpotListItem } from "../types/spot";

const addDays = (dateStr: string, days: number): string => {
  const date = new Date(dateStr);
  date.setDate(date.getDate() + days);
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
};

const toTripDetails = (
  wayPoint: ISpotListItem[][],
  startDate: string,
): ICreateTripDetailPayload[] => {
  const details: ICreateTripDetailPayload[] = [];

  wayPoint.forEach((daySpots, dayIdx) => {
    const visitDate = addDays(startDate, dayIdx);

    daySpots.forEach((spot, order) => {
      details.push({
        contentid: spot.contentid,
        contenttypeid: spot.contenttypeid ?? "",
        zipcode: "", // ISpotListItem엔 없는 필드라 빈 값
        addr1: spot.addr1,
        addr2: "", // ISpotListItem엔 없는 필드라 빈 값
        firstimage: spot.firstimage ?? "",
        mapx: spot.mapx ?? "",
        mapy: spot.mapy ?? "",
        tel: "", // ISpotListItem엔 없는 필드라 빈 값
        title: spot.title,
        lclsSystm1: spot.lclsSystm1 ?? "",
        lclsSystm2: spot.lclsSystm2 ?? "",
        lclsSystm3: spot.lclsSystm3 ?? "",
        lclsSystm1Nm: "", // ISpotListItem엔 없는 필드라 빈 값
        lclsSystm2Nm: spot.lclsSystm2Nm ?? "",
        lclsSystm3Nm: "", // ISpotListItem엔 없는 필드라 빈 값
        ldongRegnCd: spot.lDongRegnCd ?? "",
        ldongSignguCd: spot.lDongSignguCd ?? "",
        visitOrder: String(order + 1),
        visitDate,
      });
    });
  });

  return details;
};

export default toTripDetails;
