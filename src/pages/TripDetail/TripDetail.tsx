import { ChevronLeft, Sparkles } from "lucide-react";
import { useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import type { ITripDetail } from "../../types/trip";
import { useGetTripDetail } from "../../hooks/trip/useGetTripDetail";
import TripDaySection from "./components/TripDaySection";

const dayColors = [
  "#0c9799",
  "#c0678c",
  "#9b7ed8",
  "#ef8a3d",
  "#5b7fbe",
  "#7c9c5f",
  "#d4a72c",
];
const formatDateRange = (start: string, end: string) => {
  const s = start ? start.slice(0, 10).replace(/-/g, ".") : "날짜 미정";
  const e = end ? end.slice(0, 10).replace(/-/g, ".") : s;
  return `${s} - ${e}`;
};

const groupByVisitDate = (details: ITripDetail[]) => {
  const grouped = details.reduce<Record<string, ITripDetail[]>>((acc, item) => {
    if (!acc[item.visitDate]) acc[item.visitDate] = [];
    acc[item.visitDate].push(item);
    return acc;
  }, {});

  Object.values(grouped).forEach((items) =>
    items.sort((a, b) => Number(a.visitOrder) - Number(b.visitOrder)),
  );

  return grouped;
};

const TripDetail = () => {
  const { tripId } = useParams<{ tripId: string }>();
  const navigate = useNavigate();
  const { data: trip, isLoading, isError } = useGetTripDetail(tripId ?? "");

  const groupedDetails = useMemo(
    () => (trip ? groupByVisitDate(trip.details) : {}),
    [trip],
  );
  const dates = useMemo(
    () => Object.keys(groupedDetails).sort(),
    [groupedDetails],
  );

  if (isLoading) {
    return (
      <TripDetailContainer>
        <StateCard>일정을 불러오는 중입니다.</StateCard>
      </TripDetailContainer>
    );
  }

  if (isError || !trip) {
    return (
      <TripDetailContainer>
        <StateCard>여행 정보를 불러오지 못했습니다.</StateCard>
      </TripDetailContainer>
    );
  }

  return (
    <TripDetailContainer>
      <TripDetailWrapper>
        <BackButton type="button" onClick={() => navigate(-1)}>
          <ChevronLeft size={18} />
          <span>돌아가기</span>
        </BackButton>
        <HeaderCard>
          <HeaderTop>
            {(trip.isAiRoute === "Y" || trip.isAiRoute === "true") && (
              <StatusPill>
                <Sparkles size={12} />
                AI 추천 일정
              </StatusPill>
            )}
          </HeaderTop>
          <TripTitle>{trip.tripName}</TripTitle>
          <TripDate>{formatDateRange(trip.startDate, trip.endDate)}</TripDate>
          <TripMeta>총 {trip.details.length}개의 장소</TripMeta>
        </HeaderCard>

        {dates.map((date, dayIndex) => (
          <TripDaySection
            key={date}
            date={date}
            dayIndex={dayIndex}
            spots={groupedDetails[date]}
            dayColor={dayColors[dayIndex % dayColors.length]}
          />
        ))}
      </TripDetailWrapper>
    </TripDetailContainer>
  );
};

export default TripDetail;

const TripDetailContainer = styled.div`
  min-height: calc(100vh - 72px);
  padding: 24px 20px 72px;
  background-color: #fdfcf8;

  @media (max-width: 768px) {
    padding: 16px 12px 48px;
  }
`;

const TripDetailWrapper = styled.div`
  max-width: 640px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 18px;
`;

const BackButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  width: fit-content;

  padding: 0;
  border: none;
  background: transparent;

  color: #7b827d;
  font-size: 0.8125rem;
  font-weight: 600;
  cursor: pointer;

  &:hover {
    color: #0c9799;
  }
`;

const StateCard = styled.div`
  padding: 40px 24px;
  border: 1px dashed #edebe5;
  border-radius: 16px;
  background: #fff;
  color: #7b827d;
  font-size: 0.875rem;
  font-weight: 500;
  text-align: center;
`;

const HeaderCard = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;

  padding: 20px;
  border: 1px solid #edebe5;
  border-radius: 16px;
  background: #fff;
`;

const HeaderTop = styled.div`
  display: flex;
`;

const StatusPill = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 4px;

  padding: 4px 10px;
  border-radius: 9999px;
  background: #e5faf8;

  color: #0c9799;
  font-size: 0.6875rem;
  font-weight: 700;
`;

const TripTitle = styled.h1`
  margin: 0;
  color: #101714;
  font-size: 1.35rem;
  font-weight: 700;
`;

const TripDate = styled.p`
  margin: 0;
  color: #7b827d;
  font-size: 0.8125rem;
`;

const TripMeta = styled.p`
  margin: 2px 0 0;
  color: #a8a196;
  font-size: 0.75rem;
  font-weight: 500;
`;
