import { useEffect } from "react";
import { refresh } from "../../api/auth/auth";
import { useAuthStore } from "../../stores/auth/authStore";

export const useInitAuth = () => {
  const setAccessToken = useAuthStore((state) => state.setAccessToken);
  const setInitialized = useAuthStore((state) => state.setInitialized);
  const clearAuth = useAuthStore((state) => state.clearAuth);

  useEffect(() => {
    const storedRefreshToken = localStorage.getItem("soksomRefreshToken");

    if (!storedRefreshToken) {
      setInitialized(true);
      return;
    }

    refresh(storedRefreshToken)
      .then((data) => {
        setAccessToken(data.accessToken);
        localStorage.setItem("soksomRefreshToken", data.refreshToken);
      })
      .catch(() => {
        clearAuth();
      })
      .finally(() => {
        setInitialized(true);
      });
  }, [setAccessToken, setInitialized, clearAuth]);
};
