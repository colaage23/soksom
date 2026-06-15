import { Outlet, useLocation } from "react-router-dom";
import styled from "styled-components";
import Header from "./Header";

const AppLayout = () => {
  const { pathname } = useLocation();
  const isOverlayHeaderPage = pathname === "/";

  return (
    <LayoutShell>
      <Header />
      <MainContent $overlayHeader={isOverlayHeaderPage}>
        <Outlet />
      </MainContent>
    </LayoutShell>
  );
};

const LayoutShell = styled.div`
  min-height: 100vh;
`;

const MainContent = styled.main<{ $overlayHeader: boolean }>`
  padding-top: ${({ $overlayHeader }) => ($overlayHeader ? "0" : "72px")};
`;

export default AppLayout;
