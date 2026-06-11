import styled from "styled-components";

import SearchBar from "./SearchBar";
import { useSearchKeywordStore } from "../../../stores/useSearchKeywordStorer";
import { mockSpots } from "../mock";
import { Wand } from "lucide-react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import WayPointItem from "./WayPointItem";
import { useWayPointStore } from "../../../stores/useWayPointStore";

const RouteList = () => {
  const { searchKeyword, setSearchKeyword } = useSearchKeywordStore();
  const { wayPoint, toggleWayPoint } = useWayPointStore();

  const filteredSpots = mockSpots.filter((spot) => {
    const keyword = searchKeyword.trim();

    const matchesSearch =
      keyword === ""
        ? true
        : spot.name.includes(keyword) ||
          spot.addr1.includes(keyword) ||
          spot.category.includes(keyword);

    return matchesSearch;
  });

  return (
    <RouteListContainer>
      <SearchBar
        placeholder="장소 검색 후 추가"
        value={searchKeyword}
        onChange={(e) => setSearchKeyword(e.target.value)}
        onClear={() => setSearchKeyword("")}
      />

      {searchKeyword.length > 0 && (
        <ResultBox>
          {filteredSpots.map((spot) => (
            <ResultItem
              onClick={() => {
                toggleWayPoint(spot);
                setSearchKeyword("");
              }}
            >
              {spot.name}
            </ResultItem>
          ))}
        </ResultBox>
      )}

      <DndProvider backend={HTML5Backend}>
        <WayPointList>
          {wayPoint.map((spot, idx) => (
            <WayPointItem index={idx} spot={spot} />
          ))}
        </WayPointList>
      </DndProvider>

      <RouteListContent>
        <GenerateScheduleButton>
          <WandIcon />
          AI 일정 생성하기
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

const ResultBox = styled.ul`
  height: fit-content;
  max-height: 160px;
  width: 315px;

  position: absolute;

  top: 120.5px;
  left: 48px;

  display: flex;
  flex-direction: column;
  justify-content: start;

  margin: 0;
  padding: 0;

  background-color: #fdfcf8;

  border: 1px solid #edebe5;
  border-top: none;

  overflow-y: auto;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const ResultItem = styled.li`
  padding: 4px 8px;

  font-size: 0.875rem;

  list-style: none;

  &:hover {
    background-color: #f2f1ec;
    cursor: pointer;
  }
`;

const WayPointList = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 12px;

  padding: 0 16px;
`;

const RouteListContent = styled.div`
  width: 100%;

  padding: 0 16px;
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
