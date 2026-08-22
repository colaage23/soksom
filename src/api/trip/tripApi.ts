import { axiosInstance } from "../axiosInstance";

export interface ICreateTripDetailPayload {
  contentid: string;
  contenttypeid?: string;
  zipcode?: string;
  addr1?: string;
  addr2?: string;
  firstimage?: string;
  mapx?: string;
  mapy?: string;
  tel?: string;
  title: string;
  lclsSystm1?: string;
  lclsSystm2?: string;
  lclsSystm3?: string;
  lclsSystm1Nm?: string;
  lclsSystm2Nm?: string;
  lclsSystm3Nm?: string;
  ldongRegnCd?: string;
  ldongSignguCd?: string;
  visitOrder: string;
  visitDate: string;
}

export interface ICreateTripPayload {
  tripName: string;
  startDate: string;
  endDate: string;
  isAiRoute: "Y" | "N";
  shareCode?: string;
  details: ICreateTripDetailPayload[];
}

interface ICreateTripResponse {
  success: boolean;
  message?: string;
  data: number; // tripId
}

export const createTrip = async (
  payload: ICreateTripPayload,
): Promise<number> => {
  try {
    const response = await axiosInstance.post<ICreateTripResponse>(
      "/trip",
      payload,
    );
    return response.data.data;
  } catch (error) {
    console.error("Create Trip Error: ", error);
    throw new Error("Fail to create Trip.", { cause: error });
  }
};
