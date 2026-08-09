// 라우트 정의
import { Routes, Route, useSearchParams } from "react-router-dom";
import AppLayout from "../components/layout/AppLayout";
import Home from "../pages/Home/Home";
import Map from "../pages/Map/Map";
import Auth from "../pages/Auth/Auth";
import Mypage from "../pages/MyPage/Mypage";
import FavoritePlaces from "../pages/MyPage/FavoritePlaces";
import RecentPlaces from "../pages/MyPage/RecentPlaces";
import SocialCallback from "../pages/Auth/components/SocialCallback";

const HomeOrCallback = () => {
  const [searchParams] = useSearchParams();
  const hasCode = searchParams.has("code") && searchParams.has("state");

  return hasCode ? <SocialCallback /> : <Home />;
};

function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route index element={<HomeOrCallback />} />
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
