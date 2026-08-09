import { Compass, MapPinned, Trees, Waves } from "lucide-react";
import { useGetRecentSearchPlaces } from "../../hooks/searchHistory/useGetRecentSearchPlaces";
import { formatVisitDateLabel } from "./utils/placeDateLabel";
import PlaceCollectionPage, {
  type CollectionPageItem,
} from "./components/PlaceCollectionPage";

const getRecentPlaceIcon = (title: string) => {
  if (title.includes("숲")) {
    return Trees;
  }

  if (
    title.includes("해") ||
    title.includes("바다") ||
    title.includes("해변")
  ) {
    return Waves;
  }

  if (title.includes("오름") || title.includes("산")) {
    return Compass;
  }

  return MapPinned;
};

const RecentPlaces = () => {
  const {
    data: recentSearchPlaces = [],
    isLoading,
    isError,
  } = useGetRecentSearchPlaces();
  const currentMonth = new Date().toISOString().slice(0, 7);
  const monthlyCount = recentSearchPlaces.filter((place) =>
    place.createdAt?.startsWith(currentMonth),
  ).length;
  const stats = [
    { label: "최근 조회", value: `${recentSearchPlaces.length}곳` },
    { label: "이번 달 조회", value: `${monthlyCount}곳` },
  ];
  const items: CollectionPageItem[] = recentSearchPlaces.map((place) => ({
    title: place.title,
    date: place.createdAt?.slice(0, 10).replace(/-/g, ".") ?? "최근 조회",
    region: place.addr1 || "주소 정보 없음",
    summary: `${place.title} 장소를 최근 조회했습니다.`,
    badge: "최근 조회",
    badgeVariant: "calm",
    isFavorite: false,
    tags: [place.contenttypeid ? `#${place.contenttypeid}` : "#recent"],
    primaryMeta:
      place.createdAt?.slice(0, 10).replace(/-/g, ".") ?? "최근 조회",
    secondaryMeta: `기록 #${place.historyId}`,
    icon: getRecentPlaceIcon(place.title),
  }));

  return (
    <PlaceCollectionPage
      eyebrow="RECENT PLACES"
      title="최근 조회한 장소"
      backLabel="마이페이지로 돌아가기"
      stats={stats}
      items={items}
      isLoading={isLoading}
      emptyMessage={
        isError
          ? "최근 조회한 장소를 불러오지 못했습니다."
          : "최근 조회한 장소가 없습니다."
      }
      formatDateLabel={formatVisitDateLabel}
    />
  );
};

export default RecentPlaces;
