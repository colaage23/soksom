import axios from "axios";
import type {
  ISearchByKeywordRequest,
  ISearchByLocationRequest,
  ISearchSpotResponse,
  ISpotDetailRequest,
  ISpotDetailResponse,
} from "../../types/spot";
import { axiosInstance } from "../axiosInstance";

export const getSpotsByKeyword = async ({
  pageNo,
  keyword,
}: ISearchByKeywordRequest): Promise<ISearchSpotResponse[]> => {
  try {
    const response = await axios.get<{ data: ISearchSpotResponse[] }>(
      "/api/search/keyword",
      {
        params: { pageNo, keyword },
      },
    );
    return response.data.data;
  } catch (error) {
    console.error("Fetch Spot by Keyword Error: ", error);
    throw new Error("Fail to fetch Spot by Keyword.", { cause: error });
  }
};

export const getSpotsByLocation = async ({
  pageNo,
  mapX,
  mapY,
  radius,
}: ISearchByLocationRequest): Promise<ISearchSpotResponse[]> => {
  try {
    const response = await axios.get<{ data: ISearchSpotResponse[] }>(
      "/api/search/location",
      {
        params: { pageNo, mapX, mapY, radius },
      },
    );
    return response.data.data;
  } catch (error) {
    console.error("Fetch Spot by Location Error: ", error);
    throw new Error("Fail to fetch Spot by Location.", { cause: error });
  }
};

export const getSpotDetail = async ({
  contentid,
  contenttypeid,
}: ISpotDetailRequest): Promise<ISpotDetailResponse> => {
  try {
    const response = await axiosInstance.get<{ data: ISpotDetailResponse }>(
      "/detail",
      { params: { contentid, contenttypeid } },
    );

    return response.data.data;
  } catch (error) {
    console.error("Fetch Spot Detail Error: ", error);
    throw new Error("Fail to fetch Spot Detail.", { cause: error });
  }
};
