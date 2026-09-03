import { create } from "zustand";

export type ToastType = "success" | "error" | "info";

interface ToastItem {
  id: number;
  message: string;
  type: ToastType;
}

interface ToastStore {
  toasts: ToastItem[];
  showToast: (message: string, type?: ToastType) => void;
  removeToast: (id: number) => void;
}

let toastId = 0;

export const useToastStore = create<ToastStore>((set) => ({
  toasts: [],

  showToast: (message, type = "info") => {
    const id = toastId++;
    set((state) => ({
      toasts: [...state.toasts, { id, message, type }],
    }));
  },

  removeToast: (id) =>
    set((state) => ({
      toasts: state.toasts.filter((toast) => toast.id !== id),
    })),
}));
