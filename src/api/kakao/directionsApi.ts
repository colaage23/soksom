import axios from "axios";

interface IWaypoints {
  name?: string;
  x: number;
  y: number;
}

export interface IDirectionsApiRequest {
  origin: IWaypoints;
  destination: IWaypoints;
  waypoints: IWaypoints[];

  priority?: string;
  avoid?: string[];
  roadevent?: number;
  alternatives?: boolean;
  road_details?: boolean;
  car_type?: number;
  car_fuel?: string;
  car_hipass?: boolean;
  summart?: boolean;
}

export interface IDirectionsApiResponse {
  routes: {
    result_code: number;
    result_msg: string;
    sections: {
      bound: {
        max_x: number;
        max_y: number;
        min_x: number;
        min_y: number;
      };
      distance: number;
      duration: number;
      guides: {
        distance: number;
        duration: number;
        guidance: string;
        name: string;
        road_index: number;
        type: number;
        x: number;
        y: number;
      }[];
      roads: {
        distance: number;
        duration: number;
        name: string;
        traffic_speed: number;
        traffic_state: number;
        vertexes: number[];
      }[];
    }[];
  }[];
}

const KAKAO_REST_API = import.meta.env.VITE_APP_KAKAO_REST_API_KEY;

export const getDirections = async (request: IDirectionsApiRequest) => {
  try {
    const response = await axios.post(
      `https://apis-navi.kakaomobility.com/v1/waypoints/directions`,
      request,
      {
        headers: {
          Authorization: `KakaoAK ${KAKAO_REST_API}`,
          "Content-Type": `application/json`,
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error("Fetch Directions Error: ", error);
    throw new Error("Fail to fetch Direction.", { cause: error });
  }
};
