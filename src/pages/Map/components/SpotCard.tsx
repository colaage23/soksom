import styled from "styled-components";
import type { Spot } from "../mock";
import { MoveRight } from "lucide-react";

interface ISpotCardProps {
  spot: Spot;
  isActive: boolean;
  onClick: () => void;
}

const congestionStyle = {
  여유: {
    label: "여유",
    bgColor: "#4CAF50",
    color: "#12462c",
    progress: 30,
  },
  보통: {
    label: "보통",
    bgColor: "#f3d843",
    color: "#625019",
    progress: 60,
  },
  혼잡: {
    label: "혼잡",
    bgColor: "#F97316",
    color: "#fdfcf8",
    progress: 90,
  },
} as const;

const SpotCard = ({ spot, isActive, onClick }: ISpotCardProps) => {
  const status = congestionStyle[spot.congestion];

  return (
    <SpotCardContainer $isActive={isActive} onClick={onClick}>
      <SpotImage src={spot.firstimage} />

      <SpotInfoBox>
        <SubInfoText>
          <span>{spot.addr1}</span>
          <span style={{ color: "#c0c5ca" }}>·</span>
          <span>{spot.category}</span>
        </SubInfoText>

        <SpotName>{spot.name}</SpotName>

        <CongestionBox>
          <CongestionProgressBar>
            <CongestionProgressFill
              style={{
                backgroundColor: status.bgColor,
                width: `${status.progress}%`,
              }}
            />
          </CongestionProgressBar>
          <CongestionBadge
            style={{
              backgroundColor:
                spot.congestion === "혼잡"
                  ? status.bgColor
                  : `${status.bgColor}65`,
              color: status.color,
            }}
          >
            {spot.congestion}
          </CongestionBadge>
        </CongestionBox>
      </SpotInfoBox>

      <ArrowButton>
        <ArrowIcon />
      </ArrowButton>
    </SpotCardContainer>
  );
};

const ArrowButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;

  height: 32px;
  width: 32px;

  outline: none;
  border: none;
  border-radius: 30px;

  background-color: #000;

  opacity: 0;
  visibility: hidden;

  transition: all 0.1s ease;

  &:hover {
    cursor: pointer;
  }
`;

const SpotCardContainer = styled.div<{ $isActive: boolean }>`
  display: flex;
  justify-content: start;
  align-items: center;
  gap: 16px;

  padding: 12px;
  margin: 16px 16px 0;

  border: 1px solid ${({ $isActive }) => ($isActive ? "#72c9c3" : "#f5f2eb")};
  border-radius: 1rem;

  background-color: ${({ $isActive }) => ($isActive ? "#e5faf8" : "#fdfcf8")};

  transition: 0.15s border cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    cursor: pointer;
    border: 1px solid #72c9c3;
  }

  &:hover ${ArrowButton} {
    opacity: ${({ $isActive }) => ($isActive ? 0 : 1)};
    visibility: ${({ $isActive }) => ($isActive ? "hidden" : "visible")};
  }
`;

const ArrowIcon = styled(MoveRight)`
  width: 14px;
  height: 14px;
  stroke: #ffffff;
  stroke-width: 2;
`;

const SpotImage = styled.img`
  width: 80px;
  height: 80px;

  border-radius: 0.75rem;
`;

const SpotInfoBox = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
`;

const SubInfoText = styled.div`
  height: 20px;

  display: flex;
  justify-content: center;
  align-items: center;
  gap: 6px;

  color: #6e767c;
  font-size: 0.6875rem;

  margin: 0 0 4px;
`;

const SpotName = styled.h4`
  margin: 0;
  color: #0e1013;
  font-size: 0.875rem;
  font-weight: 600;
`;

const CongestionBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;

  margin: 6px 0 0;
`;

const CongestionProgressBar = styled.div`
  height: 4px;
  width: 64px;

  border-radius: 30px;

  background-color: #eae6dd;
`;

const CongestionProgressFill = styled.div`
  height: 4px;

  border-radius: 30px;
`;

const CongestionBadge = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  padding: 4px 8px;

  border-radius: 30px;

  color: #20201f;
  font-size: 0.6875rem;
  font-weight: 500;
`;

export default SpotCard;
