import { Outlet, useLocation, useSearchParams } from "react-router-dom";
import styled from "styled-components";
import Header from "./Header";

const AppLayout = () => {
  const { pathname } = useLocation();
  const [searchParams] = useSearchParams();

  const isSocialCallback =
    pathname === "/" && searchParams.has("code") && searchParams.has("state");

  const isOverlayHeaderPage = pathname === "/";

  return (
    <LayoutShell>
      {!isSocialCallback && <Header />}
      <MainContent
        $overlayHeader={isOverlayHeaderPage}
        $hideHeader={isSocialCallback}
      >
        <Outlet />
      </MainContent>
    </LayoutShell>
  );
};

const LayoutShell = styled.div`
  min-height: 100vh;
`;

const MainContent = styled.main<{
  $overlayHeader: boolean;
  $hideHeader: boolean;
}>`
  padding-top: ${({ $overlayHeader, $hideHeader }) =>
    $hideHeader ? "0" : $overlayHeader ? "0" : "72px"};
`;

export default AppLayout;
