import { useQuery } from "@tanstack/react-query";
import { getRecentSearchPlaces } from "../../api/searchHistory/searchHistoryApi";
import { useAuthStore } from "../../stores/auth/authStore";

export const useGetRecentSearchPlaces = () => {
  const accessToken = useAuthStore((state) => state.accessToken);

  return useQuery({
    queryKey: ["recent-search-places"],
    queryFn: getRecentSearchPlaces,
    enabled: Boolean(accessToken),
    staleTime: 1000 * 5,
    gcTime: 1000 * 5,
  });
};
