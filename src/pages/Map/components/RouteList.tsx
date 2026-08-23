import styled from "styled-components";
import { useEffect, useMemo } from "react";
import { Wand } from "lucide-react";
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

// 카카오모빌리티 응답에서 우리가 실제로 쓰는 부분만 느슨하게 타입 지정
interface KakaoDirectionRoute {
  result_msg?: string;
  summary?: { distance?: number; duration?: number };
  sections?: { distance?: number; duration?: number }[];
}

const RouteList = () => {
  const { pool, wayPoint, dayCount, expandedDay, setExpandedDay } =
    useWayPointStore();
  const { setDirections } = useDirectionStore();

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

  return (
    <RouteListContainer>
      <RouteListScroll>
        <TripInfoWrapper>
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
        <GenerateScheduleButton>
          <WandIcon />
          일정 생성하기
        </GenerateScheduleButton>
      </RouteListContent>
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

const WandIcon = styled(Wand)`
  width: 16px;
  height: 16px;
  stroke: currentColor;
  stroke-width: 2.2;
`;

export default RouteList;
