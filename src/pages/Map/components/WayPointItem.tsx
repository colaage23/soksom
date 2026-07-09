import { GripVertical, X } from "lucide-react";
import styled from "styled-components";
import { POOL_DAY, useWayPointStore } from "../../../stores/useWayPointStore";
import { useDrag, useDrop } from "react-dnd";
import { useSpotStore } from "../../../stores/useSpotStore";
import type { ISearchSpotResponse } from "../../../types/spot";

interface WayPointItemProps {
  dayIndex: number;
  index: number;
  spot: ISearchSpotResponse;
}

export interface DragItem {
  dayIndex: number;
  index: number;
  name: string;
  addr1: string;
  category: string;
}

const WayPointItem = ({ dayIndex, index, spot }: WayPointItemProps) => {
  const { removeItem, moveItem } = useWayPointStore();
  const { setDetailSpot, setSelectedSpot } = useSpotStore();

  const [, dragRef, preview] = useDrag<DragItem>({
    type: "WAYPOINT",
    item: {
      dayIndex,
      index,
      name: spot.title,
      addr1: spot.addr1,
      category: spot.lclsSystm2Nm,
    },
  });

  const [, dropRef] = useDrop<DragItem>({
    accept: "WAYPOINT",
    hover: (draggedItem) => {
      if (draggedItem.dayIndex === dayIndex && draggedItem.index === index) {
        return;
      }

      moveItem(draggedItem.dayIndex, draggedItem.index, dayIndex, index);

      draggedItem.dayIndex = dayIndex;
      draggedItem.index = index;
    },
  });

  return (
    <WayPointItemContainer>
      {dayIndex !== POOL_DAY && <NumberChip>{index + 1}</NumberChip>}
      <WayPointItemBox
        ref={(node) => {
          dropRef(node);
          preview(node);
        }}
      >
        <WayPointContent
          onClick={() => {
            setSelectedSpot(spot);
          }}
        >
          <WayPointDragButton
            ref={(node) => {
              dragRef(node);
            }}
          >
            <DragIcon />
          </WayPointDragButton>
          <InfoBox
            onClick={() => {
              setDetailSpot(spot);
            }}
          >
            <WayPointName>{spot.title}</WayPointName>

            <WayPointInfoText>
              <span>{spot.addr1.split(" ").slice(1, 4).join(" ")}</span>
              <span style={{ color: "#c0c5ca" }}> · </span>
              <span>{spot.lclsSystm2Nm}</span>
            </WayPointInfoText>
          </InfoBox>
        </WayPointContent>

        <DeleteButton onClick={() => removeItem(dayIndex, spot.contentid)}>
          <DeleteIcon />
        </DeleteButton>
      </WayPointItemBox>
    </WayPointItemContainer>
  );
};

const DeleteIcon = styled(X)`
  height: 12px;
  width: 12px;
  stroke: #5bd6d8;
  stroke-width: 3;
`;

const DeleteButton = styled.button`
  height: 20px;
  width: 20px;

  display: flex;
  justify-content: center;
  align-items: center;

  padding: 0;
  flex-shrink: 0;

  outline: none;
  border: none;
  border-radius: 9999px;

  background-color: #b2e8e5;

  opacity: 0;
  transition: opacity 0.15s ease;

  cursor: pointer;
`;

const WayPointItemContainer = styled.div`
  width: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0;

  gap: 12px;

  cursor: pointer;
`;

const WayPointItemBox = styled.div`
  width: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px 14px;

  gap: 8px;

  border: 1px solid #ade5e2;
  border-radius: 4px;

  background-color: #f0fcfa;

  &:hover ${DeleteButton} {
    opacity: 1;
  }
`;

const WayPointContent = styled.div`
  width: 100%;

  display: flex;
  justify-content: start;
  align-items: center;

  gap: 14px;
`;

const NumberChip = styled.div`
  height: 24px;
  width: 24px;

  display: flex;
  justify-content: center;
  align-items: center;

  padding: 8px;

  border-radius: 9999px;

  background-color: #0c9799;

  color: #fffcf7;
  font-size: 0.75rem;
  font-weight: 600;
`;

const InfoBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;

  gap: 2px;
`;

const WayPointName = styled.h4`
  font-size: 0.8125rem;
  margin: 0;

  color: #2e3339;

  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

const WayPointInfoText = styled.p`
  margin: 0;

  font-size: 0.625rem;
  color: #6e767c;
  cursor: pointer;
`;

const DragIcon = styled(GripVertical)`
  height: 20px;
  width: 20px;

  stroke: #7ad7d1;
`;

const WayPointDragButton = styled.button`
  height: 36px;
  width: 20px;

  display: flex;
  justify-self: flex-end;
  align-items: center;

  padding: 0;

  outline: none;
  border: none;

  background-color: transparent;

  box-shadow: none;

  cursor: move;
`;

export default WayPointItem;
