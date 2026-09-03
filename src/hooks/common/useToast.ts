import { useToastStore } from "../../stores/common/useToastStore";

export const useToast = () => {
  const showToast = useToastStore((state) => state.showToast);
  return showToast;
};
