export type Congestion = "여유" | "보통" | "혼잡";

export interface Spot {
  id: number;
  name: string;
  location: string;
  category: string;
  congestion: Congestion;
  isFavorite: boolean;
  imageUrl: string;
}

export const mockSpots: Spot[] = [
  {
    id: 1,
    name: "성산일출봉",
    location: "서귀포시 성산읍",
    category: "산/오름",
    congestion: "혼잡",
    isFavorite: false,
    imageUrl:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&q=80",
  },
  {
    id: 2,
    name: "협재해수욕장",
    location: "제주시 한림읍",
    category: "해변/해안",
    congestion: "혼잡",
    isFavorite: false,
    imageUrl:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80",
  },
  {
    id: 3,
    name: "비자림",
    location: "제주시 구좌읍",
    category: "숲/힐링",
    congestion: "여유",
    isFavorite: true,
    imageUrl:
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&q=80",
  },
  {
    id: 4,
    name: "쇠소깍",
    location: "서귀포시",
    category: "해변/해안",
    congestion: "여유",
    isFavorite: true,
    imageUrl:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=800&q=80",
  },
  {
    id: 5,
    name: "한라산 어리목",
    location: "서귀포시",
    category: "산/오름",
    congestion: "보통",
    isFavorite: false,
    imageUrl:
      "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800&q=80",
  },
  {
    id: 6,
    name: "우도",
    location: "제주시 우도면",
    category: "해변/해안",
    congestion: "보통",
    isFavorite: false,
    imageUrl:
      "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?w=800&q=80",
  },
  {
    id: 7,
    name: "오설록 티뮤지엄",
    location: "서귀포시 안덕면",
    category: "카페/먹거리",
    congestion: "보통",
    isFavorite: false,
    imageUrl:
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&q=80",
  },
  {
    id: 8,
    name: "월정리해변",
    location: "제주시 구좌읍",
    category: "해변/해안",
    congestion: "혼잡",
    isFavorite: false,
    imageUrl:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80",
  },
  {
    id: 9,
    name: "사려니숲길",
    location: "제주시 조천읍",
    category: "숲/힐링",
    congestion: "여유",
    isFavorite: true,
    imageUrl:
      "https://images.unsplash.com/photo-1511497584788-876760111969?w=800&q=80",
  },
  {
    id: 10,
    name: "안돌오름 비밀의숲",
    location: "제주시 송당리",
    category: "숲/힐링",
    congestion: "여유",
    isFavorite: true,
    imageUrl:
      "https://images.unsplash.com/photo-1448375240586-882707db888b?w=800&q=80",
  },
  {
    id: 11,
    name: "이호테우해변",
    location: "제주시 이호동",
    category: "해변/해안",
    congestion: "보통",
    isFavorite: false,
    imageUrl:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80",
  },
  {
    id: 12,
    name: "용머리해안",
    location: "서귀포시 안덕면",
    category: "해변/해안",
    congestion: "보통",
    isFavorite: false,
    imageUrl:
      "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?w=800&q=80",
  },
];
