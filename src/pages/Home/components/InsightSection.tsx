import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import colors from "../../../constants/colors";
import {
  homeSectionDescription,
  homeSectionEyebrow,
  homeSectionTitle,
} from "../styles/homeSectionStyles.ts";

const filterTabs = ["지금", "내일 오전"] as const;

const insights = [
  { name: "성산일출봉", value: 92, status: "혼잡", tone: "busy" },
  { name: "한라산 어리목", value: 54, status: "보통", tone: "normal" },
  { name: "협재해수욕장", value: 88, status: "혼잡", tone: "busy" },
  { name: "비자림", value: 32, status: "여유", tone: "calm" },
  { name: "쇠소깍", value: 28, status: "여유", tone: "calm" },
  { name: "월정리해변", value: 57, status: "보통", tone: "normal" },
] as const;

type FilterTabLabel = (typeof filterTabs)[number];

const InsightSection = () => {
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState<FilterTabLabel>("지금");

  return (
    <Section>
      <InsightFrame>
        <MapPanel>
          {/* 수정 필요 */}
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
            {/* 수정 필요 */}
            <LiveBadge>LIVE · 06.03 16:00</LiveBadge>
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

          <InsightDescription>
            한국관광공사 OpenAPI와 자체 예측 모델로 분 단위 혼잡도를 보여드려요.
          </InsightDescription>

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
            {insights.map((item) => (
              <RankRow key={item.name}>
                <PlaceInfo>
                  <LegendDot $tone={item.tone} />
                  <span>{item.name}</span>
                </PlaceInfo>
                <BarArea>
                  <ProgressTrack>
                    <ProgressFill $tone={item.tone} $value={item.value} />
                  </ProgressTrack>
                  <StatusBadge $tone={item.tone}>{item.status}</StatusBadge>
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

const InsightDescription = styled.p`
  ${homeSectionDescription};
  margin-bottom: 28px;
  color: #627076;
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

const ProgressFill = styled.div<{
  $tone: "busy" | "normal" | "calm";
  $value: number;
}>`
  width: ${({ $value }) => `${$value}%`};
  height: 100%;
  border-radius: inherit;
  background: ${({ $tone }) => {
    switch ($tone) {
      case "calm":
        return "#5e9768";
      case "normal":
        return "#ffa46f";
      default:
        return "#ff7028";
    }
  }};
`;

const StatusBadge = styled.span<{ $tone: "busy" | "normal" | "calm" }>`
  min-width: 44px;
  padding: 6px 10px;
  border-radius: 999px;
  background: ${({ $tone }) => {
    switch ($tone) {
      case "calm":
        return "#d8ead9";
      case "normal":
        return "#ffd6c0";
      default:
        return "#ff8b4a";
    }
  }};
  color: ${({ $tone }) => ($tone === "busy" ? "#fffaf4" : "#5a412a")};
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
