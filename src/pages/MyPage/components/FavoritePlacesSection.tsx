import {
  ChevronRight,
  Compass,
  Heart,
  MapPinned,
  Trees,
  Waves,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import colors from "../../../constants/colors";
import { useGetFavoriteSpots } from "../../../hooks/favorite/useGetFavoriteSpots";
import { useToggleFavorite } from "../../../hooks/favorite/useToggleFavorite";

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

export const FavoritePlacesSection = () => {
  const navigate = useNavigate();
  const { toggleFavorite, isPending: isFavoritePending } = useToggleFavorite();
  const { data: favoriteSpots = [], isLoading: isFavoriteLoading } =
    useGetFavoriteSpots();
  const previewFavoriteSpots = favoriteSpots.slice(0, 3);

  const handleMoveToPlace = (title: string, contentId: string) => {
    const searchParams = new URLSearchParams({ keyword: title });

    if (contentId) {
      searchParams.set("contentId", contentId);
    }

    navigate({ pathname: "/map", search: `?${searchParams.toString()}` });
  };

  const handlePlaceCardKeyDown = (
    event: React.KeyboardEvent<HTMLElement>,
    title: string,
    contentId: string,
  ) => {
    if (
      event.target === event.currentTarget &&
      (event.key === "Enter" || event.key === " ")
    ) {
      event.preventDefault();
      handleMoveToPlace(title, contentId);
    }
  };

  return (
    <SectionBlock id="mypage-favorites">
      <SectionHeader>
        <SectionTitle>즐겨찾기</SectionTitle>
        <SectionLink
          type="button"
          onClick={() => navigate("/mypage/favorites")}
        >
          전체보기
          <ChevronRight size={16} />
        </SectionLink>
      </SectionHeader>

      <FavoriteGrid>
        {isFavoriteLoading ? (
          <FavoriteEmptyCard>
            아직 저장된 즐겨찾기 장소가 없습니다.
          </FavoriteEmptyCard>
        ) : (
          previewFavoriteSpots.map((place, index) => {
            const category =
              place.lclsSystm3Nm ??
              place.lclsSystm2Nm ??
              place.lclsSystm1Nm ??
              "저장한 장소";
            const Icon = getFavoriteIcon(category);

            return (
              <FavoriteCard
                key={place.contentid}
                role="button"
                tabIndex={0}
                onClick={() => handleMoveToPlace(place.title, place.contentid)}
                onKeyDown={(event) =>
                  handlePlaceCardKeyDown(event, place.title, place.contentid)
                }
              >
                <FavoriteVisual $index={index}>
                  <LevelBadge
                    $variant={
                      category.includes("자연") || category.includes("숲")
                        ? "calm"
                        : "warm"
                    }
                  >
                    {category}
                  </LevelBadge>
                  <FavoriteToggleButton
                    type="button"
                    disabled={isFavoritePending || !place.favoriteId}
                    aria-label={`${place.title} 즐겨찾기 해제`}
                    onClick={(event) => {
                      event.stopPropagation();
                      if (place.favoriteId) {
                        toggleFavorite(place, place.favoriteId);
                      }
                    }}
                  >
                    <Heart size={18} fill="currentColor" />
                  </FavoriteToggleButton>
                </FavoriteVisual>
                <FavoriteBody>
                  <Icon size={30} />
                  <FavoriteTitle>{place.title}</FavoriteTitle>
                  <FavoriteMeta>
                    {[place.addr1, place.addr2].filter(Boolean).join(" ") ||
                      "주소 정보 없음"}
                  </FavoriteMeta>
                  <FavoriteTags>
                    {[place.lclsSystm1Nm, place.lclsSystm2Nm]
                      .filter(Boolean)
                      .map((tag) => `#${tag}`)
                      .join(" ") || "#favorite"}
                  </FavoriteTags>
                </FavoriteBody>
              </FavoriteCard>
            );
          })
        )}

        {!isFavoriteLoading && previewFavoriteSpots.length === 0 && (
          <FavoriteEmptyCard>
            아직 저장된 즐겨찾기 장소가 없습니다.
          </FavoriteEmptyCard>
        )}
      </FavoriteGrid>
    </SectionBlock>
  );
};

const SectionBlock = styled.section`
  scroll-margin-top: 92px;
  padding: 22px;
  border: 1px solid rgba(36, 149, 155, 0.08);
  border-radius: 28px;
  background: rgba(255, 255, 255, 0.84);
  box-shadow: 0 20px 38px rgba(35, 49, 44, 0.05);

  @media (max-width: 768px) {
    padding: 18px;
  }
`;

const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 14px;
  margin-bottom: 16px;

  @media (max-width: 640px) {
    align-items: flex-start;
    flex-direction: column;
  }
`;

const SectionTitle = styled.h3`
  margin: 0;
  color: #24302a;
  font-size: 1.3rem;
  font-weight: 800;
`;

const SectionLink = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  border: 0;
  background: transparent;
  color: ${colors.main};
  font-size: 0.92rem;
  font-weight: 700;
  cursor: pointer;
`;

const FavoriteGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 14px;

  @media (max-width: 960px) {
    grid-template-columns: 1fr;
  }
`;

const FavoriteEmptyCard = styled.article`
  grid-column: 1 / -1;
  padding: 28px 24px;
  border-radius: 24px;
  border: 1px dashed rgba(36, 149, 155, 0.22);
  background: rgba(255, 255, 255, 0.72);
  color: #607069;
  font-size: 0.94rem;
  font-weight: 600;
  text-align: center;
`;

const FavoriteCard = styled.article`
  overflow: hidden;
  border: 1px solid rgba(36, 149, 155, 0.08);
  border-radius: 22px;
  background: #fff;
  cursor: pointer;

  &:focus-visible {
    outline: 2px solid ${colors.main};
    outline-offset: 2px;
  }
`;

const FavoriteVisual = styled.div<{ $index: number }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 16px;
  background: ${({ $index }) =>
    $index % 2 === 0
      ? "linear-gradient(135deg, rgba(36, 149, 155, 0.18), rgba(36, 149, 155, 0.06))"
      : "linear-gradient(135deg, rgba(182, 224, 190, 0.55), rgba(248, 251, 245, 0.95))"};
`;

const FavoriteToggleButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 34px;
  height: 34px;
  padding: 0;
  border: 0;
  border-radius: 999px;
  background: transparent;
  color: #111;
  cursor: pointer;

  &:disabled {
    cursor: wait;
    opacity: 0.5;
  }
`;

const FavoriteBody = styled.div`
  display: grid;
  gap: 8px;
  padding: 18px 16px 20px;
  color: ${colors.main};
`;

const FavoriteTitle = styled.h4`
  margin: 0;
  color: #24302a;
  font-size: 1.08rem;
`;

const FavoriteMeta = styled.p`
  margin: 0;
  color: #7d8a84;
  font-size: 0.9rem;
`;

const FavoriteTags = styled.p`
  margin: 0;
  color: #93a19b;
  font-size: 0.88rem;
  font-weight: 600;
`;

const LevelBadge = styled.span<{ $variant: "calm" | "warm" }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 6px 10px;
  border-radius: 999px;
  background: ${({ $variant }) =>
    $variant === "warm" ? "#ffefe4" : "#e6f7f4"};
  color: ${({ $variant }) => ($variant === "warm" ? "#ef8a3d" : colors.main)};
  font-size: 0.76rem;
  font-weight: 800;
`;
