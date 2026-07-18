import type {
  ILoginRequest,
  ILoginResponse,
  ISignupRequest,
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
