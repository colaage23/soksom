// 라우트 정의
import { Routes, Route } from "react-router-dom";
import AppLayout from "../components/layout/AppLayout";
import Home from "../pages/Home/Home";
import Map from "../pages/Map/Map";
import Auth from "../pages/Auth/Auth";
import Mypage from "../pages/MyPage/Mypage";
import FavoritePlaces from "../pages/MyPage/FavoritePlaces";
import RecentPlaces from "../pages/MyPage/RecentPlaces";

function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route index element={<Home />} />
        <Route path="map" element={<Map />} />
        <Route path="auth" element={<Auth />} />
        <Route path="mypage" element={<Mypage />} />
        <Route path="mypage/favorites" element={<FavoritePlaces />} />
        <Route path="mypage/recent-places" element={<RecentPlaces />} />
      </Route>
    </Routes>
  );
}

export default AppRouter;
