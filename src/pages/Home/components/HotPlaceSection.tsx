import { ArrowUpRight, Flame, Leaf } from "lucide-react";
import { useMemo, useState } from "react";
import styled, { css } from "styled-components";
import colors from "../../../constants/colors";
import {
  homeSectionEyebrow,
  homeSectionInner,
  homeSectionTitle,
} from "../styles/homeSectionStyles.ts";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const filters = ["숨은 명소", "핫플레이스"] as const;

type FilterLabel = (typeof filters)[number];

type PlaceTone = "calm" | "hot";

type PlaceItem = {
  area: string;
  name: string;
  subtitle: string;
  description: string;
  occupancy: string;
  tag: string;
  tone: PlaceTone;
  image: string;
};

const placeSets: Record<FilterLabel, PlaceItem[]> = {
  "숨은 명소": [
    {
      area: "제주시 삼양동",
      name: "안돌오름 비밀의 숲",
      subtitle: "사람보다 바람 소리가 먼저 닿는 숲길",
      description:
        "사려니 숲길과는 또 다른 결의 편백나무 숲. 한낮에도 결이 차분해서 오래 머물기 좋습니다.",
      occupancy: "혼잡도 22%",
      tag: "숨은 명소",
      tone: "calm",
      image:
        "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1400&q=80",
    },
    {
      area: "서귀포시",
      name: "영평계곡",
      subtitle: "봄에 더 빛나는 조용한 물가",
      description:
        "노란 들판 뒤로 계곡이 이어져 산책 동선이 가볍습니다. 인생샷 명소지만 관광객 밀도는 낮은 편입니다.",
      occupancy: "혼잡도 18%",
      tag: "숨은 명소",
      tone: "calm",
      image:
        "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80",
    },
    {
      area: "제주시 애월읍",
      name: "수산봉 둘레길",
      subtitle: "노을 보기 좋은 짧은 오름 코스",
      description:
        "가볍게 오를 수 있는데 정상에서 바다 시야가 넓습니다. 해질 무렵에도 비교적 여유롭습니다.",
      occupancy: "혼잡도 26%",
      tag: "숨은 명소",
      tone: "calm",
      image:
        "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=900&q=80",
    },
    {
      area: "구좌읍 평대리",
      name: "평대 해안 산책로",
      subtitle: "바다 바로 옆을 걷는 조용한 루트",
      description:
        "세화보다 한 템포 느린 분위기. 카페 들르기보다 걷는 시간이 길어지는 코스입니다.",
      occupancy: "혼잡도 31%",
      tag: "숨은 명소",
      tone: "calm",
      image:
        "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=900&q=80",
    },
  ],
  핫플레이스: [
    {
      area: "서귀포시 안덕면",
      name: "논짓물 해변",
      subtitle: "석양 시간대가 가장 뜨거운 포인트",
      description:
        "노을과 얕은 수심 덕분에 사진 수요가 몰립니다. 해 질 무렵 전후 1시간은 빠르게 붐빕니다.",
      occupancy: "혼잡도 81%",
      tag: "핫플레이스",
      tone: "hot",
      image:
        "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=1400&q=80",
    },
    {
      area: "제주시 애월읍",
      name: "곽지해수욕장",
      subtitle: "한낮 방문 수요가 가장 높은 해변",
      description:
        "근처 카페와 함께 묶여 이동이 많습니다. 오후 시간대 체류 인원이 크게 늘어납니다.",
      occupancy: "혼잡도 74%",
      tag: "핫플레이스",
      tone: "hot",
      image:
        "https://images.unsplash.com/photo-1493558103817-58b2924bce98?auto=format&fit=crop&w=1200&q=80",
    },
    {
      area: "제주시 한림읍",
      name: "협재 포토스팟",
      subtitle: "사진 촬영 수요가 밀집되는 시간대",
      description:
        "주차장 회전은 빠르지만 촬영 대기열이 길어집니다. 오전보다 일몰 직전이 붐빕니다.",
      occupancy: "혼잡도 69%",
      tag: "핫플레이스",
      tone: "hot",
      image:
        "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=900&q=80",
    },
    {
      area: "성산읍 고성리",
      name: "광치기 해변",
      subtitle: "일출 직후 방문량이 급상승하는 해안",
      description:
        "성산일출봉과 함께 묶어 찾는 비율이 높습니다. 오전 피크에는 체류 밀도가 빠르게 높아집니다.",
      occupancy: "혼잡도 77%",
      tag: "핫플레이스",
      tone: "hot",
      image:
        "https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=900&q=80",
    },
  ],
};

const toneStyles = {
  calm: {
    pillBg: "rgba(36, 149, 155, 0.14)",
    pillFg: colors.main,
    glow: "rgba(36, 149, 155, 0.2)",
  },
  hot: {
    pillBg: "rgba(255, 132, 77, 0.16)",
    pillFg: "#ff7d43",
    glow: "rgba(255, 143, 92, 0.22)",
  },
} as const;

const HotPlaceSection = () => {
  const [selectedFilter] = useState<FilterLabel>("숨은 명소");

  const places = useMemo(() => placeSets[selectedFilter], [selectedFilter]);

  return (
    <Section>
      <Inner>
        <HeaderRow>
          <HeadingBlock>
            <Eyebrow>CURATED BY SOKSOM</Eyebrow>
            <Title>
              머물고 싶은 풍경,
              <br />
              <Accent>다시 찾고 싶은 여행지</Accent>.
            </Title>
          </HeadingBlock>

          {/* <FilterGroup aria-label="장소 필터">
            {filters.map((filter) => (
              <FilterButton
                key={filter}
                type="button"
                $active={selectedFilter === filter}
                onClick={() => setSelectedFilter(filter)}
              >
                {filter === "숨은 명소" ? (
                  <Leaf size={15} />
                ) : (
                  <Flame size={15} />
                )}
                {filter}
              </FilterButton>
            ))}
          </FilterGroup> */}
        </HeaderRow>

        <CardGrid>
          {places.map((place, index) => {
            const isFeatured = index === 0;

            return (
              <PlaceCard
                key={place.name}
                $featured={isFeatured}
                $tone={place.tone}
              >
                <PlaceImage $image={place.image} $featured={isFeatured}>
                  <CardTop>
                    <TagPill $tone={"hot"}>
                      <Flame size={15} />
                      <span style={{ color: "black" }}>핫플레이스</span>
                    </TagPill>
                    <CrowdBadge>{place.occupancy}</CrowdBadge>
                  </CardTop>
                </PlaceImage>

                <PlaceBody $featured={isFeatured}>
                  <Meta>{place.area}</Meta>
                  <Name>{place.name}</Name>
                  <Subtitle>{place.subtitle}</Subtitle>
                  <Summary>{place.description}</Summary>
                  <CardFooter>
                    <RouteHint>추천 루트 보기</RouteHint>
                    <ArrowButton
                      type="button"
                      aria-label={`${place.name} 상세 보기`}
                    >
                      <ArrowUpRight size={16} />
                    </ArrowButton>
                  </CardFooter>
                </PlaceBody>
              </PlaceCard>
            );
          })}
        </CardGrid>
      </Inner>
    </Section>
  );
};

export default HotPlaceSection;

const Section = styled.section`
  padding: 180px 24px;
  background: #f8f2e2;

  @media (max-width: 768px) {
    padding: 24px 16px 88px;
  }
`;

const Inner = styled.div`
  ${homeSectionInner};
`;

const HeaderRow = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 28px;
  margin-bottom: 42px;

  @media (max-width: 980px) {
    flex-direction: column;
    margin-bottom: 28px;
  }
`;

const HeadingBlock = styled.div`
  max-width: 760px;
`;

const Eyebrow = styled.span`
  ${homeSectionEyebrow};
`;

const Title = styled.h2`
  ${homeSectionTitle};
`;

const Accent = styled.span`
  font-family: Gowun Batang;
  color: #ff7d43;
`;

// const Description = styled.div`
//   ${homeSectionDescription};
//   max-width: 760px;

//   p {
//     margin: 0;
//   }

//   p + p {
//     margin-top: 4px;
//   }
// `;

// const FilterGroup = styled.div`
//   display: inline-flex;
//   align-items: center;
//   gap: 10px;
//   margin-top: 58px;
//   padding: 4px;
//   border: 1px solid rgba(124, 111, 84, 0.08);
//   border-radius: 999px;
//   background: rgba(255, 255, 255, 0.72);
//   box-shadow: 0 18px 34px rgba(97, 81, 46, 0.08);

//   @media (max-width: 980px) {
//     margin-top: 0;
//   }

//   @media (max-width: 480px) {
//     width: 100%;
//     justify-content: space-between;
//   }
// `;

// const FilterButton = styled.button<{ $active: boolean }>`
//   display: inline-flex;
//   align-items: center;
//   justify-content: center;
//   gap: 8px;
//   min-width: 120px;
//   padding: 10px 16px;
//   border: 0;
//   border-radius: 999px;
//   background: ${({ $active }) => ($active ? colors.main : "transparent")};
//   color: ${({ $active }) => ($active ? "#f8f6f0" : "#40382d")};
//   font-size: 0.92rem;
//   font-weight: 600;
//   white-space: nowrap;
//   cursor: pointer;
//   transition:
//     background-color 0.2s ease,
//     color 0.2s ease,
//     transform 0.2s ease;

//   &:hover {
//     transform: translateY(-1px);
//   }

//   @media (max-width: 480px) {
//     min-width: auto;
//     flex: 1;
//     padding: 11px 12px;
//   }
// `;

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: 1.8fr 0.9fr;
  gap: 18px;
  align-items: start;

  @media (max-width: 1100px) {
    grid-template-columns: 1fr;
  }
`;

const PlaceCard = styled.article<{ $featured?: boolean; $tone: PlaceTone }>`
  display: flex;
  flex-direction: column;
  height: 470px;
  overflow: hidden;
  border: 1px solid rgba(124, 111, 84, 0.08);
  border-radius: 34px;
  background: rgba(255, 251, 245, 0.88);
  box-shadow: 0 22px 44px rgba(97, 81, 46, 0.08);

  ${({ $tone }) => css`
    box-shadow: 0 22px 44px ${toneStyles[$tone].glow};
  `}

  @media (max-width: 768px) {
    height: 420px;
    border-radius: 28px;
  }
`;

const PlaceImage = styled.div<{ $image: string; $featured?: boolean }>`
  position: relative;
  height: 250px;
  padding: 18px;
  background:
    linear-gradient(rgba(25, 21, 17, 0.08), rgba(25, 21, 17, 0.08)),
    url(${({ $image }) => $image}) center center / cover no-repeat;

  @media (max-width: 768px) {
    height: 220px;
    padding: 14px;
  }
`;

const CardTop = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
`;

const TagPill = styled.span<{ $tone: PlaceTone }>`
  display: inline-flex;
  align-items: center;
  padding: 8px 12px;
  border-radius: 999px;
  background: whitesmoke;
  color: ${({ $tone }) => toneStyles[$tone].pillFg};
  font-size: 0.78rem;
  font-weight: 600;
  backdrop-filter: blur(12px);
  gap: 6px;
`;

const CrowdBadge = styled.span`
  display: inline-flex;
  align-items: center;
  padding: 8px 12px;
  border-radius: 999px;
  background: rgba(34, 31, 26, 0.74);
  color: #f5efe5;
  font-size: 0.76rem;
  font-weight: 600;
`;

const PlaceBody = styled.div<{ $featured?: boolean }>`
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 10px;
  padding: 24px 22px 20px;

  @media (max-width: 768px) {
    padding: 20px 18px 18px;
  }
`;

const Meta = styled.span`
  color: #9a9284;
  font-size: 0.82rem;
  font-weight: 600;
`;

const Name = styled.h3`
  margin: 0;
  color: #15120f;
  font-family: Gowun Batang;
  font-size: clamp(1.8rem, 3vw, 2.35rem);
  line-height: 1.12;
`;

const Subtitle = styled.p`
  margin: 0;
  color: #2d2822;
  font-size: 0.98rem;
  font-weight: 600;
`;

const Summary = styled.p`
  margin: 0;
  color: #6c6559;
  font-size: 0.93rem;
  line-height: 1.7;
`;

const CardFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 14px;
  margin-top: auto;
  padding-top: 18px;
`;

const RouteHint = styled.span`
  color: #7d7568;
  font-size: 0.84rem;
  font-weight: 600;
`;

const ArrowButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 38px;
  height: 38px;
  border: 0;
  border-radius: 999px;
  background: #12100d;
  color: #f8f5ee;
  cursor: pointer;
`;
