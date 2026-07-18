import styled from "styled-components";
// import { congestionStyle, type Spot } from "../mock";
import { Heart, MoveRight } from "lucide-react";
import { useLikedSpotStore } from "../../../stores/useLikedSpotStore";
import type { ISearchSpotResponse } from "../../../types/spot";
import FallBackImage from "../../../assets/fallback.png";

interface ISpotCardProps {
  spot: ISearchSpotResponse;
  isActive: boolean;
  onClick: () => void;
  onArrowClick: () => void;
}

const SpotCard = ({
  spot,
  isActive,
  onClick,
  onArrowClick,
}: ISpotCardProps) => {
  const { likedSpot, toggleLikedSpot } = useLikedSpotStore();

  if (!spot) return null;

  // const status = congestionStyle[spot.congestion];

  return (
    <SpotCardContainer $isActive={isActive} onClick={onClick}>
      <SpotImageWrapper>
        <SpotImage src={spot.firstimage || FallBackImage} alt={spot.title} />
        <IconButton
          $active={likedSpot.includes(spot.contentid)}
          onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
            e.stopPropagation();
            toggleLikedSpot(spot.contentid);
          }}
        >
          <LikeIcon $active={likedSpot.includes(spot.contentid)} />
        </IconButton>
      </SpotImageWrapper>

      <SpotInfoBox>
        <SubInfoText>
          <span>{spot.addr1?.split(" ").slice(1, 3).join(" ")}</span>
          <span style={{ color: "#c0c5ca" }}>·</span>
          <span>{spot.lclsSystm2Nm}</span>
        </SubInfoText>

        <SpotName>{spot.title}</SpotName>

        {/* <CongestionBox>
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
        </CongestionBox> */}
      </SpotInfoBox>

      <ArrowButton
        onClick={(e) => {
          e.stopPropagation();
          onArrowClick();
        }}
      >
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
  margin: 0px 16px 0;

  border: 1px solid ${({ $isActive }) => ($isActive ? "#72c9c3" : "#f5f2eb")};
  border-radius: 1rem;

  background-color: ${({ $isActive }) => ($isActive ? "#e5faf8" : "#fdfcf8")};

  transition: 0.15s border cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    cursor: pointer;
    border: 1px solid #72c9c3;
  }

  &:hover ${ArrowButton} {
    opacity: 1;
    visibility: visible;
  }
`;

const ArrowIcon = styled(MoveRight)`
  width: 14px;
  height: 14px;
  stroke: #ffffff;
  stroke-width: 2;
`;

const SpotImageWrapper = styled.div`
  position: relative;

  width: 80px;
  height: 80px;
`;

const SpotImage = styled.img`
  width: 80px;
  height: 80px;

  border-radius: 0.75rem;
`;

const LikeIcon = styled(Heart)<{ $active?: boolean }>`
  width: 14px;
  height: 14px;
  stroke: ${({ $active }) => ($active ? "none" : "#999fa6")};
  fill: ${({ $active }) => ($active ? "#fdfcf8" : "none")};
  stroke-width: 2;
`;

const IconButton = styled.button<{ $active?: boolean }>`
  position: absolute;

  top: 6px;
  left: 6px;

  width: 28px;
  height: 28px;

  display: flex;
  justify-content: center;
  align-items: center;

  outline: none;
  border: none;
  border-radius: 30px;

  background-color: ${({ $active }) => ($active ? "#f77036" : "#fffafccc")};

  transition: 0.2s all ease;

  z-index: 999;

  &:hover {
    cursor: pointer;
  }

  &:hover ${LikeIcon} {
    stroke: ${({ $active }) => ($active ? "none" : "#f77036")};
  }
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
  font-weight: 300;

  margin: 0 0 4px;
`;

const SpotName = styled.h4`
  margin: 0;
  color: #0e1013;
  font-size: 0.875rem;
  font-weight: 500;
`;

// const CongestionBox = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   gap: 8px;

//   margin: 6px 0 0;
// `;

// const CongestionProgressBar = styled.div`
//   height: 4px;
//   width: 64px;

//   border-radius: 30px;

//   background-color: #eae6dd;
// `;

// const CongestionProgressFill = styled.div`
//   height: 4px;

//   border-radius: 30px;
// `;

// const CongestionBadge = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: center;

//   padding: 4px 8px;

//   border-radius: 30px;

//   color: #20201f;
//   font-size: 0.6875rem;
//   font-weight: 500;
// `;

export default SpotCard;
