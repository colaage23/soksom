import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import styled, { keyframes } from "styled-components";
import { useNavigate } from "react-router-dom";
import colors from "../../../constants/colors";
import {
  homeSectionEyebrow,
  homeSectionTitle,
} from "../styles/homeSectionStyles.ts";
import { CustomOverlayMap, Map } from "react-kakao-maps-sdk";
import { getHomeMarkerSrc } from "../../../utils/marker.ts";
import { useGetSpotsDetail } from "../../../hooks/spot/useGetSpotsDetail";
import type { ISpotDetailRequest } from "../../../types/spot";
import { getCongestionStyle } from "../../../constants/congestion.utils";
import { insightSpots } from "../../../constants/insightSpots.ts";

const filterTabs = ["지금", "내일 오전"] as const;

const getYmd = (date: Date) => {
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");
  return `${yyyy}${mm}${dd}`;
};

const getTomorrowYmd = () => {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  return getYmd(tomorrow);
};

type FilterTabLabel = (typeof filterTabs)[number];

const InsightSection = () => {
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState<FilterTabLabel>("지금");
  const mapRef = useRef<kakao.maps.Map>(null);

  const insightRequests = useMemo<
    (ISpotDetailRequest & {
      name: string;
      latitude: number;
      longitude: number;
    })[]
  >(
    () =>
      insightSpots.map((spot) => ({
        ...spot,
        ...(selectedTab === "내일 오전" ? { baseYmd: getTomorrowYmd() } : {}),
      })),
    [selectedTab],
  );

  const spotDetailResults = useGetSpotsDetail(insightRequests);

  const liveInsights = useMemo(
    () =>
      insightRequests.map((spot, index) => {
        const result = spotDetailResults[index];
        const cnctrRate = result?.data?.congestion?.cnctrRate ?? null;
        const style = getCongestionStyle(cnctrRate);

        return {
          ...spot,
          value: cnctrRate ?? 0,
          status: style.label,
          bgColor: style.bgColor,
          textColor: style.color,
          isLoading: result?.isLoading ?? false,
        };
      }),
    [insightRequests, spotDetailResults],
  );

  useEffect(() => {
    let resizeObserver: ResizeObserver | null = null;
    let cleanupResize: (() => void) | null = null;

    const setup = () => {
      const map = mapRef.current;
      if (!map) {
        requestAnimationFrame(setup);
        return;
      }

      const center = map.getCenter();
      const relayout = () => {
        map.relayout();
        map.setCenter(center);
      };

      const container = document.getElementById("home-kakao-map");
      if (container) {
        resizeObserver = new ResizeObserver(relayout);
        resizeObserver.observe(container);
      }

      window.addEventListener("resize", relayout);
      cleanupResize = () => window.removeEventListener("resize", relayout);
    };

    setup();

    return () => {
      resizeObserver?.disconnect();
      cleanupResize?.();
    };
  }, []);

  return (
    <Section>
      <InsightFrame>
        <MapPanel>
          <Map
            id="home-kakao-map"
            center={{ lat: 33.34214, lng: 126.571986 }}
            style={{ width: "100%", height: "100%" }}
            level={10}
            draggable={false}
            zoomable={false}
            scrollwheel={false}
            disableDoubleClick={true}
            disableDoubleClickZoom={true}
            ref={mapRef}
          >
            {liveInsights.map((spot, index) => (
              <CustomOverlayMap
                key={spot.name}
                position={{ lat: spot.latitude, lng: spot.longitude }}
                yAnchor={1}
              >
                <MarkerFloatWrapper
                  style={{ animationDelay: `${index * 0.3}s` }}
                >
                  <MarkerLabel $bgColor={spot.bgColor}>
                    {spot.name} ·{" "}
                    {spot.isLoading ? "-" : `${Math.floor(+spot.value)}%`}
                  </MarkerLabel>
                  <MarkerPin
                    src={getHomeMarkerSrc(spot.bgColor)}
                    $bgColor={spot.bgColor}
                  />
                </MarkerFloatWrapper>
              </CustomOverlayMap>
            ))}
          </Map>

          <Legend>
            <LegendTitle>혼잡도</LegendTitle>
            <LegendItems>
              <LegendItem>
                <LegendDot $tone="calm" />
                여유
              </LegendItem>
              <LegendItem>
                <LegendDot $tone="normal" />
                보통
              </LegendItem>
              <LegendItem>
                <LegendDot $tone="busy" />
                혼잡
              </LegendItem>
            </LegendItems>
          </Legend>
        </MapPanel>

        <InsightContent>
          <LiveRow>
            <LiveBadge />
            <LiveStatus>
              <StatusPulse />
              실시간 업데이트
            </LiveStatus>
          </LiveRow>

          <InsightTitle>
            지금 제주, 어디가
            <br />
            <AccentText>붐비는지</AccentText> 한눈에.
          </InsightTitle>

          <FilterTabs>
            {filterTabs.map((tab) => (
              <FilterTab
                key={tab}
                type="button"
                $active={selectedTab === tab}
                aria-pressed={selectedTab === tab}
                onClick={() => setSelectedTab(tab)}
              >
                {tab}
              </FilterTab>
            ))}
          </FilterTabs>

          <RankList>
            {liveInsights.map((item) => (
              <RankRow key={item.name}>
                <PlaceInfo>
                  <ColorDot style={{ background: item.bgColor }} />
                  <span>{item.name}</span>
                </PlaceInfo>
                <BarArea>
                  <ProgressTrack>
                    <ProgressFill
                      style={{
                        width: `${item.isLoading ? 0 : item.value}%`,
                        background: item.bgColor,
                      }}
                    />
                  </ProgressTrack>
                  <StatusBadge
                    style={{
                      background: item.bgColor,
                      color: item.textColor,
                    }}
                  >
                    {item.isLoading ? "조회중" : item.status}
                  </StatusBadge>
                </BarArea>
              </RankRow>
            ))}
          </RankList>

          <DetailButton onClick={() => navigate("/map")}>
            혼잡도 지도 자세히 보기
            <ArrowUpRight size={18} />
          </DetailButton>
        </InsightContent>
      </InsightFrame>
    </Section>
  );
};

export default InsightSection;

const Section = styled.section`
  padding: 180px 24px;
  background: linear-gradient(180deg, #f6f2e9 0%, #f7f3eb 48%, #f3eee3 100%);

  @media (max-width: 768px) {
    padding: 32px 16px 72px;
  }
`;

const InsightFrame = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1.3fr) minmax(320px, 0.9fr);
  gap: 34px;
  margin: 0 auto;
  padding: 28px;
  border: 1px solid rgba(124, 111, 84, 0.08);
  border-radius: 34px;
  background: rgba(250, 246, 239, 0.9);
  box-shadow: 0 20px 60px rgba(73, 55, 27, 0.08);

  @media (max-width: 1200px) {
    grid-template-columns: 1fr;
  }

  @media (max-width: 768px) {
    gap: 22px;
    padding: 18px;
    border-radius: 26px;
  }
`;

const MapPanel = styled.div`
  position: relative;
  min-height: 594px;
  border-radius: 28px;
  overflow: hidden;
  background:
    radial-gradient(
      circle at top left,
      rgba(255, 240, 184, 0.95),
      transparent 42%
    ),
    linear-gradient(135deg, #fff8dc 0%, #f5efcf 48%, #ede4bf 100%);

  @media (max-width: 768px) {
    min-height: 420px;
    border-radius: 22px;
  }
`;

const Legend = styled.div`
  position: absolute;
  left: 20px;
  bottom: 18px;
  display: inline-flex;
  align-items: center;
  gap: 14px;
  padding: 12px 16px;
  border-radius: 18px;
  background: rgba(255, 250, 242, 0.92);
  box-shadow: 0 16px 28px rgba(92, 74, 43, 0.08);

  z-index: 9999;

  @media (max-width: 768px) {
    left: 14px;
    right: 14px;
    bottom: 14px;
    justify-content: space-between;
    gap: 10px;
    padding: 10px 12px;
  }
`;

const LegendTitle = styled.span`
  color: #40392d;
  font-size: 0.84rem;
  font-weight: 700;
`;

const LegendItems = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
`;

const LegendItem = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 7px;
  color: #6f6657;
  font-size: 0.8rem;
  font-weight: 600;
`;

const LegendDot = styled.span<{ $tone: "busy" | "normal" | "calm" }>`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: ${({ $tone }) => {
    switch ($tone) {
      case "calm":
        return "#61986a";
      case "normal":
        return "#ffb183";
      default:
        return "#ff742b";
    }
  }};
`;

const InsightContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 8px 6px 8px 0;

  @media (max-width: 1200px) {
    padding: 0;
  }
`;

const LiveRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 10px;

  @media (max-width: 768px) {
    align-items: flex-start;
    flex-direction: column;
  }
`;

const LiveBadge = styled.span`
  ${homeSectionEyebrow};
  margin-bottom: 0;
`;

const LiveStatus = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: #68767c;
  font-size: 0.8rem;
`;

const StatusPulse = styled.span`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #ff915f;
  box-shadow: 0 0 0 6px rgba(255, 145, 95, 0.12);
`;

const InsightTitle = styled.h2`
  ${homeSectionTitle};
  color: #191611;
`;

const AccentText = styled.span`
  color: ${colors.main};
  font-family: Gowun Batang;
`;

const FilterTabs = styled.div`
  display: inline-flex;
  gap: 8px;
  margin-bottom: 30px;
  padding: 4px;
  border-radius: 999px;
  background: rgba(228, 221, 210, 0.52);
  width: fit-content;
`;

const FilterTab = styled.button<{ $active?: boolean }>`
  padding: 12px 18px;
  border: 0;
  border-radius: 999px;
  background: ${({ $active }) => ($active ? "#fffaf2" : "transparent")};
  color: ${({ $active }) => ($active ? "#2b2721" : "#62584c")};
  font-size: 0.92rem;
  font-weight: 700;
  box-shadow: ${({ $active }) =>
    $active ? "0 8px 16px rgba(99, 83, 53, 0.08)" : "none"};
  cursor: pointer;
`;

const RankList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 18px;
`;

const RankRow = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(160px, 1fr);
  align-items: center;
  gap: 20px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 10px;
  }
`;

const ColorDot = styled.span`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  flex-shrink: 0;
`;

const PlaceInfo = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  min-width: 0;
  color: #242019;
  font-weight: 700;

  span {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

const BarArea = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  align-items: center;
  gap: 12px;
`;

const ProgressTrack = styled.div`
  position: relative;
  height: 6px;
  border-radius: 999px;
  background: #e8e0d2;
  overflow: hidden;
`;

const ProgressFill = styled.div`
  height: 100%;
  border-radius: inherit;
`;

const StatusBadge = styled.span`
  min-width: 44px;
  padding: 6px 10px;
  border-radius: 999px;
  font-size: 0.8rem;
  font-weight: 800;
  text-align: center;
`;

const DetailButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: fit-content;
  margin-top: 36px;
  padding: 15px 22px;
  border: 0;
  border-radius: 999px;
  background: linear-gradient(135deg, #1c858b 0%, ${colors.main} 100%);
  color: #fffef7;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 18px 26px rgba(35, 124, 121, 0.2);

  &:hover {
    filter: brightness(0.97);
  }

  @media (max-width: 768px) {
    width: 100%;
    margin-top: 28px;
  }
`;

const float = keyframes`
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-3px);
  }
`;

const MarkerFloatWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;

  animation: ${float} 2.4s ease-in-out infinite;
`;

const MarkerPin = styled.img<{ $bgColor: string }>`
  width: 24px;
  height: 24px;

  border: 3px solid ${({ $bgColor }) => `${$bgColor}80`};
  border-radius: 50%;

  box-shadow: 0 6px 8px rgba(0, 0, 0, 0.1);
`;

const MarkerLabel = styled.div<{ $bgColor: string }>`
  padding: 4px 8px;
  background-color: ${({ $bgColor }) => `${$bgColor}`};
  border-radius: 6px;
  color: #fff;
  font-size: 0.625rem;
  font-weight: 600;
  white-space: nowrap;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
`;
