import type {
  ILoginRequest,
  ILoginResponse,
  ISignupRequest,
  IUserInfo,
  IUserInfoResponse,
} from "../../types/auth";
import { axiosInstance } from "../axiosInstance";

export const signup = (body: ISignupRequest) =>
  axiosInstance.post("/auth/signup", body);

export const login = async (body: ILoginRequest): Promise<ILoginResponse> => {
  const { data } = await axiosInstance.post<ILoginResponse>(
    "/auth/login",
    body,
  );
  return data;
};

export const refresh = async (
  refreshToken: string,
): Promise<ILoginResponse> => {
  const { data } = await axiosInstance.post<ILoginResponse>("/auth/refresh", {
    refreshToken,
  });
  return data;
};

export const getUserInfo = async (): Promise<IUserInfo> => {
  const { data } = await axiosInstance.get<IUserInfoResponse>("/user");
  return data.data;
};
