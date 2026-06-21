// 라우트 정의
import { Routes, Route } from "react-router-dom";
import AppLayout from "../components/layout/AppLayout";
import Home from "../pages/Home/Home";
import Map from "../pages/Map/Map";
import Auth from "../pages/Auth/Auth";

function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route index element={<Home />} />
        <Route path="map" element={<Map />} />
        <Route path="auth" element={<Auth />} />
      </Route>
    </Routes>
  );
}

export default AppRouter;
