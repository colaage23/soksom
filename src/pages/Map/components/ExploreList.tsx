import { useEffect, useState } from "react";
import styled from "styled-components";
import SpotCard from "./SpotCard";
import { useSpotStore } from "../../../stores/useSpotStore";
import SearchBar from "./SearchBar";
import { Frown, Heart, Loader2 } from "lucide-react";
import { useLikedSpotStore } from "../../../stores/useLikedSpotStore";
import { useSearchKeywordStore } from "../../../stores/useSearchKeywordStorer";
import { useGetSpotsByKeyword } from "../../../hooks/spot/useGetSpotsByKeyword";
import { useGetSpotsByLocation } from "../../../hooks/spot/useGetSpotsByLocation";
import { useInView } from "react-intersection-observer";
import SkeletonCard from "./SkeletonCard";

const CATEGORY_TYPE_MAP: Record<string, string | null> = {
  전체: null,
  MY: null,
  관광지: "12",
  음식점: "39",
  숙박: "32",
  쇼핑: "38",
  문화시설: "14",
  행사: "15",
  레포츠: "28",
};

const ExploreList = () => {
  const [scrollContainer, setScrollContainer] =
    useState<HTMLUListElement | null>(null);

  const { selectedSpot, setSelectedSpot, setDetailSpot } = useSpotStore();
  const { likedSpot } = useLikedSpotStore();
  const { searchKeyword, setSearchKeyword } = useSearchKeywordStore();

  const { ref, inView } = useInView({ root: scrollContainer });

  const [keywordInput, setKeywordInput] = useState(searchKeyword);
  const [selectedCategory, setSelectedCategory] = useState("전체");
  const [isExpanded, setIsExpanded] = useState(false);

  const {
    data: keywordData,
    isLoading: keywordLoading,
    isError: keywordError,
    fetchNextPage: fetchNextKeyword,
    hasNextPage: hasNextKeyword,
    isFetchingNextPage: isFetchingNextKeyword,
  } = useGetSpotsByKeyword({ keyword: searchKeyword });

  const {
    data: locationData,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGetSpotsByLocation({
    mapX: "126.492778",
    mapY: "33.511111",
    radius: "20000",
  });

  useEffect(() => {
    if (!inView || selectedCategory === "MY") return;

    if (searchKeyword && hasNextKeyword && !isFetchingNextKeyword) {
      fetchNextKeyword();
    } else if (!searchKeyword && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [
    inView,
    searchKeyword,
    hasNextKeyword,
    hasNextPage,
    isFetchingNextKeyword,
    isFetchingNextPage,
    fetchNextKeyword,
    fetchNextPage,
    selectedCategory,
  ]);

  const spotsByKeyword = keywordData?.pages.flatMap((page) => page) ?? [];
  const spots = locationData?.pages.flatMap((page) => page) ?? [];

  const isCurrentLoading = searchKeyword ? keywordLoading : isLoading;
  const isCurrentError = searchKeyword ? keywordError : isError;

  const categories = Object.keys(CATEGORY_TYPE_MAP); // 또는 그냥 기존 배열 재사용
  const visibleCategories = isExpanded ? categories : categories.slice(0, 5);

  const displaySpots = searchKeyword ? (spotsByKeyword ?? []) : (spots ?? []);
  const filteredSpots = (() => {
    if (selectedCategory === "MY")
      return displaySpots.filter((spot) => likedSpot.includes(spot.contentid));
    const typeId = CATEGORY_TYPE_MAP[selectedCategory];
    if (!typeId) return displaySpots;
    return displaySpots.filter((spot) => spot?.contenttypeid === typeId);
  })();

  return (
    <ExploreListContainer>
      <SearchBar
        placeholder={"관광지 검색"}
        value={keywordInput}
        onChange={(e) => setKeywordInput(e.target.value)}
        onClear={() => setKeywordInput("")}
        onSearch={() => setSearchKeyword(keywordInput)}
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

      <SpotList ref={setScrollContainer}>
        {isCurrentLoading
          ? Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)
          : null}{" "}
        {isCurrentError && <p>에러가 발생했습니다.</p>}
        {!isCurrentLoading && filteredSpots?.length === 0 ? (
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
          <>
            {filteredSpots?.map((item, idx) => (
              <SpotCard
                key={idx}
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
            ))}
            {(isFetchingNextPage || isFetchingNextKeyword) &&
              selectedCategory !== "MY" && (
                <LoadingSpinner>
                  <Loader2 size={20} />
                </LoadingSpinner>
              )}

            <li ref={ref} style={{ height: 1 }} />
          </>
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

  display: flex;
  flex-direction: column;
  gap: 8px;

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

  padding: 0 16px 16px 16px;

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

const LoadingSpinner = styled.li`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 16px 0;
  color: #0c9799;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }

  svg {
    animation: spin 0.8s linear infinite;
  }
`;

export default ExploreList;
