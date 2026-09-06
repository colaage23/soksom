import { useState } from "react";
import styled from "styled-components";
import { FavoritePlacesSection } from "./components/FavoritePlacesSection";
import { MypageSidebar } from "./components/MypageSidebar";
import { RecentPlacesSection } from "./components/RecentPlacesSection";
import { TripScheduleSection } from "./components/TripScheduleSection";

const Mypage = () => {
  const [selectedSection, setSelectedSection] = useState<
    "recent" | "favorites" | "trips"
  >("recent");

  return (
    <PageShell>
      <PageInner>
        <DashboardGrid>
          <MypageSidebar
            selectedSection={selectedSection}
            onSelectSection={setSelectedSection}
          />
          <ContentColumn>
            <RecentPlacesSection />
            <FavoritePlacesSection />
            <TripScheduleSection />
          </ContentColumn>
        </DashboardGrid>
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
  padding: 24px 20px 72px;
  background:
    radial-gradient(
      circle at top left,
      rgba(36, 149, 155, 0.16),
      transparent 28%
    ),
    linear-gradient(180deg, #f5f7f4 0%, #f8faf7 52%, #f1f5f1 100%);

  @media (max-width: 768px) {
    padding: 16px 12px 48px;
  }
`;

const PageInner = styled.div`
  position: relative;
  z-index: 1;
  max-width: 1280px;
  margin: 0 auto;
`;

const DashboardGrid = styled.div`
  display: grid;
  grid-template-columns: 280px minmax(0, 1fr);
  gap: 18px;
  align-items: start;

  @media (max-width: 980px) {
    grid-template-columns: 1fr;
  }
`;

const ContentColumn = styled.div`
  display: grid;
  gap: 18px;
`;
