import styled from "styled-components";
import { Route } from "lucide-react";

interface RouteSummaryCardProps {
  distance?: number; // meters
  duration?: number; // seconds
  resultMsg?: string;
}

// 원본 카카오모빌리티 응답을 그대로 받지 않고, 필요한 값만 정제해서 받는다.
// 셋 다 없으면 보여줄 게 없으므로 렌더링하지 않음
const RouteSummaryCard = ({
  distance,
  duration,
  resultMsg,
}: RouteSummaryCardProps) => {
  const hasStats = typeof distance === "number" || typeof duration === "number";

  if (!hasStats && !resultMsg) return null;

  return (
    <Card>
      <IconBadge>
        <RouteIcon />
      </IconBadge>

      <Content>
        <Title>이 일차 경로</Title>

        {hasStats && (
          <Stats>
            {typeof distance === "number" && (
              <span>{(distance / 1000).toFixed(1)}km</span>
            )}
            {typeof distance === "number" && typeof duration === "number" && (
              <Divider>·</Divider>
            )}
            {typeof duration === "number" && (
              <span>약 {Math.round(duration / 60)}분</span>
            )}
          </Stats>
        )}

        {resultMsg && <Message>{resultMsg}</Message>}
      </Content>
    </Card>
  );
};

const Card = styled.div`
  margin-top: 12px;

  width: 100%;

  display: flex;
  align-items: flex-start;
  gap: 10px;

  padding: 12px 14px;

  border: 1px solid #b2e8e5;
  border-radius: 14px;

  background: linear-gradient(180deg, #e5faf8 0%, #f0faf9 100%);
`;

const IconBadge = styled.div`
  flex-shrink: 0;

  display: flex;
  justify-content: center;
  align-items: center;

  width: 28px;
  height: 28px;

  border-radius: 9999px;
  background-color: #0c9799;
`;

const RouteIcon = styled(Route)`
  width: 15px;
  height: 15px;
  stroke: #fdfcf8;
  stroke-width: 2.2;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;

  min-width: 0;
`;

const Title = styled.span`
  font-size: 0.75rem;
  font-weight: 600;
  color: #0c9799;
`;

const Stats = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;

  font-size: 0.875rem;
  font-weight: 700;
  color: #101714;
`;

const Divider = styled.span`
  color: #b2e8e5;
`;

const Message = styled.p`
  margin: 2px 0 0;

  color: #5c6763;
  font-size: 0.75rem;

  word-break: keep-all;
`;

export default RouteSummaryCard;
