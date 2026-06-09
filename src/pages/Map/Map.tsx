import { useState } from "react";
import { ChevronLeft, ChevronRight, Route, Telescope } from "lucide-react";
import styled from "styled-components";
import ExploreList from "./components/ExploreList";
import RouteList from "./components/RouteList";
import SpotDetail from "./components/SpotDetail";
import KakaoMap from "./components/KakaoMap";
import { useSpotStore } from "../../stores/useSpotStore";
import { congestionStyle } from "./mock";

const Map = () => {
  const { detailSpot } = useSpotStore();

  const [mode, setMode] = useState<"explore" | "route">("explore");
  const [open, setOpen] = useState(true);

  const Icon = open ? ChevronLeft : ChevronRight;

  const congestion = Object.values(congestionStyle).reverse();

  return (
    <MapContainer>
      <KakaoMap />

      <ToggleButton
        $visible={!!detailSpot}
        $open={open}
        onClick={() => setOpen((prev) => !prev)}
      >
        <ToggleIcon as={Icon} />
      </ToggleButton>

      <ListSection $open={open}>
        <ModeTabs>
          <TabIndicator $mode={mode} />

          <ModeTabButton
            $isActive={mode === "explore"}
            onClick={() => setMode("explore")}
          >
            <TelescopeIcon />
            탐색 모드
          </ModeTabButton>
          <ModeTabButton
            $isActive={mode === "route"}
            onClick={() => setMode("route")}
          >
            <RouteIcon />
            루트 모드
          </ModeTabButton>
        </ModeTabs>

        {mode === "explore" ? <ExploreList /> : <RouteList />}

        <SpotDetailSection>{detailSpot && <SpotDetail />}</SpotDetailSection>
      </ListSection>
      <CongestionOverlay $open={open} $hasDetail={!!detailSpot}>
        <OverlayTitle>관광지</OverlayTitle>
        {congestion.map((item) => (
          <OverlayContent>
            <OverlayColorChip $bgColor={item.bgColor} />
            <OverlayText>
              {item.label} ({item.min}~{item.max}%)
            </OverlayText>
          </OverlayContent>
        ))}
      </CongestionOverlay>
    </MapContainer>
  );
};

const MapContainer = styled.div`
  position: relative;

  width: 100%;
  height: calc(
    100vh - 72px
  ); /* 추후 헤더 높이 고정하는 걸로 수정, 반응형도 적용 해야 함. */

  display: flex;

  overflow: hidden;
`;

const ToggleIcon = styled.svg`
  width: 16px;
  height: 16px;

  stroke-width: 3;

  stroke: #298e8c;
`;

const ToggleButton = styled.button<{ $open: boolean; $visible: boolean }>`
  position: absolute;

  top: 50%;
  right: calc(100% - 420px - 27px);

  transform: ${({ $open }) =>
    $open ? "translate(0, -50%)" : "translate(-420px, -50%)"};

  width: 28px;
  height: 48px;

  padding: 0 4px;

  display: ${({ $visible }) => ($visible ? "none" : "flex")};
  justify-content: start;
  align-items: center;

  border: 1px solid #addad7;
  border-left: none;

  border-radius: 0 20px 20px 0;

  background: #e5faf8;

  cursor: pointer;

  z-index: 10;

  transition:
    transform 0.3s ease,
    background 0.2s ease;

  &:hover {
    border-color: #72c9c3;
    background: #c9f3ed;
  }

  &:hover ${ToggleIcon} {
    stroke: #298e8c;
  }
`;

const ListSection = styled.aside<{ $open: boolean }>`
  position: relative;

  width: 420px;
  height: 100%;

  display: flex;
  flex-direction: column;

  background-color: #fdfcf8;

  transition: transform 0.3s ease;

  border-right: 1px solid #f5f2eb;

  transform: ${({ $open }) => ($open ? "translateX(0)" : "translateX(-100%)")};
`;

const CongestionOverlay = styled.div<{
  $open: boolean;
  $hasDetail: boolean;
}>`
  position: absolute;

  bottom: 16px;
  left: ${({ $open, $hasDetail }) => {
    if (!$open) return "16px";

    return $hasDetail ? "856px" : "436px";
  }};

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;

  gap: 8px;

  padding: 14px 16px;

  background-color: #faf9f9;

  border: 1px solid #2e333919;
  border-radius: 16px;

  z-index: 0;

  transition: left 0.15s ease;
`;

const OverlayTitle = styled.p`
  margin: 0 0 4px;

  font-size: 0.6875rem;
  font-weight: 500;
`;

const OverlayContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  gap: 6px;
`;

const OverlayColorChip = styled.div<{ $bgColor: string }>`
  height: 10px;
  width: 10px;

  background-color: ${({ $bgColor }) => $bgColor};

  border-radius: 9999px;
`;

const OverlayText = styled.p`
  margin: 0;

  color: #2e3339;
  font-size: 0.6875rem;
  font-weight: 300;
`;

const ModeTabs = styled.nav`
  position: relative;

  display: flex;

  margin: 16px 16px 0;
  padding: 4px;

  border-radius: 14px;
  background: #f5f2eb;
`;

const TabIndicator = styled.div<{ $mode: "explore" | "route" }>`
  position: absolute;

  top: 4px;
  left: 4px;

  width: calc(50% - 4px);
  height: calc(100% - 8px);

  border-radius: 12px;
  background: white;

  transform: ${({ $mode }) =>
    $mode === "route" ? "translateX(100%)" : "translateX(0)"};

  transition: transform 0.25s cubic-bezier(0.4, 0, 0.2, 1);

  z-index: 0;
`;

const ModeTabButton = styled.button<{ $isActive: boolean }>`
  position: relative;
  z-index: 1;

  flex: 1;

  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;

  padding: 12px 16px;

  border: none;
  border-radius: 12px;
  background: transparent;

  color: ${({ $isActive }) => ($isActive ? "#101714" : "#7b827d")};

  font-size: 0.875rem;
  font-weight: ${({ $isActive }) => ($isActive ? 700 : 500)};

  cursor: pointer;

  transition: color 0.2s ease;
`;

const TelescopeIcon = styled(Telescope)`
  width: 16px;
  height: 16px;
  stroke: currentColor;
  stroke-width: 2;
`;

const RouteIcon = styled(Route)`
  width: 16px;
  height: 16px;
  stroke: currentColor;
  stroke-width: 2;
`;

const SpotDetailSection = styled.aside`
  position: absolute;

  right: -420px;

  height: 100%;

  display: flex;
  flex-direction: column;
`;

export default Map;
