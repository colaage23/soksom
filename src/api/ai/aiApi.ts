import type { ITripDetail } from "../../types/trip";
import { axiosInstance } from "../axiosInstance";
import { normalizeTripDetail, type IRawTripDetail } from "../trip/tripApi";

interface IOptimizeAiRouteResponse {
  success?: boolean;
  message?: string;
  data?: IRawTripDetail[];
}

export const optimizeAiRoute = async (
  tripId: number | string,
): Promise<ITripDetail[]> => {
  try {
    const { data } = await axiosInstance.post<IOptimizeAiRouteResponse>(
      `/ai/route/${tripId}`,
    );

    return Array.isArray(data.data) ? data.data.map(normalizeTripDetail) : [];
  } catch (error) {
    console.error("Optimize AI Route Error:", error);
    throw new Error("Fail to optimize AI route.", { cause: error });
  }
};
