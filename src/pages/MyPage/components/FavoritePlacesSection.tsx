import { ChevronRight, Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import colors from "../../../constants/colors";
import { useGetFavoriteSpots } from "../../../hooks/favorite/useGetFavoriteSpots";
import { useToggleFavorite } from "../../../hooks/favorite/useToggleFavorite";

const temporaryFavoriteImages = [
  "https://images.unsplash.com/photo-1530789253388-582c481c54b0?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80",
];

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
            const placeImage =
              place.firstimage ??
              temporaryFavoriteImages[index % temporaryFavoriteImages.length];

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
                  <FavoriteVisualTitle>{place.title}</FavoriteVisualTitle>
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
                <FavoriteImage src={placeImage} alt="" />
                <FavoriteBody>
                  <FavoriteMeta>
                    {[place.addr1, place.addr2].filter(Boolean).join(" ") ||
                      "주소 정보 없음"}
                  </FavoriteMeta>
                  <FavoriteTags>
                    {[
                      place.lclsSystm1Nm,
                      place.lclsSystm2Nm,
                      place.lclsSystm3Nm,
                    ]
                      .filter(Boolean)
                      .map((tag) => `#${tag}`)
                      .join(" ")}
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
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border: 1px solid rgba(36, 149, 155, 0.08);
  border-radius: 20px;
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
    $index === 0
      ? "linear-gradient(135deg, rgba(155, 212, 239, 0.6), rgba(241, 250, 255, 0.95))"
      : "linear-gradient(135deg, rgba(196, 239, 170, 0.6), rgba(248, 252, 244, 0.95))"};
`;

const FavoriteVisualTitle = styled.h4`
  margin: 0;
  color: #24302a;
  font-size: 1rem;
`;

const FavoriteToggleButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 18px;
  height: 18px;
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
  flex: 1;
  gap: 8px;
  padding: 16px;
  color: ${colors.main};
`;

const FavoriteImage = styled.img`
  display: block;
  width: 100%;
  height: 120px;
  object-fit: cover;
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
