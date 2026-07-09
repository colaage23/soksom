import styled from "styled-components";

export interface RouteSection {
  distance: number; // meters
  duration: number; // seconds
}

interface RouteLegConnectorProps {
  section?: RouteSection;
}

// 관광지 사이 구간(경유지 → 다음 경유지)의 거리/시간을 보여주는 커넥터.
// 아직 데이터가 없을 때는(로딩 중) 빈 상태로만 표시
const RouteLegConnector = ({ section }: RouteLegConnectorProps) => {
  return (
    <LegConnectorRow>
      <LegConnectorLine />
      {section ? (
        <LegConnectorLabel>
          {(section.distance / 1000).toFixed(1)}km · 약{" "}
          {Math.max(1, Math.round(section.duration / 60))}분
        </LegConnectorLabel>
      ) : (
        <LegConnectorLabel $muted>경로 확인 중…</LegConnectorLabel>
      )}
    </LegConnectorRow>
  );
};

const LegConnectorRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  padding: 4px 0 4px 11px;
`;

const LegConnectorLine = styled.div`
  width: 0;
  height: 48px;
  flex-shrink: 0;

  border-left: 2px dashed #c8eae9;
`;

const LegConnectorLabel = styled.span<{ $muted?: boolean }>`
  color: ${({ $muted }) => ($muted ? "#c7cbc8" : "#0c9799")};
  font-size: 0.75rem;
  font-weight: 600;
`;

export default RouteLegConnector;
