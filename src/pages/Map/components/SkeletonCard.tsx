import styled from "styled-components";
import { Skeleton } from "../../../components/layout/common/Skeleton";

const SkeletonCard = () => {
  return (
    <SpotCardContainer>
      <Skeleton
        style={{ width: "80px", height: "80px", borderRadius: "0.75rem" }}
      />
      <SpotInfoBox>
        <Skeleton
          style={{ width: "40%", height: "10px", borderRadius: "0.25rem" }}
        />
        <Skeleton
          style={{ width: "30%", height: "16px", borderRadius: "0.25rem" }}
        />
        <Skeleton
          style={{ width: "50%", height: "12px", borderRadius: "0.25rem" }}
        />
      </SpotInfoBox>
    </SpotCardContainer>
  );
};

const SpotCardContainer = styled.div`
  display: flex;
  justify-content: start;
  align-items: start;
  gap: 16px;

  padding: 12px;
  margin: 0 16px 0 16px;

  border: 1px solid #f5f2eb;
  border-radius: 1rem;

  background-color: #fdfcf8;
`;

const SpotInfoBox = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  gap: 4px;

  padding: 6px 0;
`;

export default SkeletonCard;
