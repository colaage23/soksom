import type {
  IAlternativeApiRequest,
  IAlternativeApiResponse,
  IAlternativeSpot,
} from "../../types/alternative";
import { axiosInstance } from "../axiosInstance";

export const getAlternativeSpots = async (
  params: IAlternativeApiRequest,
): Promise<IAlternativeSpot[]> => {
  try {
    const { data } = await axiosInstance.get<IAlternativeApiResponse>(
      "/alternative/keyword",
      { params },
    );
    return data.data;
  } catch (err) {
    console.error("alternative fetch failed", err); // 임시
    throw err;
  }
};
