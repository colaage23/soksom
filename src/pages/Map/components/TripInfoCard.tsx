import { useState } from "react";
import styled from "styled-components";
import { ChevronDown, CalendarDays, RotateCcw } from "lucide-react";
import DateRangeCalendar from "./DateRangeCalendar";
import { useWayPointStore } from "../../../stores/useWayPointStore";

const formatDate = (date: Date | string | null) => {
  if (!date) return null;
  const d = date instanceof Date ? date : new Date(date);
  return `${d.getMonth() + 1}.${d.getDate()}`;
};

// 시작일~종료일(당일 포함) 사이 일수를 계산해서 일차 수로 사용
const getDayCountFromRange = (start: Date, end: Date) => {
  const diffTime = end.setHours(0, 0, 0, 0) - start.setHours(0, 0, 0, 0);
  return Math.round(diffTime / (1000 * 60 * 60 * 24)) + 1;
};

const TripInfoCard = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { setDayCount, dateRange, setDateRange } = useWayPointStore();

  const summary = [
    dateRange.startDate && dateRange.endDate
      ? `${formatDate(dateRange.startDate)} - ${formatDate(dateRange.endDate)}`
      : null,
  ]
    .filter(Boolean)
    .join(" · ");

  // 여행 정보(날짜, 동행인)를 초기화하면서 일차 수(dayCount)도 날짜 기준(1)으로 되돌림.
  // 담아뒀던 관광지 자체는 지워지지 않고, setDayCount가 줄어드는 일차의 관광지를
  // 보관함(pool)으로 되돌려주므로 데이터는 유지됨
  const handleResetAll = (e: React.MouseEvent) => {
    e.stopPropagation(); // 아코디언 토글 방지

    setDateRange({ startDate: null, endDate: null });
    setDayCount(1);
  };

  // 달력에서 날짜 범위를 고르면 여행 일차(dayCount)가 자동으로 세팅됨
  const handleDateRangeChange = (range: {
    startDate: Date | null;
    endDate: Date | null;
  }) => {
    setDateRange(range);

    if (range.startDate && range.endDate) {
      const dayCount = getDayCountFromRange(
        new Date(range.startDate),
        new Date(range.endDate),
      );
      setDayCount(dayCount);
    }
  };

  return (
    <CardContainer>
      <CardHeader onClick={() => setIsOpen((prev) => !prev)}>
        <HeaderLeft>
          <CalendarIcon />
          <HeaderTitle>여행 일정</HeaderTitle>
          {summary && <HeaderSummary>{summary}</HeaderSummary>}
        </HeaderLeft>
        <HeaderRight>
          <ResetButton
            type="button"
            onClick={handleResetAll}
            title="여행 일정 초기화"
          >
            <ResetIcon />
          </ResetButton>
          <ChevronIcon $isOpen={isOpen} />
        </HeaderRight>
      </CardHeader>

      {isOpen && (
        <CardContent>
          <DateRangeCalendar
            startDate={dateRange.startDate}
            endDate={dateRange.endDate}
            onChange={handleDateRangeChange}
          />
        </CardContent>
      )}
    </CardContainer>
  );
};

const CardContainer = styled.div`
  margin: 12px 16px 0;

  border: 1px solid #edebe5;
  border-radius: 16px;

  background: #fdfcf8;

  overflow: hidden;
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 12px 14px;

  cursor: pointer;
`;

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;

  min-width: 0;
`;

const HeaderTitle = styled.span`
  font-size: 0.875rem;
  font-weight: 600;
  color: #101714;

  white-space: nowrap;
`;

const HeaderSummary = styled.span`
  font-size: 0.8125rem;
  color: #7b827d;

  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  border-top: 1px solid #edebe5;
`;

const CalendarIcon = styled(CalendarDays)`
  width: 16px;
  height: 16px;
  stroke: #0c9799;
  stroke-width: 2;
`;

const HeaderRight = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  flex-shrink: 0;
`;

const ResetButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 24px;
  height: 24px;

  outline: none;
  border: none;
  border-radius: 8px;

  background: transparent;

  cursor: pointer;

  &:hover {
    background: #f5f2eb;
  }
`;

const ResetIcon = styled(RotateCcw)`
  width: 14px;
  height: 14px;
  stroke: #7b827d;
  stroke-width: 2;
`;

const ChevronIcon = styled(ChevronDown)<{ $isOpen: boolean }>`
  width: 16px;
  height: 16px;
  stroke: #7b827d;
  stroke-width: 2;

  transform: ${({ $isOpen }) => ($isOpen ? "rotate(180deg)" : "rotate(0)")};
  transition: transform 0.2s ease;
`;

export default TripInfoCard;
