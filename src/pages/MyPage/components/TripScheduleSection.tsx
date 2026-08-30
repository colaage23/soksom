import { Compass, Ellipsis, MapPinned, Trees, Waves } from "lucide-react";
import { useMemo, useState } from "react";
import styled from "styled-components";
import colors from "../../../constants/colors";
import {
  useGetNextTrips,
  useGetPreviousTrips,
  useGetTrips,
} from "../../../hooks/trip/useGetTrips";
import type { ITrip } from "../../../types/trip";

const tripFilterOptions = ["전체", "진행 예정", "지난 여행"] as const;

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

export const TripScheduleSection = () => {
  const [selectedTripFilter, setSelectedTripFilter] =
    useState<(typeof tripFilterOptions)[number]>("전체");
  const tripListParams = { pageNo: 1, numOfRows: 20 };
  const {
    data: tripList,
    isLoading: isAllTripLoading,
    isError: isAllTripError,
  } = useGetTrips(tripListParams);
  const {
    data: nextTripList,
    isLoading: isNextTripLoading,
    isError: isNextTripError,
  } = useGetNextTrips(tripListParams);
  const {
    data: previousTripList,
    isLoading: isPreviousTripLoading,
    isError: isPreviousTripError,
  } = useGetPreviousTrips(tripListParams);

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

  const currentTrips = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return sortedTrips.filter((trip) => {
      const start = parseTripDate(trip.startDate);
      const end = parseTripDate(trip.endDate) ?? start;

      return Boolean(
        start &&
        end &&
        start.getTime() <= today.getTime() &&
        end.getTime() >= today.getTime(),
      );
    });
  }, [sortedTrips]);

  const upcomingTrips = useMemo(
    () =>
      [...(nextTripList?.content ?? [])].sort((left, right) => {
        const leftTime =
          parseTripDate(left.startDate)?.getTime() ?? Number.MAX_SAFE_INTEGER;
        const rightTime =
          parseTripDate(right.startDate)?.getTime() ?? Number.MAX_SAFE_INTEGER;
        return leftTime - rightTime;
      }),
    [nextTripList?.content],
  );

  const pastTrips = useMemo(
    () =>
      [...(previousTripList?.content ?? [])].sort((left, right) => {
        const leftTime = parseTripDate(left.endDate)?.getTime() ?? 0;
        const rightTime = parseTripDate(right.endDate)?.getTime() ?? 0;
        return rightTime - leftTime;
      }),
    [previousTripList?.content],
  );

  const showCurrentTrips =
    selectedTripFilter === "전체" && currentTrips.length > 0;
  const visibleTrips =
    selectedTripFilter === "지난 여행" ? pastTrips : upcomingTrips;
  const isTripLoading =
    selectedTripFilter === "전체"
      ? isAllTripLoading || isNextTripLoading || isPreviousTripLoading
      : selectedTripFilter === "지난 여행"
        ? isPreviousTripLoading
        : isNextTripLoading;
  const isTripError =
    selectedTripFilter === "전체"
      ? isAllTripError || isNextTripError || isPreviousTripError
      : selectedTripFilter === "지난 여행"
        ? isPreviousTripError
        : isNextTripError;
  const selectedTripFilterIndex = tripFilterOptions.indexOf(selectedTripFilter);

  const renderTripCard = (trip: ITrip, index: number) => {
    const Icon = getTripIcon(trip);
    const tripTone = getTripTone(trip);

    return (
      <UpcomingCard key={trip.tripId}>
        <UpcomingVisual $index={index}>
          <LevelBadge $variant={tripTone === "여유로움" ? "calm" : "warm"}>
            {tripTone}
          </LevelBadge>
        </UpcomingVisual>
        <UpcomingBody>
          <Icon size={28} />
          <UpcomingTitle>{trip.tripName}</UpcomingTitle>
          <UpcomingMeta>
            {formatTripDateRange(trip.startDate, trip.endDate)}
          </UpcomingMeta>
          <UpcomingMeta>{trip.details.length}개 장소</UpcomingMeta>
        </UpcomingBody>
      </UpcomingCard>
    );
  };

  return (
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

      {showCurrentTrips &&
        currentTrips.map((currentTrip) => (
          <CurrentTripCard key={currentTrip.tripId}>
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
              {getTripTimelineSteps(currentTrip).map((step) => (
                <TimelineChip key={step}>{step}</TimelineChip>
              ))}
            </TimelineRow>
          </CurrentTripCard>
        ))}

      <UpcomingGrid>
        {isTripLoading && (
          <TripEmptyCard>여행 일정을 불러오는 중입니다.</TripEmptyCard>
        )}
        {isTripError && !isTripLoading && (
          <TripEmptyCard>여행 일정을 불러오지 못했습니다.</TripEmptyCard>
        )}
        {selectedTripFilter === "전체" && !isTripLoading && !isTripError && (
          <>
            <TripGroupTitle>진행 예정</TripGroupTitle>
            <TripGroupGrid $hasMore={upcomingTrips.length > 3}>
              {upcomingTrips.length > 0 ? (
                upcomingTrips
                  .slice(0, 3)
                  .map((trip, index) => renderTripCard(trip, index))
              ) : (
                <AddTripCard type="button">
                  <AddCircle>+</AddCircle>
                  일정 추가하기
                </AddTripCard>
              )}
              {upcomingTrips.length > 3 && (
                <TripGroupMoreButton
                  type="button"
                  title="진행 예정 전체 보기"
                  aria-label="진행 예정 전체 보기"
                  onClick={() => setSelectedTripFilter("진행 예정")}
                >
                  <Ellipsis size={17} />
                </TripGroupMoreButton>
              )}
            </TripGroupGrid>

            {pastTrips.length > 0 && (
              <>
                <TripGroupTitle>지난 여행</TripGroupTitle>
                <TripGroupGrid $hasMore={pastTrips.length > 3}>
                  {pastTrips
                    .slice(0, 3)
                    .map((trip, index) => renderTripCard(trip, index))}
                  {pastTrips.length > 3 && (
                    <TripGroupMoreButton
                      type="button"
                      title="지난 여행 전체 보기"
                      aria-label="지난 여행 전체 보기"
                      onClick={() => setSelectedTripFilter("지난 여행")}
                    >
                      <Ellipsis size={17} />
                    </TripGroupMoreButton>
                  )}
                </TripGroupGrid>
              </>
            )}
          </>
        )}
        {!isTripLoading &&
          !isTripError &&
          selectedTripFilter !== "전체" &&
          visibleTrips.map((trip, index) => renderTripCard(trip, index))}

        {!isTripLoading &&
          !isTripError &&
          selectedTripFilter !== "전체" &&
          selectedTripFilter === "진행 예정" &&
          visibleTrips.length === 0 && (
            <AddTripCard type="button">
              <AddCircle>+</AddCircle>
              일정 추가하기
            </AddTripCard>
          )}
      </UpcomingGrid>
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

const TripGroupTitle = styled.h4`
  grid-column: 1 / -1;
  margin: 8px 0 0;
  color: #52615a;
  font-size: 0.95rem;
  font-weight: 800;
`;

const TripGroupGrid = styled.div<{ $hasMore: boolean }>`
  grid-column: 1 / -1;
  display: grid;
  grid-template-columns: ${({ $hasMore }) =>
    $hasMore ? "repeat(3, minmax(0, 1fr)) 34px" : "repeat(3, minmax(0, 1fr))"};
  align-items: center;
  gap: 14px;

  @media (max-width: 960px) {
    grid-template-columns: 1fr;
  }
`;

const TripGroupMoreButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  padding: 0;
  border: 1px solid rgba(36, 149, 155, 0.14);
  border-radius: 50%;
  background: #f4f8f5;
  color: ${colors.main};
  cursor: pointer;
  justify-self: center;

  &:hover {
    background: rgba(36, 149, 155, 0.1);
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
