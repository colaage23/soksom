import { Compass, MapPinned, Trees, Waves } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { removeFavorite } from "../../api/favorite/favoriteApi";
import { useGetFavoriteSpots } from "../../hooks/favorite/useGetFavoriteSpots";
import { useLikedSpotStore } from "../../stores/useLikedSpotStore";
import PlaceCollectionPage, {
  type CollectionPageItem,
} from "./components/PlaceCollectionPage";

const getFavoriteIcon = (category?: string) => {
  const normalizedCategory = category?.toLowerCase() ?? "";

  if (
    normalizedCategory.includes("산") ||
    normalizedCategory.includes("오름") ||
    normalizedCategory.includes("레포츠")
  ) {
    return Compass;
  }

  if (
    normalizedCategory.includes("숲") ||
    normalizedCategory.includes("공원") ||
    normalizedCategory.includes("자연")
  ) {
    return Trees;
  }

  if (
    normalizedCategory.includes("해") ||
    normalizedCategory.includes("바다") ||
    normalizedCategory.includes("해변")
  ) {
    return Waves;
  }

  return MapPinned;
};

const FavoritePlaces = () => {
  const queryClient = useQueryClient();
  const removeLikedSpot = useLikedSpotStore((state) => state.removeLikedSpot);
  const {
    data: favoriteSpots = [],
    isLoading,
    isError,
  } = useGetFavoriteSpots();
  const removeMutation = useMutation({
    mutationFn: removeFavorite,
    onSuccess: (_, favoriteId) => {
      const removedSpot = favoriteSpots.find(
        (spot) => spot.favoriteId === favoriteId,
      );

      if (removedSpot) {
        removeLikedSpot(removedSpot.contentid);
      }

      queryClient.invalidateQueries({ queryKey: ["favorite-spots"] });
    },
  });

  const handleFavoriteClick = (item: CollectionPageItem) => {
    if (item.favoriteId) {
      removeMutation.mutate(item.favoriteId);
    }
  };

  const items: CollectionPageItem[] = favoriteSpots.map((spot) => {
    const category =
      spot.lclsSystm3Nm ??
      spot.lclsSystm2Nm ??
      spot.lclsSystm1Nm ??
      "저장한 장소";

    return {
      title: spot.title,
      date: spot.createdAt?.slice(0, 10).replace(/-/g, ".") ?? "저장한 장소",
      region:
        [spot.addr1, spot.addr2].filter(Boolean).join(" ") || "주소 정보 없음",
      summary: spot.overview ?? `${category} 카테고리로 저장된 장소입니다.`,
      badge: category,
      badgeVariant:
        category.includes("자연") || category.includes("숲") ? "calm" : "warm",
      isFavorite: true,
      tags: [spot.lclsSystm1Nm, spot.lclsSystm2Nm, spot.lclsSystm3Nm]
        .filter(Boolean)
        .map((tag) => `#${tag}`),
      primaryMeta:
        spot.createdAt?.slice(0, 10).replace(/-/g, ".") ?? "저장 완료",
      secondaryMeta: spot.tel ?? "연락처 정보 없음",
      icon: getFavoriteIcon(category),
      contentId: spot.contentid,
      favoriteId: spot.favoriteId,
      thumbnail: spot.firstimage,
    };
  });

  return (
    <PlaceCollectionPage
      eyebrow="FAVORITES"
      title="즐겨찾기 장소"
      backLabel="마이페이지로 돌아가기"
      stats={[
        { label: "저장한 장소", value: `${favoriteSpots.length}곳` },
        {
          label: "카테고리 보유",
          value: `${new Set(items.map((item) => item.badge)).size}종`,
        },
      ]}
      items={items}
      emptyMessage={
        isError
          ? "즐겨찾기 목록을 불러오지 못했습니다."
          : "저장된 즐겨찾기 장소가 없습니다."
      }
      isLoading={isLoading}
      onFavoriteClick={handleFavoriteClick}
      isFavoritePending={removeMutation.isPending}
    />
  );
};

export default FavoritePlaces;
