import styled from "styled-components";
import { ChevronDown } from "lucide-react";
import { useDrop } from "react-dnd";
import WayPointItem, { type DragItem } from "./WayPointItem";
import { useWayPointStore } from "../../../stores/useWayPointStore";
import type { ISpotListItem } from "../../../types/spot";
import type { RouteSection } from "./RouteLegConnector";
import RouteLegConnector from "./RouteLegConnector";

interface DayCardProps {
  dayIdx: number;
  spots: ISpotListItem[];
  isExpanded: boolean;
  onToggle: () => void;
  // 이 일차의 구간별 경로 정보. spots[i] -> spots[i+1] 구간에 대응 (spots.length - 1개)
  routeSections?: RouteSection[];
  children?: React.ReactNode;
}

// 펼쳐졌든 접혔든 카드 전체(헤더+내용)가 하나의 드롭 영역이 되도록 통합.
// 헤더/리스트가 각각 useDrop을 가지면 드래그 시 테두리가 겹쳐 보이는 문제가 있어 하나로 정리함.
const DayCard = ({
  dayIdx,
  spots,
  isExpanded,
  onToggle,
  routeSections,
  children,
}: DayCardProps) => {
  const { moveItem } = useWayPointStore();

  const [{ isOver }, dropRef] = useDrop<DragItem, void, { isOver: boolean }>({
    accept: "WAYPOINT",
    drop: (draggedItem, monitor) => {
      // 카드 안의 특정 WayPointItem 위에 놓인 경우엔 그 아이템의 hover에서
      // 이미 처리되므로, 카드의 빈 여백에 놓인 경우만 맨 뒤에 추가
      if (!monitor.isOver({ shallow: true })) return;
      if (draggedItem.dayIndex === dayIdx) return;

      moveItem(draggedItem.dayIndex, draggedItem.index, dayIdx, spots.length);
      draggedItem.dayIndex = dayIdx;
      draggedItem.index = spots.length;
    },
    collect: (monitor) => ({
      isOver: monitor.isOver({ shallow: true }),
    }),
  });

  return (
    <DaySection
      ref={(node) => {
        dropRef(node);
      }}
      $isOver={isOver}
    >
      <DayHeader type="button" $isExpanded={isExpanded} onClick={onToggle}>
        <DayHeaderLeft>
          {dayIdx + 1}일차
          <DaySpotCount>{spots.length}곳</DaySpotCount>
        </DayHeaderLeft>
        <DayChevron $isExpanded={isExpanded} />
      </DayHeader>

      {isExpanded && (
        <DayCardContent>
          {spots.length === 0 ? (
            <EmptyDayHint>보관함에서 관광지를 드래그해 넣어보세요</EmptyDayHint>
          ) : (
            spots.map((spot, idx) => (
              <WayPointItemWrapper key={spot.contentid}>
                <WayPointItem dayIndex={dayIdx} index={idx} spot={spot} />

                {idx < spots.length - 1 && (
                  <RouteLegConnector section={routeSections?.[idx]} />
                )}
              </WayPointItemWrapper>
            ))
          )}

          {children}
        </DayCardContent>
      )}
    </DaySection>
  );
};

const DaySection = styled.div<{ $isOver?: boolean }>`
  width: 100%;
  flex-shrink: 0;

  display: flex;
  flex-direction: column;
  gap: 10px;

  border: 1px solid #edebe5;
  border-radius: 14px;

  padding: 10px 12px;

  outline: 2px dashed ${({ $isOver }) => ($isOver ? "#0c9799" : "transparent")};
  outline-offset: 4px;

  transition: outline-color 0.1s ease;
`;

const DayCardContent = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;
`;

const WayPointItemWrapper = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;
`;

const DayHeader = styled.button<{ $isExpanded: boolean }>`
  width: 100%;

  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 2px;

  outline: none;
  border: none;
  border-radius: 8px;
  background: transparent;

  cursor: pointer;
`;

const DayHeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;

  color: #2e3339;
  font-size: 0.9375rem;
  font-weight: 700;
`;

const DayChevron = styled(ChevronDown)<{ $isExpanded: boolean }>`
  width: 16px;
  height: 16px;
  stroke: #7b827d;
  stroke-width: 2;

  transform: ${({ $isExpanded }) =>
    $isExpanded ? "rotate(180deg)" : "rotate(0)"};
  transition: transform 0.2s ease;
`;

const DaySpotCount = styled.span`
  padding: 2px 8px;

  border-radius: 9999px;
  background-color: #f2f1ec;

  color: #7b827d;
  font-size: 0.6875rem;
  font-weight: 500;
`;

const EmptyDayHint = styled.p`
  width: 100%;

  margin: 0;
  padding: 20px 12px;

  border: 1px dashed #edebe5;
  border-radius: 12px;

  color: #a8a196;
  font-size: 0.8125rem;
  text-align: center;
`;

export default DayCard;
