import axios from "axios";
import type { ISpotRequest, ISpotResponse } from "../../types/spot";

export const getSpotsByKeyword = async ({
  pageNo,
  keyword,
}: ISpotRequest): Promise<ISpotResponse[]> => {
  try {
    const response = await axios.get(
      "https://port-0-jeju-trip-mq3obdfx86be820f.sel3.cloudtype.app/search/keyword",
      { params: { pageNo, keyword } },
    );
    return response.data.data;
  } catch (error) {
    console.error("Fetch Spot by Keyword Error: ", error);
    throw new Error("Fail to fetch Spot by Keyword.", { cause: error });
  }
};
