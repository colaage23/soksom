import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login, signup } from "../../api/auth/auth";
import { useAuthStore } from "../../stores/auth/authStore";
import { useWayPointStore } from "../../stores/useWayPointStore";

export const useSignup = () => {
  return useMutation({
    mutationFn: signup,
  });
};

export const useLogin = () => {
  const queryClient = useQueryClient();
  const setAccessToken = useAuthStore((state) => state.setAccessToken);

  return useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      setAccessToken(data.accessToken);
      localStorage.setItem("soksomRefreshToken", data.refreshToken);
      queryClient.clear();
    },
  });
};

export const useLogout = () => {
  const clearAuth = useAuthStore((state) => state.clearAuth);
  const queryClient = useQueryClient();

  const logout = () => {
    clearAuth();
    useWayPointStore.getState().resetWayPoint();
    useWayPointStore.persist.clearStorage();
    queryClient.clear();
  };

  return logout;
};
