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
