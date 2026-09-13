import type {
  ICongestionApiRequest,
  ICongestionApiResponse,
} from "../../types/congestion";
import { axiosInstance } from "../axiosInstance";

export const getCongestion = async ({
  areaCd,
  spotName,
  signguCd,
}: ICongestionApiRequest): Promise<ICongestionApiResponse["data"]> => {
  try {
    const response = await axiosInstance.get<ICongestionApiResponse>(
      "/congestion",
      {
        params: { areaCd, spotName, signguCd },
      },
    );

    return response.data.data;
  } catch (error) {
    console.error("Fetch Congestion Error: ", error);
    throw new Error("Fail to fetch Congestion.", { cause: error });
  }
};
