import styled from "styled-components";
import { useEffect, useMemo, useState } from "react";
import { LogIn, Wand, X } from "lucide-react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import PoolWayPointList from "./PoolWayPointList";
import DayCard from "./DayCard";
import RouteSummaryCard from "./RouteSummaryCard";
import { type RouteSection } from "./RouteLegConnector";
import { useWayPointStore } from "../../../stores/useWayPointStore";
import { useDirectionWithFallback } from "../../../hooks/useDirectionWithFallback";
import { useDirectionStore } from "../../../stores/useDirectionStore";
import TripInfoCard from "./TripInfoCard";
import { useCreateTrip } from "../../../hooks/trip/useCreateTrip";
import { useUpdateTrip } from "../../../hooks/trip/useUpdateTrip";
import { useGetTripDetail } from "../../../hooks/trip/useGetTripDetail";
import toTripDetails from "../../../utils/toTripDetails";
import TripNameModal from "./TripNameModal";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuthStore } from "../../../stores/auth/authStore";
import { useToast } from "../../../hooks/common/useToast";

// 카카오모빌리티 응답에서 우리가 실제로 쓰는 부분만 느슨하게 타입 지정
interface KakaoDirectionRoute {
  result_msg?: string;
  summary?: { distance?: number; duration?: number };
  sections?: { distance?: number; duration?: number }[];
}

const RouteList = () => {
  const navigate = useNavigate();
  const accessToken = useAuthStore((state) => state.accessToken);
  const isLoggedIn = Boolean(accessToken);
  const showToast = useToast();

  const {
    pool,
    wayPoint,
    dayCount,
    expandedDay,
    setExpandedDay,
    resetWayPoint,
    dateRange,
    editingTrip,
    loadTripForEdit,
  } = useWayPointStore();
  const { setDirections } = useDirectionStore();

  const [searchParams, setSearchParams] = useSearchParams();
  const editTripId = searchParams.get("editTripId");
  const { data: editTargetTrip } = useGetTripDetail(editTripId ?? "");

  useEffect(() => {
    if (!editTripId || !editTargetTrip) return;
    // editingTrip은 store 전역 상태라 탐색 모드로 전환되어 RouteList가
    // 언마운트/리마운트돼도 유지되므로, 이미 로드했는지 여기로 판단해야 함
    if (editingTrip?.tripId === editTargetTrip.tripId) return;

    loadTripForEdit(editTargetTrip);
  }, [editTripId, editTargetTrip, editingTrip, loadTripForEdit]);

  useEffect(() => {
    // URL에서 editTripId가 사라졌는데 store에 이전 수정 상태가 남아있으면 정리
    // (취소 버튼은 URL만 바꾸고, 스토어 초기화는 이 이펙트가 담당해야 레이스가 생기지 않음)
    if (editTripId || !editingTrip) return;

    resetWayPoint();
  }, [editTripId, editingTrip, resetWayPoint]);

  const { fetchDirectionWithFallback, data } = useDirectionWithFallback();

  const expandedDaySpots = useMemo(
    () => (expandedDay !== null ? (wayPoint[expandedDay] ?? []) : []),
    [expandedDay, wayPoint],
  );

  // expandedDaySpots(배열 자체)가 아니라 실제 내용(id 목록)이 바뀔 때만 재요청되도록
  const expandedDaySpotIds = useMemo(
    () => expandedDaySpots.map((spot) => spot.contentid).join(","),
    [expandedDaySpots],
  );

  useEffect(() => {
    if (expandedDaySpots.length > 1) {
      fetchDirectionWithFallback({
        origin: {
          x: Number(expandedDaySpots[0].mapx),
          y: Number(expandedDaySpots[0].mapy),
        },
        waypoints: expandedDaySpots.slice(1, -1).map((spot) => ({
          x: Number(spot.mapx),
          y: Number(spot.mapy),
        })),
        destination: {
          x: Number(expandedDaySpots[expandedDaySpots.length - 1].mapx),
          y: Number(expandedDaySpots[expandedDaySpots.length - 1].mapy),
        },
      });
    } else {
      // 경유지가 2개 미만이 되면 이전 경로 기록을 지워서 지도/카드에 안 남게 함
      setDirections(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [expandedDaySpotIds]);

  useEffect(() => {
    if (data) {
      setDirections(data);
    }
  }, [data, setDirections]);

  const route = data?.routes?.[0] as KakaoDirectionRoute | undefined;

  // routes[0].sections[]를 구간별 거리/시간으로 변환.
  // sections[i]는 spots[i] -> spots[i+1] 구간에 대응한다고 가정
  const currentRouteSections: RouteSection[] | undefined = useMemo(() => {
    if (!route?.sections) return undefined;

    return route.sections
      .filter(
        (s): s is { distance: number; duration: number } =>
          typeof s.distance === "number" && typeof s.duration === "number",
      )
      .map((s) => ({ distance: s.distance, duration: s.duration }));
  }, [route]);

  const { mutate: createTripMutate, isPending: isCreating } = useCreateTrip();
  const { mutate: updateTripMutate, isPending: isUpdating } = useUpdateTrip();
  const isSubmittingTrip = isCreating || isUpdating;
  const [isModalOpen, setIsModalOpen] = useState(false);

  const formatDate = (date: Date | null): string => {
    if (!date) return "";
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const dd = String(date.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  };

  const handleGoToLogin = () => {
    navigate("/auth");
  };

  const handleOpenModal = () => {
    const startDate = formatDate(dateRange.startDate);
    const endDate = formatDate(dateRange.endDate);

    if (!startDate || !endDate) {
      showToast("여행 날짜를 먼저 선택해주세요.", "info");
      return;
    }

    const totalSpotCount = wayPoint.reduce((sum, day) => sum + day.length, 0);

    if (totalSpotCount === 0) {
      showToast("일정에 관광지를 먼저 담아주세요.", "info");
      return;
    }

    const emptyDayIndexes = Array.from({ length: dayCount })
      .map((_, dayIdx) => dayIdx)
      .filter((dayIdx) => (wayPoint[dayIdx] ?? []).length === 0);

    if (emptyDayIndexes.length > 0) {
      const emptyDayLabels = emptyDayIndexes
        .map((idx) => `${idx + 1}일차`)
        .join(", ");
      showToast(`${emptyDayLabels}에 관광지를 담아주세요.`, "info");
      return;
    }

    setIsModalOpen(true);
  };

  const handleCancelEdit = () => {
    const nextParams = new URLSearchParams(searchParams);
    nextParams.delete("editTripId");
    setSearchParams(nextParams);
  };

  const handleGenerateSchedule = (tripName: string) => {
    const startDate = formatDate(dateRange.startDate);
    const endDate = formatDate(dateRange.endDate);

    const details = toTripDetails(wayPoint, startDate);

    if (editingTrip) {
      updateTripMutate(
        {
          tripId: editingTrip.tripId,
          payload: {
            tripName,
            startDate,
            endDate,
            isAiRoute: editingTrip.isAiRoute,
            shareCode: editingTrip.shareCode,
            details,
          },
        },
        {
          onSuccess: () => {
            setIsModalOpen(false);
            const tripId = editingTrip.tripId;
            resetWayPoint();
            showToast("일정이 수정되었어요.", "success");
            navigate(`/trip/${tripId}`);
          },
          onError: () => {
            showToast("일정 수정에 실패했습니다.", "error");
          },
        },
      );
      return;
    }

    createTripMutate(
      {
        tripName,
        startDate,
        endDate,
        isAiRoute: "N",
        details,
      },
      {
        onSuccess: () => {
          setIsModalOpen(false);
          resetWayPoint();
          showToast("일정이 생성되었어요.", "success");
        },
        onError: () => {
          showToast("일정 생성에 실패했습니다.", "error");
        },
      },
    );
  };

  return (
    <RouteListContainer>
      <RouteListScroll>
        <TripInfoWrapper>
          {editingTrip && (
            <EditingBanner>
              <span>'{editingTrip.tripName}' 일정을 수정하는 중이에요.</span>
              <CancelEditButton type="button" onClick={handleCancelEdit}>
                <X size={14} />
                취소
              </CancelEditButton>
            </EditingBanner>
          )}
          <TripInfoCard />
        </TripInfoWrapper>

        <DndProvider backend={HTML5Backend}>
          <PoolWayPointList spots={pool} />

          <DayListSection>
            {Array.from({ length: dayCount }).map((_, dayIdx) => {
              const isExpanded = expandedDay === dayIdx;
              const daySpots = wayPoint[dayIdx] ?? [];
              const showRouteSummary = isExpanded && daySpots.length > 1;

              return (
                <DayCard
                  key={dayIdx}
                  dayIdx={dayIdx}
                  spots={daySpots}
                  isExpanded={isExpanded}
                  onToggle={() => setExpandedDay(dayIdx)}
                  routeSections={isExpanded ? currentRouteSections : undefined}
                >
                  {showRouteSummary && (
                    <RouteSummaryCard
                      distance={route?.summary?.distance}
                      duration={route?.summary?.duration}
                      resultMsg={route?.result_msg}
                    />
                  )}
                </DayCard>
              );
            })}
          </DayListSection>
        </DndProvider>
      </RouteListScroll>

      <RouteListContent>
        {isLoggedIn ? (
          <GenerateScheduleButton onClick={handleOpenModal}>
            <WandIcon />
            {editingTrip ? "일정 수정하기" : "일정 생성하기"}
          </GenerateScheduleButton>
        ) : (
          <LoginRequiredButton onClick={handleGoToLogin}>
            <LoginIcon />
            로그인 후 일정 만들러 가기
          </LoginRequiredButton>
        )}
      </RouteListContent>

      <TripNameModal
        isOpen={isModalOpen}
        mode={editingTrip ? "edit" : "create"}
        defaultValue={editingTrip?.tripName ?? ""}
        isSubmitting={isSubmittingTrip}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleGenerateSchedule}
      />
    </RouteListContainer>
  );
};

const RouteListContainer = styled.section`
  flex: 1;
  min-height: 0;
  overflow: hidden;

  display: flex;
  flex-direction: column;

  background-color: #fdfcf8;
`;

const RouteListScroll = styled.div`
  flex: 1;
  min-height: 0;

  display: flex;
  flex-direction: column;
  gap: 16px;

  overflow-y: auto;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const TripInfoWrapper = styled.div`
  flex-shrink: 0;
`;

const EditingBanner = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  margin: 12px 16px 0;
  padding: 10px 14px;
  border: 1px solid rgba(12, 151, 153, 0.2);
  border-radius: 12px;
  background: rgba(12, 151, 153, 0.08);
  color: #0c7d7e;
  font-size: 0.8rem;
  font-weight: 600;
`;

const CancelEditButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 2px;
  flex-shrink: 0;
  padding: 4px 8px;
  border: 0;
  border-radius: 999px;
  background: white;
  color: #0c7d7e;
  font-size: 0.78rem;
  font-weight: 700;
  cursor: pointer;
`;

const DayListSection = styled.div`
  width: 100%;
  flex-shrink: 0;

  display: flex;
  flex-direction: column;
  gap: 10px;

  padding: 0 16px;
`;

const RouteListContent = styled.div`
  width: 100%;
  flex-shrink: 0;

  padding: 12px 16px;

  border-top: 1px solid #f5f2eb;
  background-color: #fdfcf8;
`;

const GenerateScheduleButton = styled.button`
  height: 44px;
  width: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
  gap: 6px;

  outline: none;
  border: none;
  border-radius: 9999px;

  background-color: #0c9799;

  color: #f5f2eb;
  font-size: 0.875rem;

  &:hover {
    background-color: #0fa0a3;
    cursor: pointer;
  }
`;

const LoginRequiredButton = styled.button`
  height: 44px;
  width: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
  gap: 6px;

  outline: none;
  border: 1px solid #0c9799;
  border-radius: 9999px;

  background-color: #fdfcf8;

  color: #0c9799;
  font-size: 0.875rem;
  font-weight: 500;

  &:hover {
    background-color: #e5faf8;
    cursor: pointer;
  }
`;

const WandIcon = styled(Wand)`
  width: 16px;
  height: 16px;
  stroke: currentColor;
  stroke-width: 2.2;
`;

const LoginIcon = styled(LogIn)`
  width: 16px;
  height: 16px;
  stroke: currentColor;
  stroke-width: 2.2;
`;

export default RouteList;
