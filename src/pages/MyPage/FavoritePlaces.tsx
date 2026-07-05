import { favoritePlaces } from "./favoritePlacesData";
import PlaceCollectionPage, {
  type CollectionPageItem,
} from "./PlaceCollectionPage";

const FavoritePlaces = () => {
  const calmCount = favoritePlaces.filter(
    (place) => place.level === "여유로움",
  ).length;
  const items: CollectionPageItem[] = favoritePlaces.map((place) => ({
    title: place.name,
    subtitle: place.savedDate,
    region: place.description,
    summary: place.summary,
    badge: place.level,
    badgeVariant: place.level === "여유로움" ? "calm" : "warm",
    isFavorite: true,
    tags: place.tags,
    primaryMeta: place.savedDate,
    secondaryMeta: place.recommendedTime,
    icon: place.icon,
  }));

  return (
    <PlaceCollectionPage
      eyebrow="FAVORITES"
      title="즐겨찾기 장소"
      backLabel="마이페이지로 돌아가기"
      stats={[
        { label: "저장한 장소", value: `${favoritePlaces.length}곳` },
        { label: "여유로운 장소", value: `${calmCount}곳` },
      ]}
      items={items}
    />
  );
};

export default FavoritePlaces;
