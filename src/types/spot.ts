export interface ISearchByKeywordRequest {
  pageNo: number;
  keyword: string;
}

export interface ISearchByLocationRequest {
  pageNo: number;
  mapX: string; // 경도 = longitude
  mapY: string; // 위도 = latitude
  radius: string;
}
export interface ISearchSpotResponse {
  contentid: string; // id
  contenttypeid: string; // 관광 타입
  zipcode: string; // 우편번호
  addr1: string; // 주소
  addr2: string; // 상세 주소
  firstimage: string;
  mapx: string;
  mapy: string;
  tel: string;
  title: string; // 제목
  lclsSystm1Nm: string; // 대분류
  lclsSystm2Nm: string; // 중분류
  lclsSystm3Nm: string; // 소분류
}
