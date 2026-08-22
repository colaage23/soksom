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
  lclsSystm1Nm?: string;
  lclsSystm2?: string;
  lclsSystm2Nm?: string;
  lclsSystm3?: string;
  lclsSystm3Nm?: string;
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
  lclsSystm1Nm: spot.lclsSystm1 ?? spot.lclsSystm1Nm,
  lclsSystm2Nm: spot.lclsSystm2 ?? spot.lclsSystm2Nm,
  lclsSystm3Nm: spot.lclsSystm3 ?? spot.lclsSystm3Nm,

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
