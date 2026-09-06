import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../stores/auth/authStore";

const PrivateRoute = () => {
  const accessToken = useAuthStore((state) => state.accessToken);
  const isInitialized = useAuthStore((state) => state.isInitialized);

  if (!isInitialized) {
    return null; // 재발급 시도 중일 떄
  }

  if (!accessToken) {
    return <Navigate to="/auth" replace />;
  }

  return <Outlet />;
};

export default PrivateRoute;
