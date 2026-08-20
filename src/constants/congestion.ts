export type Congestion = "여유" | "보통" | "혼잡";

export const congestionStyle = {
  여유: {
    label: "여유",
    bgColor: "#4CAF50",
    color: "#12462c",
    progress: 30,
    min: 0,
    max: 39,
    description:
      "현재 이 관광지는 여유 상태입니다. 지금 방문하기 좋은 시간입니다.",
    recommendation: "함께 둘러볼 관광지",
  },
  보통: {
    label: "보통",
    bgColor: "#eecb00",
    color: "#625019",
    progress: 60,
    min: 40,
    max: 79,
    description:
      "현재 이 관광지는 보통 상태입니다. 지금 방문하기 좋은 시간입니다.",
    recommendation: "함께 둘러볼 관광지",
  },
  혼잡: {
    label: "혼잡",
    bgColor: "#F97316",
    color: "#fdfcf8",
    progress: 90,
    min: 80,
    max: 100,
    description: "현재 이 관광지는 혼잡 상태입니다. 대체 관광지를 추천드려요.",
    recommendation: "덜 붐비는 대체 관광지",
  },
} as const;

export const noDataStyle = {
  label: "정보 없음",
  bgColor: "#000",
  color: "#ffffff",
  progress: 0,
  description: "현재 이 관광지의 혼잡도 정보를 제공하지 않습니다.",
  recommendation: "",
} as const;
