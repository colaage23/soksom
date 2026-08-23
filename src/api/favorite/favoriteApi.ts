import axios from "axios";
import type { ISpotListItem } from "../../types/spot";
import { axiosInstance } from "../axiosInstance";

export interface IFavoriteSpot {
  favoriteId?: string;
  contentid: string;
  contenttypeid?: string;
  title: string;
  addr1: string;
  addr2?: string;
  firstimage?: string;
  mapx?: string;
  mapy?: string;
  tel?: string;
  overview?: string;
  lclsSystm1?: string;
  lclsSystm2?: string;
  lclsSystm3?: string;
  lclsSystm1Nm?: string;
  lclsSystm2Nm?: string;
  lclsSystm3Nm?: string;
  lDongRegnCd?: string;
  lDongSignguCd?: string;
  createdAt?: string;
  updatedAt?: string;
}

interface IFavoriteListParams {
  pageNo?: number;
  numOfRows?: number;
}

interface IRawFavoriteSpot {
  favoriteId?: string;
  contentId?: string;
  contentid?: string;
  contentTypeId?: string;
  contenttypeid?: string;
  spotName?: string;
  title?: string;
  address?: string;
  addr1?: string;
  addr2?: string;
  ldongRegnCd?: string;
  ldongSignguCd?: string;
  lclsSystm1?: string;
  lclsSystm2?: string;
  lclsSystm3?: string;
  lclsSystm2Nm?: string;
  latitude?: number | string;
  mapy?: number | string;
  longitude?: number | string;
  mapx?: number | string;
  thumbnail?: string;
  firstimage?: string;
  tel?: string;
  overview?: string;
  userId?: string;
  createdAt?: string;
  updatedAt?: string;
}

interface IFavoriteListData {
  content?: IRawFavoriteSpot[];
  totalCount?: number;
  pageNo?: number;
  numOfRows?: number;
  totalPages?: number;
}

type FavoriteListPayload =
  | IRawFavoriteSpot[]
  | {
      success?: boolean;
      message?: string;
      data?: IFavoriteListData | IRawFavoriteSpot[];
      items?: IRawFavoriteSpot[];
      content?: IRawFavoriteSpot[];
      favorites?: IRawFavoriteSpot[];
    };

const normalizeFavoriteSpot = (spot: IRawFavoriteSpot): IFavoriteSpot => ({
  favoriteId: spot.favoriteId,
  contentid: spot.contentId ?? spot.contentid ?? "",
  contenttypeid: spot.contentTypeId ?? spot.contenttypeid,
  title: spot.spotName ?? spot.title ?? "이름 없는 장소",
  addr1: spot.address ?? spot.addr1 ?? "",
  addr2:
    spot.ldongRegnCd && spot.ldongSignguCd
      ? `${spot.ldongRegnCd} ${spot.ldongSignguCd}`
      : spot.addr2,
  firstimage: spot.thumbnail ?? spot.firstimage,
  mapx:
    spot.longitude !== undefined
      ? String(spot.longitude)
      : spot.mapx !== undefined
        ? String(spot.mapx)
        : undefined,
  mapy:
    spot.latitude !== undefined
      ? String(spot.latitude)
      : spot.mapy !== undefined
        ? String(spot.mapy)
        : undefined,
  tel: spot.tel,
  overview: spot.overview,
  lclsSystm1: spot.lclsSystm1,
  lclsSystm2: spot.lclsSystm2,
  lclsSystm3: spot.lclsSystm3,
  lclsSystm2Nm: spot.lclsSystm2Nm,

  lDongRegnCd: spot.ldongRegnCd,
  lDongSignguCd: spot.ldongSignguCd,
  createdAt: spot.createdAt,
  updatedAt: spot.updatedAt,
});

const extractFavoriteList = (payload: FavoriteListPayload): IFavoriteSpot[] => {
  if (Array.isArray(payload)) {
    return payload.map(normalizeFavoriteSpot);
  }

  if (Array.isArray(payload.data)) {
    return payload.data.map(normalizeFavoriteSpot);
  }

  if (payload.data && Array.isArray(payload.data.content)) {
    return payload.data.content.map(normalizeFavoriteSpot);
  }

  if (Array.isArray(payload.items)) {
    return payload.items.map(normalizeFavoriteSpot);
  }

  if (Array.isArray(payload.content)) {
    return payload.content.map(normalizeFavoriteSpot);
  }

  if (Array.isArray(payload.favorites)) {
    return payload.favorites.map(normalizeFavoriteSpot);
  }

  return [];
};

export const getFavoriteSpots = async ({
  pageNo = 1,
  numOfRows = 8,
}: IFavoriteListParams = {}): Promise<IFavoriteSpot[]> => {
  try {
    const response = await axiosInstance.get<FavoriteListPayload>("/favorite", {
      params: { pageNo, numOfRows },
    });

    return extractFavoriteList(response.data);
  } catch (error) {
    console.error("Fetch Favorite Spots Error: ", error);
    throw new Error("Fail to fetch Favorite Spots.", { cause: error });
  }
};

export interface IAddFavoritePayload {
  contentId: string;
  contentTypeId?: string;
  spotName: string;
  address: string;
  ldongRegnCd?: string;
  ldongSignguCd?: string;
  lclsSystm1?: string;
  lclsSystm2?: string;
  lclsSystm3?: string;
  latitude?: number;
  longitude?: number;
  thumbnail?: string;
  congestion?: {
    cnctrRate: string;
    baseYmd: string;
    areaCd: string;
    areaNm: string;
    signguCd: string;
    signguNm: string;
    tatsNm: string;
  };
}

interface IAddFavoriteResponse {
  success: boolean;
  message?: string;
  data: string | number;
}

export const addFavorite = async (
  payload: IAddFavoritePayload,
): Promise<string> => {
  try {
    const response = await axiosInstance.post<IAddFavoriteResponse>(
      "/favorite",
      payload,
    );
    return String(response.data.data);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Add Favorite Error:", error.response?.data);
      console.error("Status:", error.response?.status);
      console.error("Request payload:", error.config?.data);
    }
    throw new Error("Fail to add Favorite.", { cause: error });
  }
};

export const removeFavorite = async (favoriteId: string): Promise<void> => {
  try {
    await axiosInstance.delete(`/favorite/${favoriteId}`);
  } catch (error) {
    console.error("Remove Favorite Error: ", error);
    throw new Error("Fail to remove Favorite.", { cause: error });
  }
};

// ISpotListItem -> POST 요청 바디 변환
export const toAddFavoritePayload = (
  spot: ISpotListItem,
): IAddFavoritePayload => ({
  contentId: spot.contentid,
  contentTypeId: spot.contenttypeid ?? "",
  spotName: spot.title,
  address: spot.addr1 ?? "",
  ldongRegnCd: spot.lDongRegnCd ?? "",
  ldongSignguCd: spot.lDongSignguCd ?? "",
  thumbnail: spot.firstimage ?? "",
  latitude: spot.mapy ? Number(spot.mapy) : 0,
  longitude: spot.mapx ? Number(spot.mapx) : 0,
  lclsSystm1: spot.lclsSystm1 ?? "",
  lclsSystm2: spot.lclsSystm2 ?? "",
  lclsSystm3: spot.lclsSystm3 ?? "",
  congestion: spot.congestion
    ? {
        cnctrRate: spot.congestion.cnctrRate,
        baseYmd: spot.congestion.baseYmd,
        areaCd: spot.congestion.areaCd,
        areaNm: spot.congestion.areaNm,
        signguCd: spot.congestion.signguCd,
        signguNm: spot.congestion.signguNm,
        tatsNm: spot.congestion.tatsNm ?? spot.title,
      }
    : undefined,
});
