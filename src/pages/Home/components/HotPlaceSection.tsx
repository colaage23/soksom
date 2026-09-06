import { ArrowUpRight, Flame } from "lucide-react";
import { useNavigate } from "react-router-dom";
import styled, { css } from "styled-components";
import colors from "../../../constants/colors";
import { useGetHotPlaces } from "../../../hooks/hotPlace/useGetHotPlaces";
import {
  homeSectionEyebrow,
  homeSectionInner,
  homeSectionTitle,
} from "../styles/homeSectionStyles.ts";

type PlaceTone = "calm" | "hot";

const placeImages = [
  "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=1400&q=80",
  "https://images.unsplash.com/photo-1493558103817-58b2924bce98?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=900&q=80",
];

const getCurrentBaseYm = () => {
  const today = new Date();
  today.setMonth(today.getMonth() - 2);
  return `${today.getFullYear()}${String(today.getMonth() + 1).padStart(2, "0")}`;
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
  const navigate = useNavigate();
  const baseYm = getCurrentBaseYm();
  const { data: places = [], isLoading, isError } = useGetHotPlaces(baseYm);

  const handleMoveToPlace = (placeName: string) => {
    const searchParams = new URLSearchParams({ keyword: placeName });
    navigate({ pathname: "/map", search: `?${searchParams.toString()}` });
  };

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
        </HeaderRow>

        {isLoading ? (
          <StatusCard>핫플레이스를 불러오는 중이에요.</StatusCard>
        ) : isError ? (
          <StatusCard>핫플레이스를 불러오지 못했어요.</StatusCard>
        ) : places.length === 0 ? (
          <StatusCard>이번 달 핫플레이스 정보가 아직 없어요.</StatusCard>
        ) : (
          <CardGrid>
            {places.map((place, index) => {
              const isFeatured = index === 0;

              return (
                <PlaceCard
                  key={place.hubTatsCd}
                  $featured={isFeatured}
                  $tone="hot"
                >
                  <PlaceImage
                    $image={placeImages[index % placeImages.length]}
                    $featured={isFeatured}
                  >
                    <CardTop>
                      <TagPill $tone="hot">
                        <Flame size={15} />
                        <span style={{ color: "black" }}>핫플레이스</span>
                      </TagPill>
                      <CrowdBadge>인기 {place.hubRank}위</CrowdBadge>
                    </CardTop>
                  </PlaceImage>

                  <PlaceBody $featured={isFeatured}>
                    <Meta>{place.signguNm || place.areaNm}</Meta>
                    <Name>{place.hubTatsNm}</Name>
                    <Subtitle>{place.hubCtgryMclsNm}</Subtitle>
                    <Summary>
                      {place.hubCtgryLclsNm} 분야에서 주목받는 제주 인기
                      관광지예요.
                    </Summary>
                    <CardFooter>
                      <RouteHint>관광지 상세 보기</RouteHint>
                      <ArrowButton
                        type="button"
                        aria-label={`${place.hubTatsNm} 상세 보기`}
                        onClick={() => handleMoveToPlace(place.hubTatsNm)}
                      >
                        <ArrowUpRight size={16} />
                      </ArrowButton>
                    </CardFooter>
                  </PlaceBody>
                </PlaceCard>
              );
            })}
          </CardGrid>
        )}
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

const StatusCard = styled.div`
  display: grid;
  place-items: center;
  min-height: 320px;
  padding: 24px;
  border-radius: 26px;
  background: rgba(255, 251, 245, 0.88);
  color: #7d7568;
  font-weight: 600;
  text-align: center;
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
