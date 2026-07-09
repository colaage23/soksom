import styled from "styled-components";
import { Inbox } from "lucide-react";
import { useDrop } from "react-dnd";
import WayPointItem, { type DragItem } from "./WayPointItem";
import { POOL_DAY, useWayPointStore } from "../../../stores/useWayPointStore";
import type { ISearchSpotResponse } from "../../../types/spot";

interface PoolWayPointListProps {
  spots: ISearchSpotResponse[];
}

const PoolWayPointList = ({ spots }: PoolWayPointListProps) => {
  const { moveItem } = useWayPointStore();

  const [{ isOver }, dropRef] = useDrop<DragItem, void, { isOver: boolean }>({
    accept: "WAYPOINT",
    drop: (draggedItem, monitor) => {
      if (!monitor.isOver({ shallow: true })) return;
      if (draggedItem.dayIndex === POOL_DAY) return;

      moveItem(draggedItem.dayIndex, draggedItem.index, POOL_DAY, spots.length);
      draggedItem.dayIndex = POOL_DAY;
      draggedItem.index = spots.length;
    },
    collect: (monitor) => ({
      isOver: monitor.isOver({ shallow: true }),
    }),
  });

  return (
    <PoolSection>
      <PoolHeader>
        <PoolIcon />
        담아둔 관광지
        <DaySpotCount>{spots.length}곳</DaySpotCount>
      </PoolHeader>
      <PoolHint>
        관광지를 추가하면 여기에 먼저 담겨요. 원하는 일차로 드래그해서
        옮겨보세요.
      </PoolHint>

      <PoolList
        ref={(node) => {
          dropRef(node);
        }}
        $isOver={isOver}
      >
        {spots.length === 0 ? (
          <EmptyDayHint>아직 담아둔 관광지가 없어요</EmptyDayHint>
        ) : (
          spots.map((spot, idx) => (
            <WayPointItem
              key={spot.contentid}
              dayIndex={POOL_DAY}
              index={idx}
              spot={spot}
            />
          ))
        )}
      </PoolList>
    </PoolSection>
  );
};

const PoolSection = styled.div`
  width: 100%;
  flex-shrink: 0;

  display: flex;
  flex-direction: column;
  gap: 8px;

  padding: 0 16px;
`;

const PoolHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;

  font-size: 0.9375rem;
  font-weight: 700;
  color: #2e3339;
`;

const PoolIcon = styled(Inbox)`
  width: 15px;
  height: 15px;
  stroke: #7b827d;
  stroke-width: 2;
`;

const PoolHint = styled.p`
  margin: -4px 0 0;

  color: #a8a196;
  font-size: 0.75rem;
  word-break: keep-all;
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

const PoolList = styled.div<{ $isOver?: boolean }>`
  width: 100%;
  min-height: 8px;
  flex-shrink: 0;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 12px;

  border-radius: 12px;
  outline: 2px dashed ${({ $isOver }) => ($isOver ? "#0c9799" : "transparent")};
  outline-offset: 4px;

  transition: outline-color 0.1s ease;
`;

export default PoolWayPointList;
