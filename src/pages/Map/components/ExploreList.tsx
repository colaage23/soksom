import { useState } from "react";
import styled from "styled-components";
import { mockSpots } from "../mock";
import SpotCard from "./SpotCard";
import { useSpotStore } from "../../../stores/useSpotStore";
import SearchBar from "./SearchBar";
import { Frown, Heart } from "lucide-react";
import { useLikedSpotStore } from "../../../stores/useLikedSpotStore";

/*
관광 타입 or 서비스 분류 어떤 거로 필터링 할지?
+ 여행 코스를 포함 시킬 것인지?
=> 따로 소개해도 좋을 것 같기도?
*/
const categories: string[] = [
  "전체",
  "MY",
  "테스트",
  "관광지",
  "문화시설",
  "행사",
  "레포츠",
  "숙박",
  "쇼핑",
  "음식점",
];

const ExploreList = () => {
  const { selectedSpot, setSelectedSpot, setDetailSpot } = useSpotStore();
  const { likedSpot } = useLikedSpotStore();

  const [selectedCategory, setSelectedCategory] = useState("전체");
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState("");

  const visibleCategories = isExpanded ? categories : categories.slice(0, 5);

  const filteredSpots = mockSpots.filter((spot) => {
    // 카테고리
    const matchesCategory =
      selectedCategory === "전체"
        ? true
        : selectedCategory === "MY"
          ? likedSpot.some((liked) => liked === spot.id)
          : spot.category === selectedCategory;

    // 검색
    const keyword = searchKeyword.trim();

    const matchesSearch =
      keyword === ""
        ? true
        : spot.name.includes(keyword) ||
          spot.addr1.includes(keyword) ||
          spot.category.includes(keyword);

    return matchesCategory && matchesSearch;
  });

  return (
    <ExploreListContainer>
      <SearchBar
        placeholder={"관광지, 지역 검색"}
        value={searchKeyword}
        onChange={(e) => setSearchKeyword(e.target.value)}
        onClear={() => setSearchKeyword("")}
      />

      <CategorySection>
        {visibleCategories.map((category) => (
          <CategoryChip
            key={category}
            $isActive={selectedCategory === category}
            $isMy={category === "MY"}
            onClick={() => setSelectedCategory(category)}
          >
            {category === "MY" && (
              <Heart size={14} fill="currentColor" strokeWidth={2} />
            )}
            {category}
            {category === "MY" && (
              <LikeCountChip>{likedSpot.length}</LikeCountChip>
            )}
          </CategoryChip>
        ))}
        {categories.length > 5 && (
          <CategoryChip
            $isActive={false}
            $isMy={false}
            onClick={() => setIsExpanded((prev) => !prev)}
          >
            {isExpanded ? "-" : "+"}
          </CategoryChip>
        )}
      </CategorySection>

      <SpotList>
        {filteredSpots.length === 0 ? (
          <EmptyState>
            <EmptyChip>
              <EmptyIcon />
            </EmptyChip>
            <EmptyTitle>
              {selectedCategory === "MY"
                ? "저장한 관광지가 없어요"
                : "관광지를 찾을 수 없어요"}
            </EmptyTitle>

            <EmptyDescription>
              {selectedCategory === "MY"
                ? "마음에 드는 장소를 저장해보세요."
                : "다른 카테고리를 선택해보세요."}
            </EmptyDescription>
          </EmptyState>
        ) : (
          filteredSpots.map((item) => (
            <SpotCard
              key={item.id}
              spot={item}
              isActive={selectedSpot === item}
              onClick={() => {
                setSelectedSpot(item);
                setDetailSpot(null);
              }}
              onArrowClick={() => {
                setDetailSpot(item);
                setSelectedSpot(item);
              }}
            />
          ))
        )}
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

const EmptyState = styled.li`
  height: 100%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 8px;

  padding: 32px;

  color: #7a7468;
  font-size: 0.875rem;
  text-align: center;
`;

const EmptyChip = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 0 8px;

  width: 80px;
  height: 80px;

  border-radius: 32px;

  background-color: #f5f2eb;
  border: 1px solid #ebe6db;
`;

const EmptyIcon = styled(Frown)`
  width: 36px;
  height: 36px;

  color: #b3aca0;
`;

const EmptyTitle = styled.span`
  color: #2e3339;
  font-size: 1rem;
  font-weight: 600;
`;

const EmptyDescription = styled.span`
  color: #8f887c;
  font-size: 0.875rem;
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

const CategoryChip = styled.button<{
  $isActive: boolean;
  $isMy: boolean;
}>`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;

  padding: 8px 12px;

  background-color: ${({ $isActive, $isMy }) =>
    $isActive ? "#0C9799" : $isMy ? "#000" : "#fff"};

  color: ${({ $isActive, $isMy }) => ($isActive || $isMy ? "#fff" : "#2e3339")};

  font-size: 0.75rem;

  outline: none;
  border-radius: 50px;

  border: 1px solid
    ${({ $isActive, $isMy }) =>
      $isActive ? "#0C9799" : $isMy ? "#000" : "#f5f2eb"};

  transition: border-color 0.15s cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    cursor: pointer;
    border-color: ${({ $isActive, $isMy }) =>
      $isActive ? "#0C9799" : $isMy ? "#000" : "#0C9799"};
  }
`;

const LikeCountChip = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1px 5px;

  background-color: rgba(242, 238, 230, 0.8);

  border-radius: 6px;

  color: #100c0d;
  font-size: 0.65rem;
`;

export default ExploreList;
