export interface IAlternativeSpot {
  tAtsNm: string;
  tAtsCd: string;
  rlteTatsNm: string;
  rlteTatsCd: string;
  rlteRank: string;
  rlteRegnCd: string;
  rlteRegnNm: string;
  rlteSignguCd: string;
  rlteSignguNm: string;
  rlteCtgryLclsNm: string;
  rlteCtgryMclsNm: string;
  rlteCtgrySclsNm: string;
  baseYm: string;
}

export interface IAlternativeApiRequest {
  keyword: string;
  contentId: string;
  areaCd: string;
  signguCd: string;
  pageNo: number;
  baseYm: string;
}

export interface IAlternativeApiResponse {
  success: boolean;
  message: string;
  data: IAlternativeSpot[];
}
