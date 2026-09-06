import { useQuery } from "@tanstack/react-query";
import { getJejuWeather } from "../api/weather/openMeteoApi";

export const useJejuWeather = () => {
  return useQuery({
    queryKey: ["jeju-weather"],
    queryFn: getJejuWeather,
    staleTime: 1000 * 60 * 10,
    gcTime: 1000 * 60 * 30,
  });
};
