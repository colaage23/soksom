import axios from "axios";
import type {
  ISearchByKeywordRequest,
  ISearchByLocationRequest,
  ISearchSpotResponse,
} from "../../types/spot";

export const getSpotsByKeyword = async ({
  pageNo,
  keyword,
}: ISearchByKeywordRequest): Promise<ISearchSpotResponse[]> => {
  try {
    const response = await axios.get("/api/search/keyword", {
      params: { pageNo, keyword },
    });
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
    const response = await axios.get("/api/search/location", {
      params: { pageNo, mapX, mapY, radius },
    });
    console.log("pageNo:", pageNo, "data:", response.data.data);
    return response.data.data;
  } catch (error) {
    console.error("Fetch Spot by Location Error: ", error);
    throw new Error("Fail to fetch Spot by Location.", { cause: error });
  }
};
