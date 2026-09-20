export interface ICongestion {
  cnctrRate: string;
  baseYmd: string;
  areaCd: string;
  areaNm: string;
  signguCd: string;
  signguNm: string;
  tatsNm: string;
}
export interface ICongestionApiRequest {
  areaCd: string;
  spotName: string;
  signguCd: string;
}

export interface ICongestionApiResponse {
  success: boolean;
  message: string;
  data: ICongestion;
}
