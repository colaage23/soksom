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
  const previewRecentPlaces = recentSearchPlaces.slice(0, 2);

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
                  <StatusPill $variant="calm">최근 조회</StatusPill>
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

const RecentGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 14px;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const MiniCard = styled.article`
  display: grid;
  grid-template-columns: 76px 1fr;
  gap: 14px;
  min-height: 154px;
  padding: 16px;
  border-radius: 20px;
  background: linear-gradient(180deg, #fbfdfb 0%, #f6faf7 100%);
  border: 1px solid rgba(36, 149, 155, 0.08);
  cursor: pointer;

  &:focus-visible {
    outline: 2px solid ${colors.main};
    outline-offset: 2px;
  }
`;

const MiniCardVisual = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  border-radius: 18px;
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
  margin: 0;
  color: #24302a;
  font-size: 1.1rem;
`;

const MiniCardMeta = styled.p`
  margin: 0;
  color: #8b9892;
  font-size: 0.88rem;
`;

const StatusPill = styled.span<{ $variant: "calm" | "warm" | "solid" }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: fit-content;
  padding: 6px 10px;
  border-radius: 999px;
  background: ${({ $variant }) => {
    if ($variant === "warm") return "rgba(255, 158, 88, 0.16)";
    if ($variant === "solid") return colors.main;

    return "rgba(36, 149, 155, 0.12)";
  }};
  color: ${({ $variant }) => {
    if ($variant === "warm") return "#ef8a3d";
    if ($variant === "solid") return "white";

    return colors.main;
  }};
  font-size: 0.78rem;
  font-weight: 800;
`;

const HighlightCard = styled.article`
  display: grid;
  align-content: center;
  gap: 12px;
  min-height: 154px;
  padding: 18px;
  border-radius: 20px;
  background: linear-gradient(145deg, #156c6f, ${colors.main});
  color: white;
`;

const HighlightNumber = styled.strong`
  font-size: 3rem;
  line-height: 1;
`;

const HighlightText = styled.p`
  margin: 0;
  color: rgba(255, 255, 255, 0.84);
  font-size: 0.96rem;
  font-weight: 600;
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
