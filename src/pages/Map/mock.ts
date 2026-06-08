export type Congestion = "여유" | "보통" | "혼잡";

export interface Spot {
  id: number;
  name: string;
  addr1: string;
  category: string;
  congestion: Congestion;
  isFavorite: boolean;
  firstimage: string;
  overview: string;
}

export const mockSpots: Spot[] = [
  {
    id: 1,
    name: "성산일출봉",
    addr1: "서귀포시 성산읍",
    category: "산/오름",
    congestion: "혼잡",
    isFavorite: false,
    firstimage:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&q=80",
    overview:
      "유네스코 세계자연유산으로 지정된 성산일출봉은 바닷속 화산 폭발로 형성된 응회구로, 정상에서 바라보는 일출이 특히 아름다운 제주 대표 명소이다.",
  },
  {
    id: 2,
    name: "협재해수욕장",
    addr1: "제주시 한림읍",
    category: "해변/해안",
    congestion: "혼잡",
    isFavorite: false,
    firstimage:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80",
    overview:
      "얕고 투명한 에메랄드빛 바다와 하얀 모래사장이 어우러진 제주 서쪽 대표 해수욕장으로, 가족 단위 여행객에게 인기 있는 휴양지이다.",
  },
  {
    id: 3,
    name: "비자림",
    addr1: "제주시 구좌읍",
    category: "숲/힐링",
    congestion: "여유",
    isFavorite: true,
    firstimage:
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&q=80",
    overview:
      "수백 년 된 비자나무들이 울창하게 숲을 이루는 자연 휴양림으로, 조용한 산책과 힐링을 즐기기 좋은 제주 대표 숲길이다.",
  },
  {
    id: 4,
    name: "쇠소깍",
    addr1: "서귀포시",
    category: "해변/해안",
    congestion: "여유",
    isFavorite: true,
    firstimage:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=800&q=80",
    overview:
      "민물과 바닷물이 만나는 독특한 지형으로 투명한 물빛이 아름다우며, 전통 테우 체험으로 유명한 자연 명소이다.",
  },
  {
    id: 5,
    name: "한라산 어리목",
    addr1: "서귀포시",
    category: "산/오름",
    congestion: "보통",
    isFavorite: false,
    firstimage:
      "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800&q=80",
    overview:
      "한라산 국립공원의 대표 탐방로 중 하나로, 사계절 변화하는 자연 경관과 숲길 트레킹을 즐길 수 있는 코스이다.",
  },
  {
    id: 6,
    name: "우도",
    addr1: "제주시 우도면",
    category: "해변/해안",
    congestion: "보통",
    isFavorite: false,
    firstimage:
      "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?w=800&q=80",
    overview:
      "제주 동쪽에 위치한 작은 섬으로, 에메랄드 바다와 해안도로 드라이브, 땅콩 아이스크림으로 유명한 관광지이다.",
  },
  {
    id: 7,
    name: "오설록 티뮤지엄",
    addr1: "서귀포시 안덕면",
    category: "카페/먹거리",
    congestion: "보통",
    isFavorite: false,
    firstimage:
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&q=80",
    overview:
      "제주 녹차 문화를 체험할 수 있는 복합 문화 공간으로, 넓은 녹차밭과 함께 다양한 티 디저트를 즐길 수 있다.",
  },
  {
    id: 8,
    name: "월정리해변",
    addr1: "제주시 구좌읍",
    category: "해변/해안",
    congestion: "혼잡",
    isFavorite: false,
    firstimage:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80",
    overview:
      "카페 거리와 함께 아름다운 해변 풍경을 즐길 수 있는 핫플레이스로, 감성적인 분위기의 제주 대표 해변이다.",
  },
  {
    id: 9,
    name: "사려니숲길",
    addr1: "제주시 조천읍",
    category: "숲/힐링",
    congestion: "여유",
    isFavorite: true,
    firstimage:
      "https://images.unsplash.com/photo-1511497584788-876760111969?w=800&q=80",
    overview:
      "울창한 삼나무 숲이 길게 이어지는 힐링 산책로로, 피톤치드 가득한 조용한 자연 속 걷기 코스로 유명하다.",
  },
  {
    id: 10,
    name: "안돌오름 비밀의숲",
    addr1: "제주시 송당리",
    category: "숲/힐링",
    congestion: "여유",
    isFavorite: true,
    firstimage:
      "https://images.unsplash.com/photo-1448375240586-882707db888b?w=800&q=80",
    overview:
      "SNS에서 유명해진 감성 숲길로, 이국적인 분위기의 나무와 길이 어우러진 사진 촬영 명소이다.",
  },
  {
    id: 11,
    name: "이호테우해변",
    addr1: "제주시 이호동",
    category: "해변/해안",
    congestion: "보통",
    isFavorite: false,
    firstimage:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80",
    overview:
      "말 모양 등대가 상징적인 해변으로, 도심과 가까워 가볍게 산책하기 좋은 제주 서부 해안 명소이다.",
  },
  {
    id: 12,
    name: "용머리해안",
    addr1: "서귀포시 안덕면",
    category: "해변/해안",
    congestion: "보통",
    isFavorite: false,
    firstimage:
      "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?w=800&q=80",
    overview:
      "용이 바다로 들어가는 형상을 닮은 해안 절벽으로, 파도 침식으로 만들어진 독특한 지형이 인상적인 장소이다.",
  },
];
