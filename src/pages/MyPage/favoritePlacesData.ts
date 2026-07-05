import { Compass, Trees, Waves, type LucideIcon } from "lucide-react";

export type FavoritePlace = {
  name: string;
  description: string;
  tags: string[];
  level: "여유로움" | "보통";
  icon: LucideIcon;
  summary: string;
  savedDate: string;
  recommendedTime: string;
};

export const favoritePlaces: FavoritePlace[] = [
  {
    name: "신창풍차해안도로",
    description: "제주시 한경면",
    tags: ["#해안도로", "#일몰명소"],
    level: "여유로움",
    icon: Waves,
    summary:
      "차를 타고 천천히 이동하며 바다와 풍차 풍경을 함께 즐기기 좋은 코스입니다.",
    savedDate: "2026.07.03 저장",
    recommendedTime: "추천 1시간 20분",
  },
  {
    name: "천년의 숲 비자림",
    description: "제주시 구좌읍",
    tags: ["#숲길", "#힐링"],
    level: "보통",
    icon: Trees,
    summary:
      "짙은 숲 그늘 아래에서 걷기 좋은 산책형 코스로 재방문 만족도가 높은 편입니다.",
    savedDate: "2026.07.01 저장",
    recommendedTime: "추천 1시간 45분",
  },
  {
    name: "따라비오름",
    description: "서귀포시 표선면",
    tags: ["#오름", "#사진명소"],
    level: "여유로움",
    icon: Compass,
    summary:
      "오름 라인이 예뻐 일출과 석양 시간대에 사진 명소로 많이 찾는 장소입니다.",
    savedDate: "2026.06.29 저장",
    recommendedTime: "추천 1시간 30분",
  },
];
