import { useQuery } from "@tanstack/react-query";
import { getUserInfo } from "../../api/auth/auth";
import { useAuthStore } from "../../stores/auth/authStore";

export const useGetUserInfo = () => {
  const accessToken = useAuthStore((state) => state.accessToken);

  return useQuery({
    queryKey: ["user-info"],
    queryFn: getUserInfo,
    enabled: Boolean(accessToken),
    staleTime: 1000 * 60 * 5,
  });
};
