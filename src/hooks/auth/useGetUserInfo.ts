import { useQuery } from "@tanstack/react-query";
import { getUserInfo } from "../../api/auth/auth";
import { useAuthStore } from "../../stores/auth/authStore";
import { getProfileImage } from "../../utils/profile";

export const useGetUserInfo = () => {
  const accessToken = useAuthStore((state) => state.accessToken);

  return useQuery({
    queryKey: ["user-info"],
    queryFn: getUserInfo,
    select: (user) => ({
      ...user,
      img: getProfileImage(user.img, user.nickname),
    }),
    enabled: Boolean(accessToken),
    staleTime: 1000 * 60 * 5,
  });
};
