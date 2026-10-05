import styled from "styled-components";
import { FavoritePlacesSection } from "./components/FavoritePlacesSection";
import { MypageSidebar } from "./components/MypageSidebar";
import { RecentPlacesSection } from "./components/RecentPlacesSection";
import { TripScheduleSection } from "./components/TripScheduleSection";
import { WithdrawalFooter } from "./components/WithdrawalFooter";

const Mypage = () => {
  return (
    <PageShell>
      <PageInner>
        <DashboardGrid>
          <MypageSidebar />
          <RecentPlacesSection />
          <FavoritePlacesSection />
          <TripScheduleSection />
        </DashboardGrid>
        <WithdrawalFooter />
      </PageInner>
    </PageShell>
  );
};

export default Mypage;

const PageShell = styled.div`
  position: relative;
  overflow-x: hidden;
  overflow-y: visible;
  min-height: calc(100vh - 72px);
  padding: 24px 20px 32px;
  background: #f6f2e9;

  @media (max-width: 768px) {
    padding: 16px 12px 48px;
  }
`;

const PageInner = styled.div`
  position: relative;
  z-index: 1;
  max-width: 1300px;
  margin: 0 auto;
`;

const DashboardGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 18px;
  align-items: start;

  @media (max-width: 980px) {
    grid-template-columns: 1fr;
  }
`;
