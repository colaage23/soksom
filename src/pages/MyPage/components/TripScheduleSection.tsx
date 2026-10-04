import {
  ChevronLeft,
  ChevronRight,
  Ellipsis,
  MoreVertical,
  Plus,
} from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import colors from "../../../constants/colors";
import { useDeleteTrip } from "../../../hooks/trip/useDeleteTrip";
import {
  useGetNextTrips,
  useGetPreviousTrips,
  useGetTrips,
} from "../../../hooks/trip/useGetTrips";
import type { ITrip } from "../../../types/trip";

const tripFilterOptions = ["전체", "진행 예정", "지난 여행"] as const;

const temporaryTripImages = [
  "https://images.unsplash.com/photo-1530789253388-582c481c54b0?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80",
];

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

const getVisiblePages = (currentPage: number, totalPages: number) => {
  const firstPage = Math.max(1, Math.min(currentPage - 2, totalPages - 4));
  const lastPage = Math.min(totalPages, firstPage + 4);

  return Array.from(
    { length: Math.max(0, lastPage - firstPage + 1) },
    (_, index) => firstPage + index,
  );
};

export const TripScheduleSection = () => {
  const navigate = useNavigate();
  const currentTripCarouselRef = useRef<HTMLDivElement>(null);
  const openMenuContainerRef = useRef<HTMLDivElement | null>(null);
  const [selectedTripFilter, setSelectedTripFilter] =
    useState<(typeof tripFilterOptions)[number]>("전체");
  const [upcomingPage, setUpcomingPage] = useState(1);
  const [pastPage, setPastPage] = useState(1);
  const [openMenuTripId, setOpenMenuTripId] = useState<number | null>(null);
  const { mutate: deleteTripMutate } = useDeleteTrip();
  const tripListParams = { pageNo: 1, numOfRows: 20 };
  const upcomingTripParams = { pageNo: upcomingPage, numOfRows: 9 };
  const pastTripParams = { pageNo: pastPage, numOfRows: 9 };
  const {
    data: tripList,
    isLoading: isAllTripLoading,
    isError: isAllTripError,
  } = useGetTrips(tripListParams);
  const {
    data: nextTripList,
    isLoading: isNextTripLoading,
    isError: isNextTripError,
  } = useGetNextTrips(upcomingTripParams);
  const {
    data: previousTripList,
    isLoading: isPreviousTripLoading,
    isError: isPreviousTripError,
  } = useGetPreviousTrips(pastTripParams);

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
  const selectedPage =
    selectedTripFilter === "지난 여행" ? pastPage : upcomingPage;
  const selectedTotalPages =
    selectedTripFilter === "지난 여행"
      ? (previousTripList?.totalPages ?? 0)
      : (nextTripList?.totalPages ?? 0);

  const handleFilterChange = (filter: (typeof tripFilterOptions)[number]) => {
    setSelectedTripFilter(filter);

    if (filter === "전체") {
      setUpcomingPage(1);
      setPastPage(1);
    }
    if (filter === "진행 예정") setUpcomingPage(1);
    if (filter === "지난 여행") setPastPage(1);
  };

  const handlePageChange = (page: number) => {
    if (page < 1 || page > selectedTotalPages) return;

    if (selectedTripFilter === "지난 여행") {
      setPastPage(page);
      return;
    }

    setUpcomingPage(page);
  };

  const handleCurrentTripSlide = (direction: -1 | 1) => {
    const carousel = currentTripCarouselRef.current;
    if (!carousel) return;

    carousel.scrollBy({
      left: direction * carousel.clientWidth,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    if (openMenuTripId === null) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        openMenuContainerRef.current &&
        !openMenuContainerRef.current.contains(event.target as Node)
      ) {
        setOpenMenuTripId(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [openMenuTripId]);

  const handleToggleTripMenu = (event: React.MouseEvent, tripId: number) => {
    event.stopPropagation();
    setOpenMenuTripId((prev) => (prev === tripId ? null : tripId));
  };

  const handleEditTrip = (event: React.MouseEvent, tripId: number) => {
    event.stopPropagation();
    setOpenMenuTripId(null);
    navigate(`/map?mode=route&editTripId=${tripId}`);
  };

  const handleDeleteTrip = (event: React.MouseEvent, tripId: number) => {
    event.stopPropagation();
    setOpenMenuTripId(null);

    const confirmed = window.confirm("이 여행 일정을 삭제하시겠습니까?");
    if (!confirmed) return;

    deleteTripMutate(tripId);
  };

  const renderTripCard = (trip: ITrip, index: number, showEdit = false) => {
    const tripImage =
      trip.firstimage ||
      temporaryTripImages[index % temporaryTripImages.length];
    const handleMoveToTrip = () => navigate(`/trip/${trip.tripId}`);

    return (
      <UpcomingCard
        key={trip.tripId}
        role="link"
        tabIndex={0}
        onClick={handleMoveToTrip}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            handleMoveToTrip();
          }
        }}
      >
        <UpcomingImage src={tripImage} alt="" />
        <UpcomingBody>
          <UpcomingVisual>
            <UpcomingInfo>
              <UpcomingVisualTitle>{trip.tripName}</UpcomingVisualTitle>
              <UpcomingMeta>
                {formatTripDateRange(trip.startDate, trip.endDate)}
              </UpcomingMeta>
            </UpcomingInfo>

            <TripMenuWrapper
              ref={trip.tripId === openMenuTripId ? openMenuContainerRef : null}
            >
              <TripMenuButton
                type="button"
                aria-label="일정 메뉴 열기"
                onClick={(event) => handleToggleTripMenu(event, trip.tripId)}
              >
                <MoreVertical size={18} />
              </TripMenuButton>
              {openMenuTripId === trip.tripId && (
                <TripMenuDropdown>
                  {showEdit && (
                    <TripMenuEditButton
                      type="button"
                      onClick={(event) => handleEditTrip(event, trip.tripId)}
                    >
                      일정 수정
                    </TripMenuEditButton>
                  )}
                  <TripMenuDeleteButton
                    type="button"
                    onClick={(event) => handleDeleteTrip(event, trip.tripId)}
                  >
                    일정 삭제
                  </TripMenuDeleteButton>
                </TripMenuDropdown>
              )}
            </TripMenuWrapper>
          </UpcomingVisual>

          <UpcomingMeta $accent>{trip.cnt}개 장소</UpcomingMeta>
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
              onClick={() => handleFilterChange(filter)}
            >
              {filter}
            </SegmentChip>
          ))}
        </SegmentedTabs>
      </SectionHeader>

      {showCurrentTrips && (
        <CurrentTrips>
          <CurrentTripsHeader>
            <CurrentTripsTitle>진행 중</CurrentTripsTitle>
            {currentTrips.length > 3 && (
              <CarouselControls>
                <CarouselButton
                  type="button"
                  aria-label="이전 진행 중 일정"
                  onClick={() => handleCurrentTripSlide(-1)}
                >
                  <ChevronLeft size={17} />
                </CarouselButton>
                <CarouselButton
                  type="button"
                  aria-label="다음 진행 중 일정"
                  onClick={() => handleCurrentTripSlide(1)}
                >
                  <ChevronRight size={17} />
                </CarouselButton>
              </CarouselControls>
            )}
          </CurrentTripsHeader>
          <CurrentTripCarousel ref={currentTripCarouselRef}>
            {currentTrips.map((trip, index) =>
              renderTripCard(trip, index, true),
            )}
          </CurrentTripCarousel>
        </CurrentTrips>
      )}

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
            <TripGroupGrid $hasMore={upcomingTrips.length > 4}>
              {upcomingTrips.length > 0 ? (
                upcomingTrips
                  .slice(0, 4)
                  .map((trip, index) => renderTripCard(trip, index, true))
              ) : (
                <AddTripCard type="button" onClick={() => navigate("/map")}>
                  <AddCircle>
                    <Plus size={18} strokeWidth={3} />
                  </AddCircle>
                  일정 추가하기
                </AddTripCard>
              )}
              {upcomingTrips.length > 3 && (
                <TripGroupMoreButton
                  type="button"
                  title="진행 예정 전체 보기"
                  aria-label="진행 예정 전체 보기"
                  onClick={() => handleFilterChange("진행 예정")}
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
                    .slice(0, 4)
                    .map((trip, index) => renderTripCard(trip, index))}
                  {pastTrips.length > 4 && (
                    <TripGroupMoreButton
                      type="button"
                      title="지난 여행 전체 보기"
                      aria-label="지난 여행 전체 보기"
                      onClick={() => handleFilterChange("지난 여행")}
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
          visibleTrips.map((trip, index) =>
            renderTripCard(trip, index, selectedTripFilter === "진행 예정"),
          )}

        {!isTripLoading &&
          !isTripError &&
          selectedTripFilter !== "전체" &&
          selectedTripFilter === "진행 예정" &&
          visibleTrips.length === 0 && (
            <AddTripCard type="button" onClick={() => navigate("/map")}>
              <AddCircle>
                <Plus size={18} strokeWidth={3} />
              </AddCircle>
              일정 추가하기
            </AddTripCard>
          )}

        {!isTripLoading &&
          !isTripError &&
          selectedTripFilter !== "전체" &&
          selectedTotalPages > 1 && (
            <Pagination aria-label={`${selectedTripFilter} 페이지 이동`}>
              <PageArrowButton
                type="button"
                aria-label="이전 페이지"
                disabled={selectedPage === 1}
                onClick={() => handlePageChange(selectedPage - 1)}
              >
                <ChevronLeft size={17} />
              </PageArrowButton>
              {getVisiblePages(selectedPage, selectedTotalPages).map((page) => (
                <PageNumberButton
                  key={page}
                  type="button"
                  $active={page === selectedPage}
                  aria-label={`${page}페이지`}
                  aria-current={page === selectedPage ? "page" : undefined}
                  onClick={() => handlePageChange(page)}
                >
                  {page}
                </PageNumberButton>
              ))}
              <PageArrowButton
                type="button"
                aria-label="다음 페이지"
                disabled={selectedPage === selectedTotalPages}
                onClick={() => handlePageChange(selectedPage + 1)}
              >
                <ChevronRight size={17} />
              </PageArrowButton>
            </Pagination>
          )}
      </UpcomingGrid>
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
`;

const SectionTitle = styled.h3`
  margin: 0;
  color: #24302a;
  font-size: 1.3rem;
  font-weight: 700;
`;

const SegmentedTabs = styled.div`
  position: relative;
  display: inline-grid;
  grid-template-columns: repeat(3, minmax(80px, 1fr));
  align-items: center;
  flex: 0 0 auto;
  padding: 0px 4px;
  border-radius: 20px;
  background: #e9e4da;

  @media (max-width: 640px) {
    border-radius: 18px;
  }
`;

const SegmentIndicator = styled.div<{ $selectedIndex: number }>`
  position: absolute;
  top: 4px;
  left: 4px;
  width: calc((100% - 8px) / 3);
  height: calc(100% - 8px);
  border-radius: 16px;
  background: ${colors.main};
  transform: translateX(${({ $selectedIndex }) => `${$selectedIndex * 100}%`});
  transition: transform 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  @media (max-width: 640px) {
    border-radius: 14px;
  }
`;

const SegmentChip = styled.button<{ $active?: boolean }>`
  position: relative;
  z-index: 1;
  min-width: 0;
  padding: 14px 16px;
  border: 0;
  border-radius: 16px;
  background: transparent;
  color: ${({ $active }) => ($active ? "white" : "#b8b1a2")};
  font-size: 0.875rem;
  font-weight: 500;
  white-space: nowrap;
  cursor: pointer;

  @media (max-width: 640px) {
    padding: 12px 12px;
    border-radius: 14px;
  }
`;

const CurrentTrips = styled.div`
  margin-bottom: 18px;
`;

const CurrentTripsHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const CurrentTripsTitle = styled.h4`
  margin: 0;
  color: #52615a;
  font-size: 0.95rem;
  font-weight: 800;
`;

const CarouselControls = styled.div`
  display: flex;
  gap: 6px;
`;

const CarouselButton = styled.button`
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
`;

const CurrentTripCarousel = styled.div`
  display: grid;
  grid-auto-columns: calc((100% - 28px) / 3);
  grid-auto-flow: column;
  gap: 14px;
  overflow-x: auto;
  scroll-behavior: smooth;
  scroll-snap-type: x mandatory;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }

  > * {
    scroll-snap-align: start;
  }

  @media (max-width: 960px) {
    grid-auto-columns: 100%;
  }
`;

const UpcomingGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 14px;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

const TripGroupTitle = styled.h4`
  grid-column: 1 / -1;
  margin: 8px 0 0;
  color: #706e68;
  font-size: 0.95rem;
  font-weight: 600;
`;

const TripGroupGrid = styled.div<{ $hasMore: boolean }>`
  grid-column: 1 / -1;
  display: grid;
  grid-template-columns: ${({ $hasMore }) =>
    $hasMore ? "repeat(4, minmax(0, 1fr)) 34px" : "repeat(4, minmax(0, 1fr))"};
  align-items: center;
  gap: 14px;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
  @media (max-width: 640px) {
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

const Pagination = styled.nav`
  grid-column: 1 / -1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  margin-top: 8px;
`;

const PageButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 34px;
  height: 34px;
  padding: 0;
  border: 1px solid rgba(36, 149, 155, 0.14);
  border-radius: 50%;
  background: white;
  color: #607069;
  cursor: pointer;
`;

const PageArrowButton = styled(PageButton)`
  color: ${colors.main};

  &:disabled {
    color: #bcc6c1;
    cursor: not-allowed;
  }
`;

const PageNumberButton = styled(PageButton)<{ $active: boolean }>`
  border-color: ${({ $active }) =>
    $active ? colors.main : "rgba(36, 149, 155, 0.14)"};
  background: ${({ $active }) => ($active ? colors.main : "white")};
  color: ${({ $active }) => ($active ? "white" : "#607069")};
  font-size: 0.85rem;
  font-weight: 700;
`;

const UpcomingCard = styled.article`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border: 1px solid #e4ddcf;
  border-radius: 14px;
  background: #fffefc;
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

const UpcomingImage = styled.img`
  display: block;
  width: 100%;
  height: 240px;
  object-fit: cover;
  background: #e8e2d4;

  @media (max-width: 1024px) {
    height: 140px;
  }
  @media (max-width: 640px) {
    height: 100px;
  }
`;

const UpcomingBody = styled.div`
  height: 100px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 16px;

  @media (max-width: 640px) {
    height: fit-content;
    padding: 14px;
  }
`;

const UpcomingVisual = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
`;

const UpcomingInfo = styled.div`
  min-width: 0;
`;

const UpcomingVisualTitle = styled.h4`
  margin: 0;
  padding-bottom: 4px;
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

const UpcomingMeta = styled.p<{ $accent?: boolean }>`
  margin: 0;
  color: ${({ $accent }) => ($accent ? "#666" : "#888")};
  font-size: 0.75rem;
  font-weight: ${({ $accent }) => ($accent ? 500 : 400)};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  @media (max-width: 640px) {
    font-size: 0.65rem;
  }
`;

const TripMenuWrapper = styled.div`
  position: relative;
  flex: 0 0 auto;
  align-self: start;
`;

const TripMenuButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  padding: 0;
  border: 0;
  border-radius: 12px;
  background: transparent;
  color: #6f6a60;
  cursor: pointer;
  transition: background-color 0.15s ease;

  &:hover {
    background: rgba(241, 236, 226, 0.5);
  }
`;

const TripMenuDropdown = styled.div`
  position: absolute;
  top: calc(100% + 4px);
  right: 0;
  z-index: 10;
  overflow: hidden;
  border: 1px solid rgba(36, 149, 155, 0.14);
  border-radius: 12px;
  background: white;
  box-shadow: 0 12px 24px rgba(35, 49, 44, 0.14);
`;

const TripMenuEditButton = styled.button`
  padding: 10px 16px;
  border: 0;
  border-bottom: 1px solid rgba(36, 149, 155, 0.1);
  background: white;
  color: #245f62;
  font-size: 0.85rem;
  font-weight: 700;
  white-space: nowrap;
  cursor: pointer;

  &:hover {
    background: rgba(36, 149, 155, 0.08);
  }
`;

const TripMenuDeleteButton = styled.button`
  padding: 10px 16px;
  border: 0;
  background: white;
  color: #e2483d;
  font-size: 0.85rem;
  font-weight: 700;
  white-space: nowrap;
  cursor: pointer;

  &:hover {
    background: rgba(226, 72, 61, 0.08);
  }
`;

const AddTripCard = styled.button`
  height: 340px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 18px;
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
    border-color: rgba(12, 151, 153, 0.5);
    color: ${colors.main};
  }

  @media (max-width: 1024px) {
    flex-direction: row;
    padding: 16px;
    height: 191px;
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
