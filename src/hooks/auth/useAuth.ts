import { useMutation } from "@tanstack/react-query";
import { login, signup } from "../../api/auth/auth";
import { useAuthStore } from "../../stores/auth/authStore";

export const useSignup = () => {
  return useMutation({
    mutationFn: signup,
  });
};

export const useLogin = () => {
  const setAccessToken = useAuthStore((state) => state.setAccessToken);

  return useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      setAccessToken(data.accessToken);
      localStorage.setItem("soksomRefreshToken", data.refreshToken);
    },
  });
};
