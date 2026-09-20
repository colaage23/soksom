import { useEffect, useMemo } from "react";
import { useDirectionWithFallback } from "../useDirectionWithFallback";
import type { ITripDetail } from "../../types/trip";

interface RouteLeg {
  distance: number;
  duration: number;
}

export const useDayRoute = (spots: ITripDetail[]) => {
  const { fetchDirectionWithFallback, data } = useDirectionWithFallback();

  const spotIds = useMemo(
    () => spots.map((s) => s.contentid).join(","),
    [spots],
  );

  useEffect(() => {
    if (spots.length > 1) {
      fetchDirectionWithFallback({
        origin: { x: Number(spots[0].mapx), y: Number(spots[0].mapy) },
        waypoints: spots.slice(1, -1).map((s) => ({
          x: Number(s.mapx),
          y: Number(s.mapy),
        })),
        destination: {
          x: Number(spots[spots.length - 1].mapx),
          y: Number(spots[spots.length - 1].mapy),
        },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [spotIds]);

  const route = data?.routes?.[0];

  const legs: RouteLeg[] | undefined = route?.sections?.map((s) => ({
    distance: s.distance,
    duration: s.duration,
  }));

  return {
    summary: route?.summary,
    resultMsg: route?.result_msg as string | undefined,
    legs,
  };
};
