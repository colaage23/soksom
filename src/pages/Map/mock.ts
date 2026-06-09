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
  openingHours: string;
  fee: string;
  recommendedTime: string;
  recommendations: AlternativeSpot[];
  latitude: number;
  longitude: number;
}

export const congestionStyle = {
  여유: {
    label: "여유",
    bgColor: "#4CAF50",
    color: "#12462c",
    progress: 30,
    description:
      "현재 이 관광지는 여유 상태입니다. 지금 방문하기 좋은 시간입니다.",
    recommendation: "함께 둘러볼 관광지",
  },
  보통: {
    label: "보통",
    bgColor: "#eecb00",
    color: "#625019",
    progress: 60,
    description:
      "현재 이 관광지는 보통 상태입니다. 지금 방문하기 좋은 시간입니다.",
    recommendation: "함께 둘러볼 관광지",
  },
  혼잡: {
    label: "혼잡",
    bgColor: "#F97316",
    color: "#fdfcf8",
    progress: 90,
    description: "현재 이 관광지는 혼잡 상태입니다. 대체 관광지를 추천드려요.",
    recommendation: "덜 붐비는 대체 관광지",
  },
} as const;

export type AlternativeSpot = Omit<
  Spot,
  "recommendations" | "latitude" | "longitude"
>;
export const alternativeSpots: AlternativeSpot[] = [
  {
    id: 101,
    name: "금능해변",
    addr1: "제주시 한림읍",
    category: "해변/해안",
    congestion: "여유",
    isFavorite: false,
    firstimage:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80",
    overview:
      "협재보다 한적한 분위기의 에메랄드빛 해변으로, 여유로운 산책과 휴식을 즐기기 좋은 숨은 명소이다.",
    openingHours: "상시 개방",
    fee: "무료",
    recommendedTime: "오전 10시 ~ 오후 4시",
  },
  {
    id: 102,
    name: "절물자연휴양림",
    addr1: "제주시 봉개동",
    category: "숲/힐링",
    congestion: "여유",
    isFavorite: true,
    firstimage:
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&q=80",
    overview:
      "울창한 삼나무 숲과 산책로가 잘 정비된 자연 휴양림으로 힐링 여행지로 인기 있다.",
    openingHours: "07:00 ~ 17:00",
    fee: "성인 1,000원",
    recommendedTime: "오전 9시 ~ 11시",
  },
  {
    id: 103,
    name: "섭지코지",
    addr1: "서귀포시 성산읍",
    category: "해변/해안",
    congestion: "보통",
    isFavorite: false,
    firstimage:
      "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?w=800&q=80",
    overview:
      "드넓은 바다와 초원이 어우러진 제주 동부 대표 해안 절경 명소이다.",
    openingHours: "상시 개방",
    fee: "무료",
    recommendedTime: "오후 3시 ~ 해질 무렵",
  },
  {
    id: 104,
    name: "카멜리아힐",
    addr1: "서귀포시 안덕면",
    category: "공원/정원",
    congestion: "보통",
    isFavorite: true,
    firstimage:
      "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?w=800&q=80",
    overview:
      "사계절 꽃이 피는 대형 정원으로 사진 촬영과 산책을 즐기기 좋은 테마 공원이다.",
    openingHours: "08:30 ~ 17:30",
    fee: "성인 8,000원",
    recommendedTime: "오전 10시 ~ 오후 3시",
  },
  {
    id: 105,
    name: "김녕성세기해변",
    addr1: "제주시 구좌읍",
    category: "해변/해안",
    congestion: "여유",
    isFavorite: false,
    firstimage:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80",
    overview: "검은 현무암과 하얀 파도가 대비되는 조용하고 감성적인 해변이다.",
    openingHours: "상시 개방",
    fee: "무료",
    recommendedTime: "오후 5시 ~ 7시",
  },
  {
    id: 106,
    name: "한림공원",
    addr1: "제주시 한림읍",
    category: "공원/정원",
    congestion: "보통",
    isFavorite: false,
    firstimage:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=800&q=80",
    overview:
      "동굴, 식물원, 정원이 함께 있는 복합 자연 테마파크로 다양한 볼거리를 제공한다.",
    openingHours: "09:00 ~ 18:00",
    fee: "성인 12,000원",
    recommendedTime: "오전 10시 ~ 오후 2시",
  },
  {
    id: 107,
    name: "표선해수욕장",
    addr1: "서귀포시 표선면",
    category: "해변/해안",
    congestion: "여유",
    isFavorite: false,
    firstimage:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80",
    overview:
      "넓고 잔잔한 백사장이 특징인 가족 단위 여행객에게 적합한 해변이다.",
    openingHours: "상시 개방",
    fee: "무료",
    recommendedTime: "오전 9시 ~ 11시",
  },
  {
    id: 108,
    name: "산굼부리",
    addr1: "제주시 조천읍",
    category: "산/오름",
    congestion: "보통",
    isFavorite: true,
    firstimage:
      "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800&q=80",
    overview:
      "분화구 형태가 잘 보존된 화산 지형으로 자연 경관이 뛰어난 제주 대표 오름이다.",
    openingHours: "09:00 ~ 18:00",
    fee: "성인 6,000원",
    recommendedTime: "오전 10시 ~ 오후 1시",
  },
];

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
      "해발 180m인 성산 일출봉은 약 5,000년 전 제주도 수많은 분화구 중에서는 드물게 바닷속에서 수중폭발한 화산체이다. 용암이 물에 섞일 때 일어나는 폭발로 용암은 고운 화산재로 부서져 분화구 둘레에 원뿔형으로 쌓여 있다. 원래는 화산섬이었지만 신양해수욕장 쪽 땅과 섬 사이에 모래와 자갈이 쌓여 육지와 연결이 된 것이다. 일출봉 정상에는 지름 600m, 바닥면의 높이 해발 90m에 면적이 214,400㎡나 되는 분화구가 자리한다. 예로부터 이곳 성산일출봉 정상에서 바라보는 일출 광경은 영주 10경(제주의 경승지) 중에서 으뜸이라 하였다. 넘실대는 푸른 바다 저편 수평선에서 이글거리며 솟아오르는 일출은 온 바다를 물들이고 보는 이의 마음까지도 붙잡아 놓으며 보는 이로 하여금 저절로 감탄케 한다.",
    openingHours: "07:00 ~ 19:00",
    fee: "성인-5,000원 청소년-2,500원",
    recommendedTime: "일출 시간 (05:30~07:00)",
    recommendations: [alternativeSpots[6], alternativeSpots[7]],
    latitude: 33.4589,
    longitude: 126.9425,
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
      "협재해수욕장은 제주시 서쪽의 한림공원에 인접해 있다. 조개껍질 가루가 많이 섞인 백사장과 앞바다에 떠 있는 비양도, 코발트 빛깔의 아름다운 바다와 울창한 소나무 숲이 한데 어우러진 풍광이 매우 아름답다. 수심이 얕고 경사가 완만하여 가족 단위의 해수욕장으로 적합하다. 이 해수욕장의 남서쪽 해안은 금릉해수욕장과 이어져 있는데, 주민들은 두 해변을 합쳐 협재해수욕장이라고도 부른다. 해수욕장 내에는 탈의실, 샤워실, 휴게소, 식수대, 화장실 등 각종 편의시설이 있어 이용하기에도 편리하다. 또 해수욕장 주변에는 짙은 송림이 있어 야영과 산림욕을 즐길 수 있고, 전복과 소라가 많이 잡히기 때문에 싱싱한 해산물을 마음껏 맛볼 수 있다. 멀지 않은 곳에는 한림공원과 협재굴, 명월대, 황룡사, 영각사 등이 있어 해수욕과 함께 주변을 둘러볼 수 있으며 특히 해수욕장 정면에 보이는 비양도의 모습은 맑고 깨끗한 해수와 어울려 아름다운 풍광을 연출하며 이곳에서 바라보는 낙조 또한 아름답다. ◎ 한류의 매력을 만나는 여행 정보 시원한 파도 소리, 에메랄드빛 바다, 백사장 옆 검은 현무암 위에서 반갑게 손을 흔드는 세븐틴이 있다. 세븐틴이 팬인 캐럿에게 보내는 노래 엔 예쁜 사랑이 담겨 있다. 협재해수욕장은 수심이 얕아 수영을 못 하는 사람들도 물놀이하기 좋고, 옆쪽으로 야자수, 소나무 숲, 잔디가 있어 산책하거나 캠핑하기에도 적합하다.",
    openingHours: "상시 개방",
    fee: "무료",
    recommendedTime: "오전 9시 ~ 11시",
    recommendations: [alternativeSpots[0], alternativeSpots[6]],
    latitude: 33.3945,
    longitude: 126.2395,
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
    openingHours: "09:00 ~ 18:00",
    fee: "성인 3,000원",
    recommendedTime: "오전 10시 ~ 오후 3시",
    recommendations: [alternativeSpots[1], alternativeSpots[7]],
    latitude: 33.4902,
    longitude: 126.8098,
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
    openingHours: "상시 개방",
    fee: "무료 (체험 별도)",
    recommendedTime: "오후 2시 ~ 5시",
    recommendations: [alternativeSpots[2], alternativeSpots[4]],
    latitude: 33.2525,
    longitude: 126.6237,
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
    openingHours: "05:00 ~ 15:00",
    fee: "무료 (국립공원)",
    recommendedTime: "오전 6시 ~ 10시",
    recommendations: [alternativeSpots[7], alternativeSpots[1]],
    latitude: 33.3927,
    longitude: 126.4949,
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
    openingHours: "08:00 ~ 18:00 (배편 기준)",
    fee: "왕복 배편 약 10,000원",
    recommendedTime: "오전 9시 ~ 오후 3시",
    recommendations: [alternativeSpots[2], alternativeSpots[6]],
    latitude: 33.5007,
    longitude: 126.9518,
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
    openingHours: "09:00 ~ 18:00",
    fee: "무료",
    recommendedTime: "오후 1시 ~ 4시",
    recommendations: [alternativeSpots[3], alternativeSpots[0]],
    latitude: 33.306,
    longitude: 126.2895,
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
    openingHours: "상시 개방",
    fee: "무료",
    recommendedTime: "해질 무렵 (17:00~19:00)",
    recommendations: [alternativeSpots[4], alternativeSpots[2]],
    latitude: 33.5563,
    longitude: 126.7958,
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
    openingHours: "08:00 ~ 17:00",
    fee: "무료",
    recommendedTime: "오전 9시 ~ 11시",
    recommendations: [alternativeSpots[1], alternativeSpots[7]],
    latitude: 33.4223,
    longitude: 126.628,
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
    openingHours: "09:00 ~ 18:00",
    fee: "입장료 2,000원",
    recommendedTime: "오전 10시 ~ 오후 2시",
    recommendations: [alternativeSpots[0], alternativeSpots[3]],
    latitude: 33.4553,
    longitude: 126.7576,
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
    openingHours: "상시 개방",
    fee: "무료",
    recommendedTime: "오후 4시 ~ 6시",
    recommendations: [alternativeSpots[6], alternativeSpots[4]],
    latitude: 33.4973,
    longitude: 126.4528,
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
    openingHours: "09:00 ~ 17:00 (기상 영향 있음)",
    fee: "성인 2,000원",
    recommendedTime: "간조 시간대",
    recommendations: [alternativeSpots[2], alternativeSpots[7]],
    latitude: 33.2318,
    longitude: 126.3142,
  },
];
