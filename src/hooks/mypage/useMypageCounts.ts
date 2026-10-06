import { useGetRecentSearchPlaces } from "../searchHistory/useGetRecentSearchPlaces";
import { useGetFavoriteSpots } from "../favorite/useGetFavoriteSpots";
import { useGetPreviousTrips } from "../trip/useGetTrips";

export const useMypageCounts = () => {
  const { data: recentPlaces = [], isLoading: isRecentLoading } =
    useGetRecentSearchPlaces();
  const { data: favoriteSpots = [], isLoading: isFavoriteLoading } =
    useGetFavoriteSpots();

  const { data: previousTripList, isLoading: isTripLoading } =
    useGetPreviousTrips({ pageNo: 1, numOfRows: 1 });

  return {
    recentCount: recentPlaces.length,
    favoriteCount: favoriteSpots.length,
    pastTripCount: previousTripList?.totalPages ?? 0,
    isLoading: isRecentLoading || isFavoriteLoading || isTripLoading,
  };
};
