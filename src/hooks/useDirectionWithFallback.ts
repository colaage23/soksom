import type { IDirectionsApiRequest } from "../api/kakao/directionsApi";
import { useDirection } from "./useDirections";
import { useNearestParking } from "./useNearestParking";

{
  /* 특정 관광지 좌표 주변 도로 탐색이 불가하여 근처 주차장 기준으로 경로 재탐색 하도록 구현. */
}
export const useDirectionWithFallback = () => {
  const { fetchDirection, data } = useDirection();
  const { fetchNearestParking } = useNearestParking();

  const fetchDirectionWithFallback = async (request: IDirectionsApiRequest) => {
    const result = await fetchDirection(request);

    const resultCode = result?.routes[0]?.result_code;

    switch (resultCode) {
      case 101: {
        request.waypoints = await Promise.all(
          request.waypoints.map(async (wp) => {
            const parking = await fetchNearestParking({ x: wp.x, y: wp.y });
            return {
              x: Number(parking.documents[0].x),
              y: Number(parking.documents[0].y),
            };
          }),
        );
        break;
      }
      case 102: {
        const parking = await fetchNearestParking({
          x: request.origin.x,
          y: request.origin.y,
        });
        request.origin = {
          x: Number(parking.documents[0].x),
          y: Number(parking.documents[0].y),
        };
        break;
      }
      case 103: {
        const parking = await fetchNearestParking({
          x: request.destination.x,
          y: request.destination.y,
        });
        request.destination = {
          x: Number(parking.documents[0].x),
          y: Number(parking.documents[0].y),
        };
        break;
      }
    }

    // 4. 재시도

    if (resultCode === 101 || resultCode === 102 || resultCode === 103) {
      await fetchDirection(request);
    }
  };

  return { fetchDirectionWithFallback, data };
};
