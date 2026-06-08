import styled from "styled-components";
import { congestionStyle, type Spot } from "../mock";
import {
  CalendarPlus,
  Clock,
  Heart,
  MoveLeft,
  Share2,
  Sparkles,
  Ticket,
} from "lucide-react";
import { useState } from "react";

interface ISpotDetailProps {
  spot: Spot;
  setSelectedSpot: React.Dispatch<React.SetStateAction<Spot | null>>;
}

const SpotDetail = ({ spot, setSelectedSpot }: ISpotDetailProps) => {
  const status = congestionStyle[spot.congestion];

  const [isExpanded, setIsExpanded] = useState(false);

  const isLongText = spot.overview.length > 80;

  return (
    <SpotDetailContainer>
      <SpotHeaderWrapper>
        <SpotImage draggable={false} src={spot?.firstimage} />

        <SpotActions>
          <IconButton onClick={() => setSelectedSpot(null)}>
            <BackIcon />
          </IconButton>

          <RightGroup>
            <IconButton>
              <LikeIcon />
            </IconButton>
            {/* 공유한다고 하면 어떤 형태? */}
            <IconButton>
              <ShareIcon />
            </IconButton>
          </RightGroup>
        </SpotActions>

        <SpotHeader>
          <SpotName>{spot?.name}</SpotName>
          <SpotAddress>{spot?.addr1}</SpotAddress>
        </SpotHeader>
      </SpotHeaderWrapper>

      <SpotContent>
        <CongestionBox>
          <CongestionTitle>
            <span>혼잡도</span>
            <CongestionBadge
              style={{
                backgroundColor:
                  spot.congestion === "혼잡"
                    ? status.bgColor
                    : `${status.bgColor}65`,
                color: status.color,
              }}
            >
              {status.label}
            </CongestionBadge>
          </CongestionTitle>
          <CongestionProgressBar>
            <CongestionProgressFill
              style={{
                backgroundColor: status.bgColor,
                width: `${status.progress}%`,
              }}
            />
          </CongestionProgressBar>

          <CongestionText>
            <span>0%</span>
            <span>100%</span>
          </CongestionText>

          <CongestionDescription>{status.description}</CongestionDescription>
        </CongestionBox>

        <OverviewBox>
          <OverviewTitle>상세 정보</OverviewTitle>
          <OverviewDescription $expanded={isExpanded}>
            {spot.overview}
          </OverviewDescription>
          {isLongText && (
            <MoreButton onClick={() => setIsExpanded((prev) => !prev)}>
              {isExpanded ? "접기" : "더보기"}
            </MoreButton>
          )}
        </OverviewBox>

        <InfoContainer>
          <InfoBox>
            <InfoIconBadge>
              <ClockIcon />
            </InfoIconBadge>
            <InfoTitle>이용 시간</InfoTitle>
            <InfoText>{spot.openingHours}</InfoText>
          </InfoBox>
          <InfoBox>
            <InfoIconBadge>
              <TicketIcon />
            </InfoIconBadge>
            <InfoTitle>입장료</InfoTitle>
            <InfoText>{spot.fee}</InfoText>
          </InfoBox>
          <InfoBox
            style={{ gridColumn: "1 / -1", backgroundColor: "#e5faf880" }}
          >
            <InfoIconBadge>
              <SparklesIcon />
            </InfoIconBadge>
            <InfoTitle>추천 방문 시간</InfoTitle>
            <InfoText>{spot.recommendedTime}</InfoText>
          </InfoBox>
        </InfoContainer>

        {/* 대체 관광지 어떻게 불러오지? 우선 api는 없음 */}
        <RecommendationBox>
          <RecommendationTitle>{status.recommendation}</RecommendationTitle>
          {spot.recommendations.map((item) => (
            <RecommendationCard key={item.id}>
              <RecommendationImage src={item.firstimage} alt={item.name} />

              <RecommendationContent>
                <RecommendationName>{item.name}</RecommendationName>
                <RecommendationInfo>
                  <span>{item.addr1}</span>
                  <span style={{ color: "#c0c5ca" }}> · </span>
                  <span>{item.category}</span>
                </RecommendationInfo>
              </RecommendationContent>

              <CongestionProgressBar style={{ height: "4px", width: "40px" }}>
                <CongestionProgressFill
                  style={{
                    height: "4px",
                    backgroundColor: congestionStyle[item.congestion].bgColor,
                    width: `${congestionStyle[item.congestion].progress}%`,
                  }}
                />
              </CongestionProgressBar>
            </RecommendationCard>
          ))}
        </RecommendationBox>
        <AddToPlanButton>
          <CalendarPlusIcon /> 내 일정에 추가
        </AddToPlanButton>
      </SpotContent>
    </SpotDetailContainer>
  );
};

const SpotDetailContainer = styled.div`
  height: 100%;
  width: 420px;

  display: flex;
  flex-direction: column;

  border-left: 1px solid #f5f2eb;

  background-color: #fdfcf8;
`;

const SpotHeaderWrapper = styled.div`
  position: relative;
`;

const SpotImage = styled.img`
  height: 192px;
  width: 100%;

  display: block;

  object-fit: cover;
`;

const SpotActions = styled.div`
  position: absolute;

  width: 100%;

  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 0 16px 0;

  top: 1rem;
`;

const RightGroup = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
`;

const BackIcon = styled(MoveLeft)`
  width: 16px;
  height: 16px;
  stroke: currentColor;
  stroke-width: 2;
`;

const LikeIcon = styled(Heart)`
  width: 16px;
  height: 16px;
  stroke: currentColor;
  stroke-width: 2;
`;

const ShareIcon = styled(Share2)`
  width: 16px;
  height: 16px;
  stroke: currentColor;
  stroke-width: 2;
`;

const IconButton = styled.button`
  width: 36px;
  height: 36px;

  display: flex;
  justify-content: center;
  align-items: center;

  outline: none;
  border: none;
  border-radius: 30px;

  background-color: rgba(247, 242, 235, 0.75);

  transition: 0.2s all ease;

  &:hover {
    cursor: pointer;
    background-color: rgba(247, 242, 235, 1);
  }

  &:hover ${LikeIcon} {
    color: #f77036;
  }
`;

const SpotHeader = styled.div`
  position: absolute;

  display: flex;
  flex-direction: column;

  bottom: 1rem;
  left: 1rem;
`;

const SpotName = styled.h2`
  font-family: Gowun Batang;
  font-weight: 600;
  font-size: 1.25rem;

  margin: 0;

  color: #fffafc;
  text-shadow: 0 0 2px rgba(0, 0, 0, 0.5);

  line-height: 1.75rem;
`;

const SpotAddress = styled.p`
  font-size: 0.75rem;

  margin: 0;

  color: #fffafccc;
  text-shadow: 0 0 2px rgba(0, 0, 0, 0.4);

  line-height: 1rem;
`;

const SpotContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;

  padding: 20px;

  overflow-y: auto;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const CongestionBox = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: space-between;

  padding: 16px;
  margin: 0 0 20px;

  border: 1px solid #f5f3eb;
  border-radius: 16px;
`;

const CongestionTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  margin: 0 0 12px;

  color: #2e3339;
  font-size: 0.75rem;
  font-weight: 600;
`;

const CongestionBadge = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  padding: 4px 8px;

  border-radius: 30px;

  color: #20201f;
  font-size: 0.75rem;
  font-weight: 500;
`;

const CongestionProgressBar = styled.div`
  height: 8px;
  width: 100%;

  border-radius: 30px;

  background-color: #eae6dd;
`;

const CongestionProgressFill = styled.div`
  height: 8px;

  border-radius: 30px;
`;

const CongestionText = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  margin: 8px 0 0;

  color: #6c727a;
  font-size: 0.75rem;
`;

const CongestionDescription = styled.p`
  display: flex;
  justify-content: start;
  align-items: center;

  margin: 12px 0 0;

  color: #484e54;
  font-size: 0.75rem;
`;

const OverviewBox = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 0 20px;
`;

const OverviewTitle = styled.h3`
  margin: 0 0 8px;

  color: #2e3339;
  font-size: 0.75rem;
  font-weight: 600;

  line-height: 1rem;
  letter-spacing: 0.05em;
`;

const OverviewDescription = styled.p<{ $expanded: boolean }>`
  margin: 0;

  color: #1c2024;
  font-size: 0.875rem;
  font-weight: 300;

  line-height: 1.625;

  display: -webkit-box;
  -webkit-line-clamp: ${({ $expanded }) => ($expanded ? "unset" : 2)};
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const MoreButton = styled.button`
  margin-top: 6px;

  background: none;
  border: none;
  padding: 0;

  font-size: 0.75rem;
  color: #298e8c;
  font-weight: 600;

  cursor: pointer;

  align-self: flex-start;
`;

const InfoContainer = styled.div`
  width: 100%;

  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  align-items: center;
  gap: 12px;

  margin: 0 0 20px;
`;

const InfoBox = styled.div`
  height: 100%;
  width: 100%;

  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: start;

  padding: 12px;

  border: 1px solid #f5f3eb;
  border-radius: 16px;
`;

const ClockIcon = styled(Clock)`
  width: 16px;
  height: 16px;
  stroke: #097575;
  stroke-width: 2;
`;

const TicketIcon = styled(Ticket)`
  width: 16px;
  height: 16px;
  stroke: #097575;
  stroke-width: 2;
`;

const SparklesIcon = styled(Sparkles)`
  width: 16px;
  height: 16px;
  stroke: #097575;
  stroke-width: 2;
`;

const InfoIconBadge = styled.div`
  width: 32px;
  height: 32px;

  display: flex;
  justify-content: center;
  align-items: center;

  margin: 0 0 8px;

  background-color: #cbf1ee;

  border-radius: 14px;
`;

const InfoTitle = styled.p`
  margin: 0;
  color: #6c727a;
  font-size: 0.6875rem;
  line-height: 1rem;
`;

const InfoText = styled.p`
  margin: 0;

  color: #100c0d;
  font-size: 0.875rem;
  font-weight: 600;

  word-break: keep-all;

  line-height: 1.25rem;
`;

const RecommendationBox = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;

  margin: 0 0 20px;

  gap: 8px;
`;

const RecommendationTitle = styled.h3`
  margin: 0 0 8px;

  color: #2e3339;
  font-size: 0.75rem;
  font-weight: 600;

  line-height: 1rem;
  letter-spacing: 0.05em;
`;

const RecommendationCard = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 12px;

  padding: 12px;

  border: 1px solid #f5f3eb;
  border-radius: 16px;
`;

const RecommendationImage = styled.img`
  height: 40px;
  width: 40px;

  border-radius: 12px;
`;

const RecommendationContent = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const RecommendationName = styled.p`
  margin: 0;

  color: #100c0d;
  font-size: 0.875rem;
  font-weight: 600;

  line-height: 1.625rem;
`;

const RecommendationInfo = styled.div`
  margin: 0;

  color: #6c727a;
  font-size: 0.6875rem;
`;

const CalendarPlusIcon = styled(CalendarPlus)`
  width: 14px;
  height: 14px;
  stroke: currentColor;
  stroke-width: 2;
`;

const AddToPlanButton = styled.button`
  box-sizing: border-box;

  height: 48px;
  width: 100%;

  flex-shrink: 0;

  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;

  outline: none;
  border: none;
  border-radius: 9999px;

  background-color: #298e8c;

  color: #fffafc;
  font-size: 0.875rem;
  font-weight: 600;

  line-height: 1.25rem;

  &:hover {
    cursor: pointer;
  }
`;

export default SpotDetail;
