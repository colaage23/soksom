import { useState } from "react";
import styled from "styled-components";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { MAX_DAY_COUNT } from "../../../stores/useWayPointStore";

interface DateRangeCalendarProps {
  startDate: Date | null;
  endDate: Date | null;
  onChange: (range: { startDate: Date | null; endDate: Date | null }) => void;
}

const getDaysInMonth = (year: number, month: number) =>
  new Date(year, month + 1, 0).getDate();

const getFirstDayOfWeek = (year: number, month: number) =>
  new Date(year, month, 1).getDay();

const isSameDay = (a: Date | null, b: Date | null) =>
  !!a && !!b && a.toDateString() === b.toDateString();

const isInRange = (day: Date, start: Date | null, end: Date | null) =>
  !!start && !!end && day > start && day < end;

// 두 날짜 사이 일수 차이 (당일 포함 여행 일수 계산에 사용)
const getDiffDays = (a: Date, b: Date) =>
  Math.round((a.getTime() - b.getTime()) / (1000 * 60 * 60 * 24));

const DateRangeCalendar = ({
  startDate,
  endDate,
  onChange,
}: DateRangeCalendarProps) => {
  const [viewDate, setViewDate] = useState(startDate ?? new Date());

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();

  const daysInMonth = getDaysInMonth(year, month);
  const firstDayOfWeek = getFirstDayOfWeek(year, month);

  const days: (Date | null)[] = [
    ...Array(firstDayOfWeek).fill(null),
    ...Array.from(
      { length: daysInMonth },
      (_, i) => new Date(year, month, i + 1),
    ),
  ];

  const isPastDate = (day: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return day < today;
  };

  // 시작일만 선택된 상태에서, 최대 여행 기간(MAX_DAY_COUNT)을 넘는 날짜인지 확인
  const isBeyondMaxRange = (day: Date) => {
    if (!startDate || endDate) return false;
    if (day <= startDate) return false;

    return getDiffDays(day, startDate) > MAX_DAY_COUNT - 1;
  };

  const isDisabled = (day: Date) => isPastDate(day) || isBeyondMaxRange(day);

  const handleSelect = (day: Date) => {
    if (isDisabled(day)) return;

    if (!startDate || (startDate && endDate)) {
      onChange({ startDate: day, endDate: null });
      return;
    }

    if (day < startDate) {
      onChange({ startDate: day, endDate: startDate });
    } else {
      onChange({ startDate, endDate: day });
    }
  };

  return (
    <CalendarContainer>
      <CalendarHeader>
        <NavButton onClick={() => setViewDate(new Date(year, month - 1, 1))}>
          <ChevronLeft size={16} />
        </NavButton>
        <MonthLabel>
          {year}년 {month + 1}월
        </MonthLabel>
        <NavButton onClick={() => setViewDate(new Date(year, month + 1, 1))}>
          <ChevronRight size={16} />
        </NavButton>
      </CalendarHeader>

      <WeekRow>
        {["일", "월", "화", "수", "목", "금", "토"].map((day) => (
          <WeekDay key={day}>{day}</WeekDay>
        ))}
      </WeekRow>

      <DayGrid>
        {days.map((day, idx) =>
          day ? (
            <DayCell
              key={idx}
              $isStart={isSameDay(day, startDate)}
              $isEnd={isSameDay(day, endDate)}
              $inRange={isInRange(day, startDate, endDate)}
              $isPast={isDisabled(day)}
              disabled={isDisabled(day)}
              onClick={() => handleSelect(day)}
            >
              {day.getDate()}
            </DayCell>
          ) : (
            <EmptyCell key={idx} />
          ),
        )}
      </DayGrid>

      {startDate && !endDate && (
        <MaxRangeHint>최대 {MAX_DAY_COUNT}일까지 선택할 수 있어요</MaxRangeHint>
      )}
    </CalendarContainer>
  );
};

const CalendarContainer = styled.div`
  width: 100%;
  padding: 12px;
`;

const CalendarHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
`;

const NavButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 28px;
  height: 28px;

  border: none;
  border-radius: 8px;
  background: transparent;

  color: #2e3339;

  cursor: pointer;

  &:hover {
    background: #f5f2eb;
  }
`;

const MonthLabel = styled.p`
  margin: 0;
  font-size: 0.875rem;
  font-weight: 600;
  color: #101714;
`;

const WeekRow = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  margin-bottom: 4px;
`;

const WeekDay = styled.span`
  text-align: center;
  font-size: 0.75rem;
  color: #7b827d;
`;

const DayGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  row-gap: 2px;
  column-gap: 0;
`;
const EmptyCell = styled.div``;

const DayCell = styled.button<{
  $isStart: boolean;
  $isEnd: boolean;
  $inRange: boolean;
  $isPast: boolean;
}>`
  height: 32px;

  display: flex;
  justify-content: center;
  align-items: center;

  border: none;
  border-radius: ${({ $isStart, $isEnd }) => {
    if ($isStart && $isEnd) return "9999px";
    if ($isStart) return "9999px 0 0 9999px";
    if ($isEnd) return "0 9999px 9999px 0";
    return "0";
  }};

  background: ${({ $isStart, $isEnd, $inRange }) => {
    if ($isStart || $isEnd) return "#0c9799";
    if ($inRange) return "#e3f4f3";
    return "transparent";
  }};

  color: ${({ $isStart, $isEnd, $isPast }) => {
    if ($isPast) return "#c7cbc8";
    return $isStart || $isEnd ? "#fdfcf8" : "#2e3339";
  }};

  font-size: 0.8125rem;

  cursor: ${({ $isPast }) => ($isPast ? "not-allowed" : "pointer")};

  &:hover {
    background: ${({ $isStart, $isEnd, $isPast }) => {
      if ($isPast) return "transparent";
      return $isStart || $isEnd ? "#0c9799" : "#edebe5";
    }};
  }
`;

const MaxRangeHint = styled.p`
  margin: 8px 0 0;

  color: #a89a7d;
  font-size: 0.75rem;
  text-align: center;
`;

export default DateRangeCalendar;
