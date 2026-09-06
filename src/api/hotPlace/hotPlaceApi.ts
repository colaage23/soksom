import type { IHotPlace } from "../../types/hotPlace";
import { axiosInstance } from "../axiosInstance";

export const getHotPlaces = async (baseYm: string): Promise<IHotPlace[]> => {
  try {
    const response = await axiosInstance.get<{ data: IHotPlace[] }>(
      "/hot-place",
      { params: { baseYm } },
    );

    return response.data.data;
  } catch (error) {
    console.error("Fetch Hot Places Error: ", error);
    throw new Error("Fail to fetch hot places.", { cause: error });
  }
};
