export interface ISearchByKeywordRequest {
  keyword: string;
  pageNo: number;
  baseYmd?: string;
}

export interface ISearchByLocationRequest {
  pageNo: number;
  mapX: string; // 경도 = longitude
  mapY: string; // 위도 = latitude
  radius: string;
  baseYmd?: string;
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
  lDongRegnCd: string;
  lDongSignguCd: string;
  congestion: ICongestion;
}

export interface ISpotDetailCommon {
  contentid: string;
  title: string;
  overview: string;
  homepage?: string;
  tel?: string;
  addr1: string;
  firstimage: string;
}

export interface ISpotDetailIntro {
  contentid: string;
  contenttypeid: string;
  infocenter?: string;
  restdate?: string;
  usetime?: string;
  parking?: string;
  chkpet?: string;
  expguide?: string;
  expagerange?: string;
  infocentershopping?: string;
  restdateshopping?: string;
  parkingshopping?: string;
  opentime?: string;
  restroom?: string;
  saleitem?: string;
}

export interface ISpotDetailImage {
  cpyrhtDivCd?: string;
  contentid?: string;
  imgname?: string;
  originimgurl?: string;
  serialnum?: string;
  smallimageurl?: string;
}

export interface ICongestion {
  cnctrRate: string;
  baseYmd: string;
  areaCd: string;
  areaNm: string;
  signguCd: string;
  signguNm: string;
  tatsNm: string;
}

export interface ISpotDetailInfo {
  contentid?: string;
  contenttypeid?: string;
  fldgubun?: string;
  infoname?: string;
  infotext?: string;
  serialnum?: string;
  subcontentid?: string;
  subdetailalt?: string;
  subdetailimg?: string;
  subdetailoverview?: string;
  subname?: string;
  subnum?: string;
  roomcode?: string;
  roomtitle?: string;
  roomsize1?: string;
  roomcount?: string;
  roombasecount?: string;
  roommaxcount?: string;
  roomoffseasonminfee1?: string;
  roomoffseasonminfee2?: string;
  roompeakseasonminfee1?: string;
  roompeakseasonminfee2?: string;
  roomintro?: string;
  roombathfacility?: string;
  roombat?: string;
  roomhometheater?: string;
  roomaircondition?: string;
  roomtv?: string;
  roompc?: string;
  roomcable?: string;
  roominternet?: string;
  roomrefrigerator?: string;
  roomtoiletries?: string;
  roomsofa?: string;
  roomcook?: string;
  roomtable?: string;
  roomhairdryer?: string;
  roomsize2?: string;
  roomimg1?: string;
  roomimg1alt?: string;
  roomimg2?: string;
  roomimg2alt?: string;
  roomimg3?: string;
  roomimg3alt?: string;
  roomimg4?: string;
  roomimg4alt?: string;
  roomimg5?: string;
  roomimg5alt?: string;
  cpyrhtDivCd1?: string;
  cpyrhtDivCd2?: string;
  cpyrhtDivCd3?: string;
  cpyrhtDivCd4?: string;
  cpyrhtDivCd5?: string;
}

export interface ISpotDetailResponse {
  common: ISpotDetailCommon;
  intro: ISpotDetailIntro;
  info: ISpotDetailInfo[];
  image: ISpotDetailImage[];
  congestion: ICongestion;
}

export interface ISpotDetailRequest {
  contentid: string;
  contenttypeid?: string;
  spotName?: string;
  areaCd?: string;
  signguCd?: string;
  baseYmd?: string;
}
