const toDate = (dateText: string) => {
  const [year, month, day] = dateText.split(".").map(Number);

  return new Date(year, month - 1, day);
};

export const formatVisitDateLabel = (dateText: string) => {
  const targetDate = toDate(dateText);
  const today = new Date();
  const startOfToday = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate(),
  );
  const diffTime = startOfToday.getTime() - targetDate.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays <= 0) return "오늘 방문";
  if (diffDays === 1) return "어제 방문";
  if (diffDays < 7) return `${diffDays}일 전 방문`;

  return "지난주 방문";
};
