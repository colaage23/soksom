export interface ITripDetail {
  detailId: number;
  tripId: number;
  contentid: string;
  contenttypeid: string;
  zipcode: string;
  addr1: string;
  addr2: string;
  firstimage: string;
  mapx: string;
  mapy: string;
  tel: string;
  title: string;
  lclsSystm1: string;
  lclsSystm2: string;
  lclsSystm3: string;
  lclsSystm1Nm: string;
  lclsSystm2Nm: string;
  lclsSystm3Nm: string;
  visitOrder: string;
  visitDate: string;
  createdAt: string;
  updatedAt: string;
}

export interface ITrip {
  tripId: number;
  userId: number;
  tripName: string;
  startDate: string;
  endDate: string;
  isAiRoute: string;
  shareCode: string;
  createdAt: string;
  updatedAt: string;
  details: ITripDetail[];
}

export interface ITripListResult {
  content: ITrip[];
  totalCount: number;
  pageNo: number;
  numOfRows: number;
  totalPages: number;
}

export interface ITripListParams {
  spotName?: string;
  pageNo?: number;
  numOfRows?: number;
}
