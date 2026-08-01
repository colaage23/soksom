import { useQuery } from "@tanstack/react-query";
import { getFavoriteSpots } from "../../api/favorite/favoriteApi";
import { useAuthStore } from "../../stores/auth/authStore";

export const useGetFavoriteSpots = () => {
  const accessToken = useAuthStore((state) => state.accessToken);

  return useQuery({
    queryKey: ["favorite-spots"],
    queryFn: () => getFavoriteSpots(),
    enabled: Boolean(accessToken),
    staleTime: 1000 * 60 * 10,
    gcTime: 1000 * 60 * 10,
  });
};
