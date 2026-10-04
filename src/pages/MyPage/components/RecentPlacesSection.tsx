import { ChevronRight, Compass, MapPinned, Trees, Waves } from "lucide-react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import colors from "../../../constants/colors";
import { useGetRecentSearchPlaces } from "../../../hooks/searchHistory/useGetRecentSearchPlaces";
import { formatVisitDateLabel } from "../utils/placeDateLabel";

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

export const RecentPlacesSection = () => {
  const navigate = useNavigate();
  const { data: recentSearchPlaces = [], isLoading: isRecentLoading } =
    useGetRecentSearchPlaces();
  const previewRecentPlaces = recentSearchPlaces.slice(0, 3);

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
    <SectionBlock id="mypage-recent">
      <SectionHeader>
        <SectionTitle>최근 조회한 장소</SectionTitle>
        <SectionLink
          type="button"
          onClick={() => navigate("/mypage/recent-places")}
        >
          전체보기
          <ChevronRight size={16} />
        </SectionLink>
      </SectionHeader>

      <RecentGrid>
        {isRecentLoading ? (
          <RecentEmptyCard>아직 조회한 장소가 없습니다.</RecentEmptyCard>
        ) : (
          previewRecentPlaces.map((place) => {
            const Icon = getRecentPlaceIcon(place.title);

            return (
              <MiniCard
                key={place.historyId}
                role="button"
                tabIndex={0}
                onClick={() => handleMoveToPlace(place.title, place.contentid)}
                onKeyDown={(event) =>
                  handlePlaceCardKeyDown(event, place.title, place.contentid)
                }
              >
                <MiniCardVisual>
                  {place.firstimage ? (
                    <MiniCardImage src={place.firstimage} alt={place.title} />
                  ) : (
                    <Icon size={28} />
                  )}
                </MiniCardVisual>
                <MiniCardText>
                  <MiniCardTitle>{place.title}</MiniCardTitle>
                  <MiniCardMeta>
                    {place.createdAt
                      ? formatVisitDateLabel(
                          place.createdAt.slice(0, 10).replace(/-/g, "."),
                        )
                      : "최근 조회"}
                  </MiniCardMeta>
                  <RecentTags>
                    {[
                      place.lclsSystm1Nm,
                      place.lclsSystm2Nm,
                      place.lclsSystm3Nm,
                    ]
                      .filter(Boolean)
                      .map((tag) => `#${tag}`)
                      .join(" ")}
                  </RecentTags>
                </MiniCardText>
              </MiniCard>
            );
          })
        )}

        {isRecentLoading ? (
          <></>
        ) : !isRecentLoading && previewRecentPlaces.length === 0 ? (
          <RecentEmptyCard>아직 조회한 장소가 없습니다.</RecentEmptyCard>
        ) : (
          <HighlightCard>
            <HighlightNumber>{recentSearchPlaces.length}곳</HighlightNumber>
            <HighlightText>최근 조회한 여행지</HighlightText>
          </HighlightCard>
        )}
      </RecentGrid>
    </SectionBlock>
  );
};

const SectionBlock = styled.section`
  scroll-margin-top: 92px;
  padding: 8px 22px;
  /* border: 1px solid rgba(36, 149, 155, 0.08);
  border-radius: 28px;
  background: rgba(255, 255, 255, 0.84);
  box-shadow: 0 20px 38px rgba(35, 49, 44, 0.05); */

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

const RecentGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 12px;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const MiniCard = styled.article`
  display: grid;
  grid-template-columns: 76px 1fr;
  gap: 16px;
  height: 98px;
  padding: 10px;
  border-radius: 14px;
  background: #fcfaf5;
  border: 1px solid #e9e4da;
  cursor: pointer;

  /* &:focus-visible {
    outline: 2px solid ${colors.main};
    outline-offset: 2px;
  } */

  transition: border-color 0.3s ease;

  &:hover {
    border-color: rgba(12, 151, 153, 0.5);
  }
`;

const MiniCardVisual = styled.div`
  aspect-ratio: 1 / 1;

  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  border-radius: 8px;
  background: linear-gradient(
    180deg,
    rgba(36, 149, 155, 0.12),
    rgba(36, 149, 155, 0.04)
  );
  color: ${colors.main};
`;

const MiniCardImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const MiniCardText = styled.div`
  display: grid;
  align-content: center;
  gap: 8px;
`;

const MiniCardTitle = styled.h4`
  margin: 0 0 2px 0;
  color: #24302a;
  font-size: 1.125rem;
  letter-spacing: -0.5px;
  line-height: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const MiniCardMeta = styled.p`
  margin: 0;
  color: #888;
  font-size: 0.75rem;
  line-height: 1;
`;

const RecentTags = styled.p`
  margin: 0;
  color: #666;
  font-size: 0.75rem;
  font-weight: 500;
  line-height: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const HighlightCard = styled.article`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 7px;

  min-height: 98px;
  padding: 18px;

  border-radius: 16px;
  border: 1px solid rgba(12, 151, 153, 0.18);

  background:
    radial-gradient(
      circle at 100% 0%,
      rgba(255, 255, 255, 0.2),
      transparent 45%
    ),
    linear-gradient(145deg, rgba(12, 151, 153, 0.92), rgba(36, 149, 155, 0.78));

  color: white;
  box-shadow: 0 8px 20px rgba(12, 151, 153, 0.12);
`;

const HighlightNumber = styled.strong`
  font-size: 2.25rem;
  font-weight: 800;
  letter-spacing: -1px;
  line-height: 1;
`;

const HighlightText = styled.p`
  margin: 0;
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.75rem;
  font-weight: 400;
  letter-spacing: -0.2px;
`;

const RecentEmptyCard = styled.article`
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
