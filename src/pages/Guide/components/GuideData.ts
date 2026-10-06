import type { LucideIcon } from "lucide-react";
import {
  UsersRound,
  Route,
  Heart,
  SearchCheck,
  MapPin,
  CalendarRange,
  Clock,
  Bus,
  CloudSunRain,
  Utensils,
} from "lucide-react";

export interface InfoItem {
  icon: LucideIcon;
  title: string;
  description: string;
}

export interface StepItem extends InfoItem {
  step: number;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export const features: InfoItem[] = [
  {
    icon: UsersRound,
    title: "당일 혼잡도 확인",
    description:
      "제주 주요 관광지의 오늘 혼잡도를 한눈에 확인하고, 여유로운 곳을 골라 떠나세요.",
  },
  {
    icon: Route,
    title: "AI 여행 루트 최적화",
    description:
      "직접 만든 일정을 AI가 분석해 이동이 더 효율적인 순서로 여행 루트를 다듬어 드려요.",
  },
  {
    icon: Heart,
    title: "관심 장소 저장",
    description:
      "마음에 드는 장소를 하트로 저장하고, 나만의 제주 여행 리스트를 만들어 보세요.",
  },
  {
    icon: SearchCheck,
    title: "숨겨진 명소 탐색",
    description:
      "관광객이 몰리는 핫플보다 조용하고 아름다운 숨은 명소를 발견해 보세요.",
  },
];

export const steps: StepItem[] = [
  {
    step: 1,
    icon: MapPin,
    title: "장소 탐색하기",
    description:
      "탐색 페이지에서 제주 관광지를 검색하고, 혼잡도와 리뷰를 확인하세요. 지도에서 위치도 함께 볼 수 있어요.",
  },
  {
    step: 2,
    icon: Heart,
    title: "관심 장소 저장하기",
    description:
      "마음에 드는 장소를 하트 버튼으로 저장하세요. 저장된 장소는 마이페이지에서 언제든 확인할 수 있어요.",
  },
  {
    step: 3,
    icon: CalendarRange,
    title: "일정 만들고 최적화하기",
    description:
      "저장한 장소로 여행 일정을 만든 뒤, AI 최적화를 실행하면 이동 동선이 효율적인 순서로 정리돼요.",
  },
];

export const tips: InfoItem[] = [
  {
    icon: Clock,
    title: "아침 일찍 방문하기",
    description:
      "오전 8~10시는 관광지가 가장 한적한 시간대예요. 일출을 보며 여유롭게 즐기는 것을 추천합니다.",
  },
  {
    icon: Bus,
    title: "이동 시간 고려하기",
    description:
      "제주는 관광지 간 거리가 꽤 멀어요. 일정 계획 시 이동 시간을 여유 있게 30~60분 잡는 것이 좋습니다.",
  },
  {
    icon: CloudSunRain,
    title: "날씨 확인 필수",
    description:
      "제주 날씨는 변화가 심해요. 출발 전 반드시 날씨를 확인하고, 우산과 가벼운 외투를 챙기세요.",
  },
  {
    icon: Utensils,
    title: "식사 시간 피하기",
    description:
      "점심 12~14시, 저녁 18~20시는 식당이 가장 붐비는 시간이에요. 30분 일찍 방문하거나 현지 맛집으로 발길을 돌려보세요.",
  },
];

export const faqs: FaqItem[] = [
  {
    question: "혼잡도 정보는 언제 기준인가요?",
    answer:
      "제주 주요 관광지의 당일 혼잡도를 제공해요. 오늘 방문할 곳을 고를 때 덜 붐비는 장소를 확인해 보세요.",
  },
  {
    question: "AI 루트 최적화는 어떻게 작동하나요?",
    answer:
      "먼저 방문할 장소로 일정을 만든 뒤 AI 최적화를 실행하면, 장소 간 이동을 고려해 더 효율적인 순서로 여행 루트를 다시 짜 드려요.",
  },
  {
    question: "관심 장소는 몇 개까지 저장할 수 있나요?",
    answer:
      "관심 장소는 개수 제한 없이 저장할 수 있어요. AI 일정은 저장한 장소 중 2~5개를 골라 만들 수 있어요.",
  },
  {
    question: "일정을 저장하면 어디서 확인할 수 있나요?",
    answer:
      "저장한 일정은 마이페이지의 '나의 일정'에서 언제든 다시 확인할 수 있어요.",
  },
  {
    question: "핫플레이스는 어떻게 추천되나요?",
    answer:
      "제주시와 서귀포시에서 요즘 많은 여행자가 찾는 인기 관광지를 지역별로 2곳씩, 총 4곳을 골라 추천해 드려요.",
  },
  {
    question: "비회원도 서비스를 이용할 수 있나요?",
    answer:
      "관광지 탐색과 혼잡도 확인은 로그인 없이 가능해요. 관심 장소 저장과 AI 일정 생성은 로그인 후 이용할 수 있어요.",
  },
];
