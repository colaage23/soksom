import { ChevronRight, Heart, Plus } from "lucide-react";
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

const PREVIEW_COUNT = 4;

export const FavoritePlacesSection = () => {
  const navigate = useNavigate();
  const { toggleFavorite, isPending: isFavoritePending } = useToggleFavorite();
  const { data: favoriteSpots = [], isLoading: isFavoriteLoading } =
    useGetFavoriteSpots();

  const handleMoveToPlace = (title: string, contentId: string) => {
    const searchParams = new URLSearchParams({ keyword: title });

    if (contentId) {
      searchParams.set("contentId", contentId);
    }

    navigate({ pathname: "/map", search: `?${searchParams.toString()}` });
  };

  const previewFavoriteSpots = favoriteSpots.slice(0, PREVIEW_COUNT);

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
                {/* <FavoriteVisual $index={index}>
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
                      </FavoriteVisual> */}
                <FavoriteImage src={placeImage} alt="" />
                <FavoriteBody>
                  <FavoriteTop>
                    <FavoriteInfo>
                      <FavoriteMeta>
                        {place.addr1.split(" ").splice(1).join(" ") ||
                          "주소 정보 없음"}
                      </FavoriteMeta>

                      <FavoriteTitle>{place.title}</FavoriteTitle>
                    </FavoriteInfo>

                    <IconButton
                      type="button"
                      disabled={isFavoritePending || !place.favoriteId}
                      onClick={(event) => {
                        event.stopPropagation();
                        if (place.favoriteId) {
                          toggleFavorite(place, place.favoriteId);
                        }
                      }}
                    >
                      <LikeIcon />
                    </IconButton>
                  </FavoriteTop>

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

        {!isFavoriteLoading && previewFavoriteSpots.length >= 0 && (
          <AddPlaceCard type="button" onClick={() => navigate("/map")}>
            <AddIcon aria-hidden>
              <Plus size={18} strokeWidth={3} />
            </AddIcon>
            장소 더 찾아보기
          </AddPlaceCard>
        )}
      </FavoriteGrid>
    </SectionBlock>
  );
};

const SectionBlock = styled.section`
  scroll-margin-top: 92px;
  padding: 22px;
  /* border: 1px solid rgba(36, 149, 155, 0.08);
  border-radius: 28px;
  background: rgba(255, 255, 255, 0.84);
  box-shadow: 0 20px 38px rgba(35, 49, 44, 0.05); */

  @media (max-width: 640px) {
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
  font-weight: 700;
`;

const SectionLink = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  border: 0;
  background: transparent;
  color: ${colors.main};
  font-size: 0.92rem;
  font-weight: 600;
  cursor: pointer;

  svg {
    transition: transform 0.2s ease;
  }

  &:hover svg {
    transform: translateX(4px);
  }
`;

const AddPlaceCard = styled.button`
  height: 340px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 24px;
  border: 1px dashed rgba(12, 151, 153, 0.3);
  border-radius: 14px;
  background: rgba(252, 250, 245, 0.5);
  color: #7d8a84;
  font: inherit;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition:
    border-color 0.2s ease,
    color 0.2s ease;

  &:hover {
    border: 1px dashed rgba(12, 151, 153, 0.5);
    color: ${colors.main};
  }

  &:focus-visible {
    outline: 2px solid ${colors.main};
    outline-offset: 2px;
  }

  @media (max-width: 1024px) {
    height: 191px;
    flex-direction: row;
    padding: 16px;
  }
`;

const AddIcon = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 18px;
  background: rgba(12, 151, 153, 0.08);
  color: ${colors.main};
`;

const FavoriteGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 12px;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
  @media (max-width: 640px) {
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
  border-radius: 14px;
  background: #fffefc;
  border: 1px solid #e9e4da;
  cursor: pointer;

  transition: border-color 0.3s ease;

  &:focus-visible {
    outline: 2px solid ${colors.main};
    outline-offset: 2px;
  }

  &:hover {
    border-color: rgba(12, 151, 153, 0.5);
  }
`;

// const FavoriteVisual = styled.div<{ $index: number }>`
//   display: flex;
//   align-items: center;
//   justify-content: space-between;
//   padding: 14px 16px;
//   background: ${({ $index }) =>
//     $index === 0
//       ? "linear-gradient(135deg, rgba(155, 212, 239, 0.6), rgba(241, 250, 255, 0.95))"
//       : "linear-gradient(135deg, rgba(196, 239, 170, 0.6), rgba(248, 252, 244, 0.95))"};
// `;

// const FavoriteToggleButton = styled.button`
//   display: inline-flex;
//   align-items: center;
//   justify-content: center;
//   width: 18px;
//   height: 18px;
//   padding: 0;
//   border: 0;
//   border-radius: 999px;
//   background: transparent;
//   color: #111;
//   cursor: pointer;

//   &:disabled {
//     cursor: wait;
//     opacity: 0.5;
//   }
// `;

const FavoriteBody = styled.div`
  height: 100px;
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 16px;

  @media (max-width: 640px) {
    height: fit-content;
    padding: 14px;
  }
`;

const FavoriteTop = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
`;

const FavoriteInfo = styled.div`
  min-width: 0;
`;

const FavoriteTitle = styled.h4`
  margin: 0;
  padding: 4px 0;
  color: #222;
  font-size: 1.5rem;
  font-family: Gowun Batang;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 1.2;
  @media (max-width: 640px) {
    font-size: 1.25rem;
  }
`;

const FavoriteImage = styled.img`
  display: block;
  width: 100%;
  height: 240px;
  object-fit: cover;

  @media (max-width: 1024px) {
    height: 140px;
  }
  @media (max-width: 640px) {
    height: 100px;
  }
`;

const FavoriteMeta = styled.p`
  margin: 0;
  color: #888;
  font-size: 0.75rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  @media (max-width: 640px) {
    font-size: 0.65rem;
  }
`;

const FavoriteTags = styled.p`
  margin: 0;
  color: #666;
  font-size: 0.75rem;
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  @media (max-width: 640px) {
    font-size: 0.65rem;
  }
`;

const LikeIcon = styled(Heart)<{ $active?: boolean }>`
  width: 18px;
  height: 18px;

  stroke: #fdfcf8;
  fill: #fdfcf8;

  stroke-width: 2;
`;

const IconButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 42px;
  height: 42px;
  flex: 0 0 auto;

  align-self: start;

  border: 1px solid #f77036;
  border-radius: 999px;

  background: #f77036;

  color: #fdfcf8;

  box-shadow: 0 10px 18px rgba(35, 49, 44, 0.06);

  cursor: pointer;

  transition:
    background-color 0.2s ease,
    border-color 0.2s ease,
    color 0.2s ease;

  svg {
    fill: #fdfcf8;
    transition:
      fill 0.2s ease,
      stroke 0.2s ease;
  }

  &:hover {
    border-color: #f7703633;
    background: rgba(247, 112, 54, 0.165);
    color: #f77036;
  }

  &:hover svg {
    fill: #f77036;
    stroke: #f77036;
  }

  &:disabled {
    cursor: wait;
    opacity: 0.6;
  }
`;
