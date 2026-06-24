import { create } from "zustand";

type AuthMode = "login" | "signup";

interface IAuthState {
  mode: AuthMode;
  setMode: (mode: AuthMode) => void;

  accessToken: string | null;
  setAccessToken: (token: string) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<IAuthState>((set) => ({
  mode: "login",
  setMode: (mode) => set({ mode }),

  accessToken: null,
  setAccessToken: (token) => set({ accessToken: token }),
  clearAuth: () => {
    localStorage.removeItem("refeshToken");
    set({ accessToken: null });
  },
}));
