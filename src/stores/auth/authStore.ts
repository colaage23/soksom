import { create } from "zustand";

type AuthMode = "login" | "signup";

interface IAuthState {
  mode: AuthMode;
  setMode: (mode: AuthMode) => void;

  accessToken: string | null;
  isInitialized: boolean;
  setAccessToken: (token: string) => void;
  setInitialized: (value: boolean) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<IAuthState>((set) => ({
  mode: "login",
  setMode: (mode) => set({ mode }),

  accessToken: null,
  isInitialized: false,
  setAccessToken: (token) => set({ accessToken: token }),
  setInitialized: (value) => set({ isInitialized: value }),
  clearAuth: () => {
    localStorage.removeItem("soksomRefreshToken");
    set({ accessToken: null });
  },
}));
