import { axiosInstance } from "../axiosInstance";

export interface IRecentSearchPlace {
  historyId: number;
  contentid: string;
  contenttypeid?: string;
  title: string;
  addr1: string;
  firstimage?: string;
  createdAt?: string;
}

interface IRawRecentSearchPlace {
  historyId: number;
  contentId?: string;
  contentid?: string;
  contentTypeId?: string;
  contenttypeid?: string;
  spotName?: string;
  title?: string;
  address?: string;
  addr1?: string;
  thumbnail?: string;
  firstimage?: string;
  createdAt?: string;
}

type RecentSearchHistoryPayload =
  | IRawRecentSearchPlace[]
  | {
      success?: boolean;
      message?: string;
      data?: IRawRecentSearchPlace[];
    };

const normalizeRecentSearchPlace = (
  place: IRawRecentSearchPlace,
): IRecentSearchPlace => ({
  historyId: place.historyId,
  contentid: place.contentId ?? place.contentid ?? "",
  contenttypeid: place.contentTypeId ?? place.contenttypeid,
  title: place.spotName ?? place.title ?? "이름 없는 장소",
  addr1: place.address ?? place.addr1 ?? "주소 정보 없음",
  firstimage: place.thumbnail ?? place.firstimage,
  createdAt: place.createdAt,
});

const extractRecentSearchPlaces = (
  payload: RecentSearchHistoryPayload,
): IRecentSearchPlace[] => {
  if (Array.isArray(payload)) {
    return payload.map(normalizeRecentSearchPlace);
  }

  if (Array.isArray(payload.data)) {
    return payload.data.map(normalizeRecentSearchPlace);
  }

  return [];
};

export const getRecentSearchPlaces = async (): Promise<
  IRecentSearchPlace[]
> => {
  try {
    const response = await axiosInstance.get<RecentSearchHistoryPayload>(
      "/search-history/recent",
    );

    return extractRecentSearchPlaces(response.data);
  } catch (error) {
    console.error("Fetch Recent Search Places Error: ", error);
    throw new Error("Fail to fetch Recent Search Places.", { cause: error });
  }
};
