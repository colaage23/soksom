import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../stores/auth/authStore";

const PublicRoute = () => {
  const accessToken = useAuthStore((state) => state.accessToken);
  const isInitialized = useAuthStore((state) => state.isInitialized);

  if (!isInitialized) {
    return null;
  }

  if (accessToken) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default PublicRoute;
