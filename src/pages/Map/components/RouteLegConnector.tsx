import styled from "styled-components";

export interface RouteSection {
  distance: number;
  duration: number;
}

interface RouteLegConnectorProps {
  section?: RouteSection;
}

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
