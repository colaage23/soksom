import { Search } from "lucide-react";
import { useState } from "react";
import styled from "styled-components";
import { mockSpots } from "../mock";
import SpotCard from "./SpotCard";

/*
관광 타입 or 서비스 분류 어떤 거로 필터링 할지?
+ 여행 코스를 포함 시킬 것인지?
=> 따로 소개해도 좋을 것 같기도?
*/
const categories: string[] = [
  "전체",
  "관광지",
  "문화시설",
  "행사",
  "레포츠",
  "숙박",
  "쇼핑",
  "음식점",
];

const ExploreList = () => {
  const [selectedCategory, setSelectedCategory] = useState("전체");
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedSpot, setSelectedSpot] = useState(0);

  const visibleCategories = isExpanded ? categories : categories.slice(0, 5);

  return (
    <ExploreListContainer>
      <MapSearchForm>
        <MapSearchBox>
          <SearchIcon />
          <SearchInput placeholder="관광지, 지역, 태그 검색" type="text" />
        </MapSearchBox>
      </MapSearchForm>

      <CategorySection>
        {visibleCategories.map((category) => (
          <CategoryChip
            key={category}
            $isActive={selectedCategory === category}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </CategoryChip>
        ))}
        {categories.length > 5 && (
          <CategoryChip
            $isActive={false}
            onClick={() => setIsExpanded((prev) => !prev)}
          >
            {isExpanded ? "-" : "+"}
          </CategoryChip>
        )}
      </CategorySection>

      <SpotList>
        {mockSpots.map((item) => (
          <SpotCard
            key={item.id}
            spot={item}
            isActive={selectedSpot === item.id}
            onClick={() => setSelectedSpot(item.id)}
          />
        ))}
      </SpotList>
    </ExploreListContainer>
  );
};

const ExploreListContainer = styled.section`
  flex: 1;
  min-height: 0;
  overflow: hidden;

  display: flex;
  flex-direction: column;

  background-color: #fdfcf8;
`;

const SpotList = styled.ul`
  flex: 1;
  min-height: 0;

  overflow-y: auto;

  margin: 0;
  padding: 0 0 16px;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const MapSearchForm = styled.form`
  display: flex;
  justify-content: center;

  padding: 16px;
`;

const MapSearchBox = styled.div`
  height: 40px;
  width: 100%;

  display: flex;
  align-items: center;
  gap: 4px;

  padding-inline: 16px;

  border: 1px solid #f5f2eb;
  border-radius: 50px;
  background-color: #faf9f2;
`;

const SearchIcon = styled(Search)`
  width: 16px;
  height: 16px;
  stroke: #999fa6;
  stroke-width: 2.2;
`;

const SearchInput = styled.input`
  width: 100%;

  border: none;
  outline: none;
  font-size: 0.875rem;

  background-color: #faf9f2;
`;

const CategorySection = styled.section`
  width: 100%;

  display: flex;
  justify-content: start;
  align-items: center;
  gap: 6px;

  padding-inline: 16px;

  flex-wrap: wrap;
`;

const CategoryChip = styled.button<{ $isActive: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;

  padding: 8px 12px;

  background-color: ${({ $isActive }) => ($isActive ? "#0C9799" : "#fff")};

  color: ${({ $isActive }) => ($isActive ? "#fdfcf8" : "#2e3339")};
  font-size: 0.75rem;

  outline: none;

  border-radius: 50px;
  border: 1px solid ${({ $isActive }) => ($isActive ? "#0C9799" : "#f5f2eb")};

  transition: 0.15s border cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    cursor: pointer;
    border: 1px solid #0c9799;
  }
`;

export default ExploreList;
