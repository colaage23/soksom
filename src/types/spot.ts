export interface ISpotRequest {
  pageNo: number;
  keyword: string;
}

export interface ISpotResponse {
  contentid: string;
  zipcode: string;
  addr1: string;
  addr2: string;
  firstimage: string;
  mapx: string;
  mapy: string;
  tel: string;
  title: string;
  lclsSystm3Nm: string;
}
