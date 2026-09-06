import type {
  ITrip,
  ITripDetail,
  ITripListParams,
  ITripListResult,
} from "../../types/trip";
import { axiosInstance } from "../axiosInstance";

interface IRawTripDetail {
  detailId?: number | string;
  tripId?: number | string;
  contentId?: string;
  contentid?: string;
  contentTypeId?: string;
  contenttypeid?: string;
  zipcode?: string;
  addr1?: string;
  addr2?: string;
  firstimage?: string;
  mapx?: number | string;
  mapy?: number | string;
  tel?: string;
  title?: string;
  lclsSystm1?: string;
  lclsSystm2?: string;
  lclsSystm3?: string;
  lclsSystm1Nm?: string;
  lclsSystm2Nm?: string;
  lclsSystm3Nm?: string;
  visitOrder?: number | string;
  visitDate?: string;
  createdAt?: string;
  updatedAt?: string;
}

interface IRawTrip {
  tripId?: number | string;
  userId?: number | string;
  tripName?: string;
  startDate?: string;
  endDate?: string;
  isAiRoute?: string;
  shareCode?: string;
  createdAt?: string;
  updatedAt?: string;
  details?: IRawTripDetail[];
}

interface IRawTripListData {
  content?: IRawTrip[];
  totalCount?: number;
  pageNo?: number;
  numOfRows?: number;
  totalPages?: number;
}

interface ITripListResponse {
  success?: boolean;
  message?: string;
  data?: IRawTripListData;
}

const toNumber = (value?: number | string) => {
  const nextValue = Number(value);
  return Number.isFinite(nextValue) ? nextValue : 0;
};

const normalizeTripDetail = (detail: IRawTripDetail): ITripDetail => ({
  detailId: toNumber(detail.detailId),
  tripId: toNumber(detail.tripId),
  contentid: detail.contentId ?? detail.contentid ?? "",
  contenttypeid: detail.contentTypeId ?? detail.contenttypeid ?? "",
  zipcode: detail.zipcode ?? "",
  addr1: detail.addr1 ?? "",
  addr2: detail.addr2 ?? "",
  firstimage: detail.firstimage ?? "",
  mapx: detail.mapx !== undefined ? String(detail.mapx) : "",
  mapy: detail.mapy !== undefined ? String(detail.mapy) : "",
  tel: detail.tel ?? "",
  title: detail.title ?? "이름 없는 장소",
  lclsSystm1: detail.lclsSystm1 ?? "",
  lclsSystm2: detail.lclsSystm2 ?? "",
  lclsSystm3: detail.lclsSystm3 ?? "",
  lclsSystm1Nm: detail.lclsSystm1Nm ?? "",
  lclsSystm2Nm: detail.lclsSystm2Nm ?? "",
  lclsSystm3Nm: detail.lclsSystm3Nm ?? "",
  visitOrder: detail.visitOrder !== undefined ? String(detail.visitOrder) : "",
  visitDate: detail.visitDate ?? "",
  createdAt: detail.createdAt ?? "",
  updatedAt: detail.updatedAt ?? "",
});

const normalizeTrip = (trip: IRawTrip): ITrip => ({
  tripId: toNumber(trip.tripId),
  userId: toNumber(trip.userId),
  tripName: trip.tripName ?? "이름 없는 여행",
  startDate: trip.startDate ?? "",
  endDate: trip.endDate ?? "",
  isAiRoute: trip.isAiRoute ?? "",
  shareCode: trip.shareCode ?? "",
  createdAt: trip.createdAt ?? "",
  updatedAt: trip.updatedAt ?? "",
  details: Array.isArray(trip.details)
    ? trip.details.map(normalizeTripDetail)
    : [],
});

const getTripsByPath = async (
  path: "/trip" | "/trip/next" | "/trip/pre",
  { spotName, pageNo = 1, numOfRows = 20 }: ITripListParams = {},
): Promise<ITripListResult> => {
  try {
    const { data } = await axiosInstance.get<ITripListResponse>(path, {
      params: {
        ...(spotName ? { spotName } : {}),
        pageNo,
        numOfRows,
      },
    });

    const tripData = data.data;
    const content = Array.isArray(tripData?.content)
      ? tripData.content.map(normalizeTrip)
      : [];

    return {
      content,
      totalCount: tripData?.totalCount ?? content.length,
      pageNo: tripData?.pageNo ?? pageNo,
      numOfRows: tripData?.numOfRows ?? numOfRows,
      totalPages: tripData?.totalPages ?? (content.length > 0 ? 1 : 0),
    };
  } catch (error) {
    console.error("Fetch Trips Error:", error);
    throw new Error("Fail to fetch trips.", { cause: error });
  }
};

export const getTrips = (params?: ITripListParams) =>
  getTripsByPath("/trip", params);

export const getNextTrips = (params?: ITripListParams) =>
  getTripsByPath("/trip/next", params);

export const getPreviousTrips = (params?: ITripListParams) =>
  getTripsByPath("/trip/pre", params);

export interface ICreateTripDetailPayload {
  contentid: string;
  contenttypeid?: string;
  zipcode?: string;
  addr1?: string;
  addr2?: string;
  firstimage?: string;
  mapx?: string;
  mapy?: string;
  tel?: string;
  title: string;
  lclsSystm1?: string;
  lclsSystm2?: string;
  lclsSystm3?: string;
  lclsSystm1Nm?: string;
  lclsSystm2Nm?: string;
  lclsSystm3Nm?: string;
  ldongRegnCd?: string;
  ldongSignguCd?: string;
  visitOrder: string;
  visitDate: string;
}

export interface ICreateTripPayload {
  tripName: string;
  startDate: string;
  endDate: string;
  isAiRoute: "Y" | "N";
  shareCode?: string;
  details: ICreateTripDetailPayload[];
}

interface ICreateTripResponse {
  success: boolean;
  message?: string;
  data: number; // tripId
}

export const createTrip = async (
  payload: ICreateTripPayload,
): Promise<number> => {
  try {
    const response = await axiosInstance.post<ICreateTripResponse>(
      "/trip",
      payload,
    );
    return response.data.data;
  } catch (error) {
    console.error("Create Trip Error: ", error);
    throw new Error("Fail to create Trip.", { cause: error });
  }
};
