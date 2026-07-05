import { recentPlaces } from "./recentPlacesData";
import PlaceCollectionPage, {
  type CollectionPageItem,
} from "./PlaceCollectionPage";

const RecentPlaces = () => {
  const calmCount = recentPlaces.filter(
    (place) => place.status === "여유",
  ).length;
  const stats = [
    { label: "최근 방문", value: `${recentPlaces.length}곳` },
    { label: "여유로운 장소", value: `${calmCount}곳` },
  ];
  const items: CollectionPageItem[] = recentPlaces.map((place) => ({
    title: place.title,
    subtitle: place.subtitle,
    region: place.region,
    summary: place.summary,
    badge: place.status,
    badgeVariant: place.status === "여유" ? "calm" : "warm",
    isFavorite: false,
    tags: place.tags,
    primaryMeta: place.visitDate,
    secondaryMeta: place.stayTime,
    icon: place.icon,
  }));

  return (
    <PlaceCollectionPage
      eyebrow="RECENT PLACES"
      title="최근 방문한 장소"
      backLabel="마이페이지로 돌아가기"
      stats={stats}
      items={items}
    />
  );
};

export default RecentPlaces;
