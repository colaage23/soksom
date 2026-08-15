export interface ISignupRequest {
  email: string;
  password: string;
  nickname: string;
}

export interface ILoginRequest {
  email: string;
  password: string;
}

export interface ILoginResponse {
  accessToken: string;
  refreshToken: string;
}

export interface IUserInfo {
  name: string;
  nickname: string;
  email: string;
  img: string;
}

export interface IUserInfo {
  name: string;
  nickname: string;
  email: string;
  img: string;
}

export interface IUserInfoResponse {
  success: boolean;
  message?: string;
  data: IUserInfo;
}
