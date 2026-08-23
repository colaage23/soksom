import {
  CalendarDays,
  ChevronRight,
  Compass,
  Heart,
  LogOut,
  MapPinned,
  Trees,
  Waves,
} from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import colors from "../../constants/colors";
import { useGetFavoriteSpots } from "../../hooks/favorite/useGetFavoriteSpots";
import { useGetRecentSearchPlaces } from "../../hooks/searchHistory/useGetRecentSearchPlaces";
import { useGetTrips } from "../../hooks/trip/useGetTrips";
import type { ITrip } from "../../types/trip";
import { formatVisitDateLabel } from "./utils/placeDateLabel";

const SIDEBAR_LIST_TOP = 96;

const tripFilterOptions = ["전체", "진행 예정", "지난 여행"] as const;

const sidebarSections = [
  { id: "recent", label: "최근 방문 장소", icon: MapPinned },
  { id: "favorites", label: "즐겨찾기", icon: Heart },
  { id: "trips", label: "여행 일정", icon: CalendarDays },
  //   { id: "taste", label: "여행 선호도 분석", icon: Sparkles },
] as const;

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

const parseTripDate = (value?: string) => {
  if (!value) return null;

  const normalized = value.slice(0, 10).replace(/\./g, "-");
  const parsedDate = new Date(normalized);

  if (Number.isNaN(parsedDate.getTime())) {
    return null;
  }

  parsedDate.setHours(0, 0, 0, 0);
  return parsedDate;
};

const formatTripDateRange = (startDate: string, endDate: string) => {
  const startLabel = startDate
    ? startDate.slice(0, 10).replace(/-/g, ".")
    : "날짜 미정";
  const endLabel = endDate
    ? endDate.slice(0, 10).replace(/-/g, ".")
    : startLabel;

  return `${startLabel} - ${endLabel}`;
};

const getTripDayCount = (startDate: string, endDate: string) => {
  const start = parseTripDate(startDate);
  const end = parseTripDate(endDate);

  if (!start || !end) {
    return null;
  }

  const diffTime = end.getTime() - start.getTime();
  return Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1;
};

const getTripIcon = (trip: ITrip) => {
  const category = trip.details
    .flatMap((detail) => [
      detail.lclsSystm3Nm,
      detail.lclsSystm2Nm,
      detail.lclsSystm1Nm,
    ])
    .find(Boolean);

  if (category) {
    return getFavoriteIcon(category);
  }

  const firstTitle = trip.details.find((detail) => detail.title)?.title;
  if (firstTitle) {
    return getRecentPlaceIcon(firstTitle);
  }

  return MapPinned;
};

const getTripTone = (trip: ITrip) => {
  const dayCount = getTripDayCount(trip.startDate, trip.endDate) ?? 1;
  return trip.details.length / dayCount <= 2 ? "여유로움" : "보통";
};

const getTripTimelineSteps = (trip: ITrip) =>
  [...trip.details]
    .sort(
      (left, right) =>
        Number(left.visitOrder || 0) - Number(right.visitOrder || 0),
    )
    .slice(0, 4)
    .map((detail, index) => {
      const orderLabel = detail.visitOrder
        ? `${detail.visitOrder}순위`
        : `${index + 1}번째`;
      return `${orderLabel} ${detail.title}`;
    });

const Mypage = () => {
  const navigate = useNavigate();
  const { data: favoriteSpots = [], isLoading: isFavoriteLoading } =
    useGetFavoriteSpots();
  const { data: recentSearchPlaces = [], isLoading: isRecentLoading } =
    useGetRecentSearchPlaces();
  const {
    data: tripList,
    isLoading: isTripLoading,
    isError: isTripError,
  } = useGetTrips({ pageNo: 1, numOfRows: 20 });
  const previewRecentPlaces = recentSearchPlaces.slice(0, 2);
  const previewFavoriteSpots = favoriteSpots.slice(0, 3);
  const [selectedSection, setSelectedSection] =
    useState<(typeof sidebarSections)[number]["id"]>("recent");
  const [selectedTripFilter, setSelectedTripFilter] =
    useState<(typeof tripFilterOptions)[number]>("전체");
  const [isSidebarListPinned, setIsSidebarListPinned] = useState(false);
  const [sidebarListLeft, setSidebarListLeft] = useState(0);
  const [sidebarListWidth, setSidebarListWidth] = useState(0);
  const [sidebarListHeight, setSidebarListHeight] = useState(0);
  const sidebarRef = useRef<HTMLElement | null>(null);
  const sidebarListSlotRef = useRef<HTMLDivElement | null>(null);
  const sidebarListRef = useRef<HTMLDivElement | null>(null);

  const scrollToSection = (
    sectionId: (typeof sidebarSections)[number]["id"],
  ) => {
    setSelectedSection(sectionId);
    document
      .getElementById(`mypage-${sectionId}`)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  useEffect(() => {
    const updateSidebarListPosition = () => {
      const sidebarElement = sidebarRef.current;
      const sidebarListSlotElement = sidebarListSlotRef.current;
      const sidebarListElement = sidebarListRef.current;

      if (!sidebarElement || !sidebarListSlotElement || !sidebarListElement) {
        return;
      }

      if (window.innerWidth <= 980) {
        setIsSidebarListPinned(false);
        setSidebarListLeft(0);
        setSidebarListWidth(0);
        setSidebarListHeight(0);

        return;
      }

      const sidebarRect = sidebarElement.getBoundingClientRect();
      const slotRect = sidebarListSlotElement.getBoundingClientRect();

      setSidebarListLeft(slotRect.left);
      setSidebarListWidth(sidebarRect.width);
      setSidebarListHeight(sidebarListElement.offsetHeight);
      setIsSidebarListPinned(slotRect.top <= SIDEBAR_LIST_TOP);
    };

    updateSidebarListPosition();
    window.addEventListener("scroll", updateSidebarListPosition, {
      passive: true,
    });
    window.addEventListener("resize", updateSidebarListPosition);

    return () => {
      window.removeEventListener("scroll", updateSidebarListPosition);
      window.removeEventListener("resize", updateSidebarListPosition);
    };
  }, []);

  const sortedTrips = useMemo(() => {
    const trips = tripList?.content ?? [];

    return [...trips].sort((left, right) => {
      const leftTime =
        parseTripDate(left.startDate)?.getTime() ?? Number.MAX_SAFE_INTEGER;
      const rightTime =
        parseTripDate(right.startDate)?.getTime() ?? Number.MAX_SAFE_INTEGER;
      return leftTime - rightTime;
    });
  }, [tripList?.content]);

  const { currentTrip, upcomingTrips, pastTrips } = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const current: ITrip[] = [];
    const upcoming: ITrip[] = [];
    const past: ITrip[] = [];

    sortedTrips.forEach((trip) => {
      const start = parseTripDate(trip.startDate);
      const end = parseTripDate(trip.endDate) ?? start;

      if (!start || !end) {
        upcoming.push(trip);
        return;
      }

      if (end.getTime() < today.getTime()) {
        past.push(trip);
        return;
      }

      if (
        start.getTime() <= today.getTime() &&
        end.getTime() >= today.getTime()
      ) {
        current.push(trip);
        return;
      }

      upcoming.push(trip);
    });

    return {
      currentTrip: current[0] ?? null,
      upcomingTrips: upcoming,
      pastTrips: [...past].sort((left, right) => {
        const leftTime = parseTripDate(left.endDate)?.getTime() ?? 0;
        const rightTime = parseTripDate(right.endDate)?.getTime() ?? 0;
        return rightTime - leftTime;
      }),
    };
  }, [sortedTrips]);

  const showCurrentTrip = selectedTripFilter === "전체" && Boolean(currentTrip);
  const visibleTrips =
    selectedTripFilter === "지난 여행" ? pastTrips : upcomingTrips;
  const showAddTripCard = selectedTripFilter !== "지난 여행";
  const selectedTripFilterIndex = tripFilterOptions.indexOf(selectedTripFilter);
  const currentTripSteps = currentTrip ? getTripTimelineSteps(currentTrip) : [];

  return (
    <PageShell>
      <PageInner>
        <DashboardGrid>
          <Sidebar ref={sidebarRef}>
            <ProfileCard>
              <AvatarCircle>김</AvatarCircle>
              <ProfileName>김여행</ProfileName>
              <ProfileEmail>travel@email.com</ProfileEmail>
            </ProfileCard>
            <SidebarListSlot
              ref={sidebarListSlotRef}
              $height={isSidebarListPinned ? sidebarListHeight : undefined}
            >
              <SidebarList
                ref={sidebarListRef}
                $pinned={isSidebarListPinned}
                $left={sidebarListLeft}
                $width={sidebarListWidth}
              >
                {sidebarSections.map((section) => {
                  const Icon = section.icon;

                  return (
                    <SidebarButton
                      key={section.id}
                      type="button"
                      $active={selectedSection === section.id}
                      onClick={() => scrollToSection(section.id)}
                    >
                      <Icon size={17} />
                      <span>{section.label}</span>
                    </SidebarButton>
                  );
                })}

                <SidebarLogout type="button" $active={false}>
                  <LogOut size={17} />
                  <span>로그아웃</span>
                </SidebarLogout>
              </SidebarList>
            </SidebarListSlot>
          </Sidebar>

          <ContentColumn>
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
                  <RecentEmptyCard>
                    아직 조회한 장소가 없습니다.
                  </RecentEmptyCard>
                ) : (
                  previewRecentPlaces.map((place) => {
                    const Icon = getRecentPlaceIcon(place.title);

                    return (
                      <MiniCard key={place.historyId}>
                        <MiniCardVisual>
                          {place.firstimage ? (
                            <MiniCardImage
                              src={place.firstimage}
                              alt={place.title}
                            />
                          ) : (
                            <Icon size={28} />
                          )}
                        </MiniCardVisual>
                        <MiniCardText>
                          <MiniCardTitle>{place.title}</MiniCardTitle>
                          <MiniCardMeta>
                            {place.createdAt
                              ? formatVisitDateLabel(
                                  place.createdAt
                                    .slice(0, 10)
                                    .replace(/-/g, "."),
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
                  <RecentEmptyCard>
                    아직 조회한 장소가 없습니다.
                  </RecentEmptyCard>
                ) : (
                  <HighlightCard>
                    <HighlightNumber>
                      {recentSearchPlaces.length}곳
                    </HighlightNumber>
                    <HighlightText>최근 조회한 여행지</HighlightText>
                  </HighlightCard>
                )}
              </RecentGrid>
            </SectionBlock>

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
                      <FavoriteCard key={place.contentid}>
                        <FavoriteVisual $index={index}>
                          <LevelBadge
                            $variant={
                              category.includes("자연") ||
                              category.includes("숲")
                                ? "calm"
                                : "warm"
                            }
                          >
                            {category}
                          </LevelBadge>
                          <Heart size={18} fill="#111" color="#111" />
                        </FavoriteVisual>
                        <FavoriteBody>
                          <Icon size={30} />
                          <FavoriteTitle>{place.title}</FavoriteTitle>
                          <FavoriteMeta>
                            {[place.addr1, place.addr2]
                              .filter(Boolean)
                              .join(" ") || "주소 정보 없음"}
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

            <SectionBlock id="mypage-trips">
              <SectionHeader>
                <SectionTitle>나의 여행 일정</SectionTitle>
                <SegmentedTabs>
                  <SegmentIndicator $selectedIndex={selectedTripFilterIndex} />
                  {tripFilterOptions.map((filter) => (
                    <SegmentChip
                      key={filter}
                      type="button"
                      $active={selectedTripFilter === filter}
                      onClick={() => setSelectedTripFilter(filter)}
                    >
                      {filter}
                    </SegmentChip>
                  ))}
                </SegmentedTabs>
              </SectionHeader>

              {showCurrentTrip && currentTrip && (
                <CurrentTripCard>
                  <CurrentTripHeader>
                    <StatusPill $variant="solid">진행 중</StatusPill>
                    <CurrentTripTitle>{currentTrip.tripName}</CurrentTripTitle>
                    <CurrentTripDate>
                      {formatTripDateRange(
                        currentTrip.startDate,
                        currentTrip.endDate,
                      )}
                      {(() => {
                        const dayCount = getTripDayCount(
                          currentTrip.startDate,
                          currentTrip.endDate,
                        );
                        return dayCount ? ` (${dayCount}일)` : "";
                      })()}
                    </CurrentTripDate>
                  </CurrentTripHeader>
                  <CurrentTripFooter>
                    <CurrentTripMeta>
                      총 {currentTrip.details.length}개의 장소
                    </CurrentTripMeta>
                    <CurrentTripMeta>
                      {currentTrip.isAiRoute === "Y" ||
                      currentTrip.isAiRoute === "true"
                        ? "AI 추천 일정"
                        : "직접 만든 일정"}
                    </CurrentTripMeta>
                  </CurrentTripFooter>
                  <TimelineRow>
                    {currentTripSteps.map((step) => (
                      <TimelineChip key={step}>{step}</TimelineChip>
                    ))}
                  </TimelineRow>
                </CurrentTripCard>
              )}

              <UpcomingGrid>
                {isTripLoading && (
                  <TripEmptyCard>여행 일정을 불러오는 중입니다.</TripEmptyCard>
                )}
                {isTripError && !isTripLoading && (
                  <TripEmptyCard>
                    여행 일정을 불러오지 못했습니다.
                  </TripEmptyCard>
                )}
                {!isTripLoading &&
                  !isTripError &&
                  visibleTrips.map((trip, index) => {
                    const Icon = getTripIcon(trip);
                    const tripTone = getTripTone(trip);

                    return (
                      <UpcomingCard key={trip.tripId}>
                        <UpcomingVisual $index={index}>
                          <LevelBadge
                            $variant={tripTone === "여유로움" ? "calm" : "warm"}
                          >
                            {tripTone}
                          </LevelBadge>
                        </UpcomingVisual>
                        <UpcomingBody>
                          <Icon size={28} />
                          <UpcomingTitle>{trip.tripName}</UpcomingTitle>
                          <UpcomingMeta>
                            {formatTripDateRange(trip.startDate, trip.endDate)}
                          </UpcomingMeta>
                          <UpcomingMeta>
                            {trip.details.length}개 장소
                          </UpcomingMeta>
                        </UpcomingBody>
                      </UpcomingCard>
                    );
                  })}

                {!isTripLoading &&
                  !isTripError &&
                  visibleTrips.length === 0 && (
                    <TripEmptyCard>
                      {selectedTripFilter === "지난 여행"
                        ? "지난 여행 일정이 없습니다."
                        : "예정된 여행 일정이 없습니다."}
                    </TripEmptyCard>
                  )}

                {showAddTripCard && (
                  <AddTripCard type="button">
                    <AddCircle>+</AddCircle>
                    일정 추가하기
                  </AddTripCard>
                )}
              </UpcomingGrid>
            </SectionBlock>

            {/* <SectionBlock id="mypage-taste">
              <SectionHeader>
                <SectionTitle>여행 선호도 분석</SectionTitle>
              </SectionHeader>

              <PreferenceCard>
                <PreferenceTextGroup>
                  <PreferenceTitle>
                    최근 방문 데이터를 기반으로 한 당신의 여행 스타일입니다.
                  </PreferenceTitle>
                  <PreferenceSubtitle>
                    복잡한 도심보다 바람, 숲길, 해안 산책 루트를 훨씬 더 자주
                    고릅니다.
                  </PreferenceSubtitle>
                </PreferenceTextGroup>
                <PreferenceStats>
                  <PreferenceValue>
                    <strong>85%</strong>
                    <span>자연 지향</span>
                  </PreferenceValue>
                  <PreferenceValue $accent>
                    <strong>15%</strong>
                    <span>도심 밀집</span>
                  </PreferenceValue>
                </PreferenceStats>
                <PreferenceBar>
                  <PreferenceFill />
                </PreferenceBar>
              </PreferenceCard>
            </SectionBlock> */}
          </ContentColumn>
        </DashboardGrid>
      </PageInner>
    </PageShell>
  );
};

export default Mypage;

const PageShell = styled.div`
  position: relative;
  overflow-x: hidden;
  overflow-y: visible;
  min-height: calc(100vh - 72px);
  padding: 24px 20px 72px;
  background:
    radial-gradient(
      circle at top left,
      rgba(36, 149, 155, 0.16),
      transparent 28%
    ),
    linear-gradient(180deg, #f5f7f4 0%, #f8faf7 52%, #f1f5f1 100%);

  @media (max-width: 768px) {
    padding: 16px 12px 48px;
  }
`;

const PageInner = styled.div`
  position: relative;
  z-index: 1;
  max-width: 1280px;
  margin: 0 auto;
`;

const ProfileCard = styled.article`
  display: grid;
  justify-items: center;
  gap: 10px;
  width: 100%;
  max-width: 280px;
  padding: 28px 22px;
  border: 1px solid rgba(36, 149, 155, 0.1);
  border-radius: 24px;
  background: rgba(255, 255, 255, 0.82);
  box-shadow: 0 20px 40px rgba(35, 49, 44, 0.06);

  @media (max-width: 980px) {
    max-width: none;
  }
`;

const AvatarCircle = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 62px;
  height: 62px;
  border-radius: 999px;
  background: linear-gradient(145deg, ${colors.main}, #1f7f84);
  color: white;
  font-size: 2rem;
  font-weight: 700;
`;

const ProfileName = styled.h2`
  margin: 0;
  color: #24302a;
  font-size: 1.9rem;
  font-family: Gowun Batang;
`;

const ProfileEmail = styled.p`
  margin: -2px 0 0;
  color: #90a099;
  font-size: 0.95rem;
`;

const DashboardGrid = styled.div`
  display: grid;
  grid-template-columns: 280px minmax(0, 1fr);
  gap: 18px;
  align-items: start;

  @media (max-width: 980px) {
    grid-template-columns: 1fr;
  }
`;

const Sidebar = styled.aside`
  display: grid;
  gap: 16px;
  align-self: start;
`;

const SidebarListSlot = styled.div<{ $height?: number }>`
  min-height: ${({ $height }) => ($height ? `${$height}px` : "auto")};

  @media (max-width: 980px) {
    display: none;
    min-height: auto;
  }
`;

const SidebarList = styled.div<{
  $pinned: boolean;
  $left: number;
  $width: number;
}>`
  position: ${({ $pinned }) => ($pinned ? "fixed" : "relative")};
  top: ${({ $pinned }) => ($pinned ? `${SIDEBAR_LIST_TOP}px` : "auto")};
  left: ${({ $pinned, $left }) => ($pinned ? `${$left}px` : "auto")};
  width: ${({ $pinned, $width }) => ($pinned ? `${$width}px` : "100%")};
  z-index: ${({ $pinned }) => ($pinned ? 10 : 1)};
  overflow: hidden;
  border: 1px solid rgba(36, 149, 155, 0.08);
  border-radius: 24px;
  background: rgba(255, 255, 255, 0.84);
  box-shadow: 0 18px 34px rgba(35, 49, 44, 0.05);

  @media (max-width: 980px) {
    position: relative;
    top: auto;
    left: auto;
    width: 100%;
  }
`;

const SidebarButton = styled.button<{ $active: boolean }>`
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  padding: 16px 18px;
  border: 0;
  border-bottom: 1px solid rgba(36, 149, 155, 0.06);
  background: ${({ $active }) =>
    $active ? "rgba(36, 149, 155, 0.08)" : "transparent"};
  color: ${({ $active }) => ($active ? colors.main : "#65716b")};
  font-size: 0.95rem;
  font-weight: 700;
  text-align: left;
  cursor: pointer;
`;

const SidebarLogout = styled(SidebarButton)`
  color: #ef6a56;
  border-bottom: 0;
`;

const ContentColumn = styled.div`
  display: grid;
  gap: 18px;
`;

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

const SegmentedTabs = styled.div`
  position: relative;
  display: inline-flex;
  align-items: center;
  flex: 0 0 auto;
  padding: 0px 4px;
  border-radius: 999px;
  background: #f3f6f2;
`;

const SegmentIndicator = styled.div<{ $selectedIndex: number }>`
  position: absolute;
  top: 4px;
  left: 4px;
  width: calc((100% - 8px) / 3);
  height: calc(100% - 8px);
  border-radius: 999px;
  background: ${colors.main};
  transform: translateX(${({ $selectedIndex }) => `${$selectedIndex * 100}%`});
  transition: transform 0.25s cubic-bezier(0.4, 0, 0.2, 1);
`;

const SegmentChip = styled.button<{ $active?: boolean }>`
  position: relative;
  z-index: 1;
  flex: 1;
  min-width: 60px;
  padding: 12px 14px;
  border: 0;
  border-radius: 999px;
  background: transparent;
  color: ${({ $active }) => ($active ? "white" : "#7d8782")};
  font-size: 0.82rem;
  font-weight: 600;
  white-space: nowrap;
  cursor: pointer;
`;

const CurrentTripCard = styled.article`
  overflow: hidden;
  margin-bottom: 14px;
  border-radius: 22px;
  border: 1px solid rgba(36, 149, 155, 0.08);
  background: white;
`;

const CurrentTripHeader = styled.div`
  display: grid;
  gap: 10px;
  padding: 18px 18px 22px;
  background: linear-gradient(145deg, #1e7e83, ${colors.main});
  color: white;
`;

const CurrentTripTitle = styled.h4`
  margin: 0;
  font-size: 1.6rem;
  font-family: Gowun Batang;
`;

const CurrentTripDate = styled.p`
  margin: 0;
  color: rgba(255, 255, 255, 0.82);
  font-size: 0.92rem;
`;

const CurrentTripFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 16px 18px 12px;

  @media (max-width: 640px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const CurrentTripMeta = styled.span`
  color: #607069;
  font-size: 0.92rem;
  font-weight: 700;
`;

const TimelineRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  padding: 0 18px 18px;
`;

const TimelineChip = styled.span`
  display: inline-flex;
  align-items: center;
  padding: 8px 12px;
  border-radius: 12px;
  background: #f4f7f5;
  color: #6d7873;
  font-size: 0.84rem;
  font-weight: 700;
`;

const UpcomingGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 14px;

  @media (max-width: 960px) {
    grid-template-columns: 1fr;
  }
`;

const TripEmptyCard = styled.article`
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

const UpcomingCard = styled.article`
  overflow: hidden;
  border: 1px solid rgba(36, 149, 155, 0.08);
  border-radius: 20px;
  background: white;
`;

const UpcomingVisual = styled.div<{ $index: number }>`
  display: flex;
  justify-content: flex-start;
  padding: 14px 16px;
  background: ${({ $index }) =>
    $index === 0
      ? "linear-gradient(135deg, rgba(155, 212, 239, 0.6), rgba(241, 250, 255, 0.95))"
      : "linear-gradient(135deg, rgba(196, 239, 170, 0.6), rgba(248, 252, 244, 0.95))"};
`;

const UpcomingBody = styled.div`
  display: grid;
  gap: 8px;
  padding: 16px;
  color: ${colors.main};
`;

const UpcomingTitle = styled.h4`
  margin: 0;
  color: #24302a;
  font-size: 1rem;
`;

const UpcomingMeta = styled.p`
  margin: 0;
  color: #7f8d86;
  font-size: 0.9rem;
`;

const AddTripCard = styled.button`
  display: grid;
  place-items: center;
  gap: 12px;
  min-height: 100%;
  padding: 18px;
  border: 1px dashed rgba(36, 149, 155, 0.18);
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.66);
  color: #8b9892;
  font-size: 0.95rem;
  font-weight: 700;
  cursor: pointer;

  @media (max-width: 960px) {
    min-height: 140px;
  }
`;

const AddCircle = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 999px;
  background: rgba(36, 149, 155, 0.1);
  color: ${colors.main};
  font-size: 1.4rem;
`;

// 여행 선호도 분석 디자인
// const PreferenceCard = styled.article`
//   display: grid;
//   gap: 18px;
//   padding: 22px;
//   border-radius: 24px;
//   background: linear-gradient(180deg, #ffffff 0%, #f7fbf8 100%);
//   border: 1px solid rgba(36, 149, 155, 0.08);
// `;

// const PreferenceTextGroup = styled.div`
//   display: grid;
//   gap: 8px;
// `;

// const PreferenceTitle = styled.p`
//   margin: 0;
//   color: #24302a;
//   font-size: 1.05rem;
//   font-weight: 700;
// `;

// const PreferenceSubtitle = styled.p`
//   margin: 0;
//   color: #7e8a85;
//   font-size: 0.95rem;
//   line-height: 1.7;
// `;

// const PreferenceStats = styled.div`
//   display: flex;
//   align-items: baseline;
//   justify-content: flex-end;
//   gap: 20px;

//   @media (max-width: 640px) {
//     justify-content: flex-start;
//   }
// `;

// const PreferenceValue = styled.div<{ $accent?: boolean }>`
//   display: grid;
//   gap: 4px;
//   color: ${({ $accent }) => ($accent ? "#ef9a47" : colors.main)};

//   strong {
//     font-size: 2.2rem;
//     line-height: 1;
//   }

//   span {
//     font-size: 0.88rem;
//     font-weight: 700;
//   }
// `;

// const PreferenceBar = styled.div`
//   width: 100%;
//   height: 10px;
//   border-radius: 999px;
//   background: #e6ece8;
// `;

// const PreferenceFill = styled.div`
//   width: 85%;
//   height: 100%;
//   border-radius: inherit;
//   background: linear-gradient(90deg, #1a7175 0%, ${colors.main} 100%);
// `;
