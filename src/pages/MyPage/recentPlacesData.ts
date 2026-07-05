import { Compass, Trees, Waves, type LucideIcon } from "lucide-react";

export type VisitDensity = "여유" | "보통";

export type RecentPlace = {
  title: string;
  subtitle: string;
  status: VisitDensity;
  region: string;
  summary: string;
  visitDate: string;
  stayTime: string;
  tags: string[];
  icon: LucideIcon;
};

export const recentPlaces: RecentPlace[] = [
  {
    title: "비밀의 숲 오름",
    subtitle: "어제 방문",
    status: "여유",
    region: "서귀포시 안덕면",
    summary: "초록 능선을 따라 걷기 좋은 조용한 오름 산책 코스입니다.",
    visitDate: "2026.07.04 16:20",
    stayTime: "1시간 10분",
    tags: ["#오름", "#숲길", "#석양"],
    icon: Trees,
  },
  {
    title: "한적한 월정리 해변",
    subtitle: "3일 전 방문",
    status: "보통",
    region: "제주시 구좌읍",
    summary:
      "바람이 강하지 않을 때 해변 산책과 카페 동선을 함께 즐기기 좋습니다.",
    visitDate: "2026.07.02 11:40",
    stayTime: "2시간 05분",
    tags: ["#해변", "#카페", "#산책"],
    icon: Waves,
  },
  {
    title: "따라비오름",
    subtitle: "지난주 방문",
    status: "여유",
    region: "서귀포시 표선면",
    summary: "탁 트인 능선 뷰가 좋아 사진 촬영과 가벼운 트레킹에 적합합니다.",
    visitDate: "2026.06.28 09:15",
    stayTime: "1시간 32분",
    tags: ["#트레킹", "#뷰포인트", "#사진"],
    icon: Compass,
  },
  {
    title: "사려니 숲길 입구",
    subtitle: "지난주 방문",
    status: "보통",
    region: "제주시 조천읍",
    summary: "그늘이 많아 한낮에도 걷기 편하고, 휴식하기 좋은 구간이 많습니다.",
    visitDate: "2026.06.27 13:05",
    stayTime: "2시간 24분",
    tags: ["#숲길", "#치유", "#드라이브"],
    icon: Trees,
  },
];
