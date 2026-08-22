import styled from "styled-components";
import {
  CustomOverlayMap,
  Map,
  MapMarker,
  Polyline,
} from "react-kakao-maps-sdk";
import { getMarkerSrc, getNumberMarkerSrc } from "../../../utils/marker";
import { useSpotStore } from "../../../stores/useSpotStore";
import { useEffect, useRef, useState } from "react";
import { Minus, Plus, Road, RotateCw } from "lucide-react";
import { useDirectionStore } from "../../../stores/useDirectionStore";
import { useWayPointStore } from "../../../stores/useWayPointStore";
import { getCongestionStyle } from "../../../constants/congestion.utils";

interface IKakaoMapProps {
  mode: "explore" | "route";
  open: boolean;
  hasDetail: boolean;
}

const KakaoMap = ({ mode, open, hasDetail }: IKakaoMapProps) => {
  const mapRef = useRef<kakao.maps.Map>(null);
  const {
    selectedSpot,
    setSelectedSpot,
    setDetailSpot,
    setSearchCenter,
    visibleSpots,
  } = useSpotStore();
  const { directions } = useDirectionStore();
  const { wayPoint, expandedDay } = useWayPointStore();

  const [showSearchHereButton, setShowSearchHereButton] = useState(false);

  const [level, setLevel] = useState(9);

  const [hoveredSpot, setHoveredSpot] = useState<string | null>(null);

  // 교통정보 표시 여부
  const [showTraffic, setShowTraffic] = useState(false);

  const getMarkerSize = (mapLevel: number) => {
    const minLevel = 1;
    const maxLevel = 9;
    const minSize = 30;
    const maxSize = 80;

    const clampedLevel = Math.min(Math.max(mapLevel, minLevel), maxLevel);
    const ratio = (maxLevel - clampedLevel) / (maxLevel - minLevel);
    const size = minSize + ratio * (maxSize - minSize);

    return Math.round(size);
  };

  const markerSize = getMarkerSize(level);

  const handleUserMapMove = () => {
    setShowSearchHereButton(true);
  };

  const handleSearchHere = () => {
    const map = mapRef.current;
    if (!map) return;

    const center = map.getCenter();
    setSearchCenter({ mapX: center.getLng() - 0.006, mapY: center.getLat() });
    setShowSearchHereButton(false);
  };

  // wayPoint는 일차별 배열이라 지금 펼쳐져 있는 일차의 관광지만 지도에 마커로 찍도록
  const currentDaySpots =
    expandedDay !== null ? (wayPoint[expandedDay] ?? []) : [];

  const lat = selectedSpot?.mapy ? parseFloat(selectedSpot.mapy) : 33.34714;
  const lng = selectedSpot?.mapx ? parseFloat(selectedSpot.mapx) : 126.41986;

  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    const nextLevel = selectedSpot ? 4 : 9;
    map.setLevel(nextLevel);
    setLevel(nextLevel);
  }, [selectedSpot]);

  const handleLevel = (type: "increase" | "decrease") => {
    const map = mapRef.current;
    if (!map) return;

    const nextLevel =
      type === "increase" ? map.getLevel() + 1 : map.getLevel() - 1;

    map.setLevel(nextLevel);
    setLevel(nextLevel);
  };

  const handleZoomChanged = () => {
    const map = mapRef.current;
    if (!map) return;

    setLevel(map.getLevel());
    handleUserMapMove();
  };

  // 교통정보 레이어 on/off
  const handleToggleTraffic = () => {
    const map = mapRef.current;
    if (!map) return;

    // react-kakao-maps-sdk 타입에 TRAFFIC 관련 정의가 없는 경우가 있어 any로 캐스팅
    const kakaoMap = map as unknown as {
      addOverlayMapTypeId: (id: unknown) => void;
      removeOverlayMapTypeId: (id: unknown) => void;
    };

    if (showTraffic) {
      kakaoMap.removeOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC);
    } else {
      kakaoMap.addOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC);
    }
    setShowTraffic((prev) => !prev);
  };

  const routePath =
    directions?.routes?.[0]?.sections
      ?.flatMap((section) => section.roads)
      ?.flatMap((road) => road.vertexes)
      ?.reduce((acc: { lat: number; lng: number }[], _, i, arr) => {
        if (i % 2 === 0) acc.push({ lat: arr[i + 1], lng: arr[i] });
        return acc;
      }, []) ?? [];

  return (
    <MapContainer>
      <Map
        id="kakao-map"
        center={{ lat, lng: selectedSpot?.mapy ? lng - 0.006 : lng }}
        style={{ width: "100%", height: "100%" }}
        level={selectedSpot ? 4 : 9}
        zoomable={true}
        ref={mapRef}
        onDragEnd={handleUserMapMove}
        onZoomChanged={handleZoomChanged}
      >
        {mode === "explore" &&
          visibleSpots.map((spot) => {
            const congestionColor = getCongestionStyle(
              spot.congestion?.cnctrRate ?? null,
            ).bgColor;

            return (
              <MapMarker
                key={spot.contentid}
                position={{
                  lat: Number(spot.mapy),
                  lng: Number(spot.mapx),
                }}
                image={{
                  src: getMarkerSrc(congestionColor, spot.contenttypeid),
                  size: { width: markerSize, height: markerSize },
                  options: {
                    offset: { x: markerSize / 2, y: markerSize / 1.5 },
                  },
                }}
                clickable={true}
                onClick={() => {
                  setSelectedSpot(spot);
                  setDetailSpot(spot);
                }}
                onMouseOver={() => setHoveredSpot(spot.contentid)}
                onMouseOut={() => setHoveredSpot(null)}
              />
            );
          })}

        {mode === "route" &&
          currentDaySpots.map((point, idx) => (
            <MapMarker
              key={point.contentid}
              position={{
                lat: Number(point.mapy),
                lng: Number(point.mapx),
              }}
              image={{
                src: getNumberMarkerSrc(idx + 1),
                size: { width: 40, height: 40 },
                options: { offset: { x: 40, y: 40 } },
              }}
              clickable={true}
              onClick={() => {
                setSelectedSpot(point);
                setDetailSpot(point);
              }}
            />
          ))}

        {hoveredSpot &&
          (() => {
            const spots = mode === "explore" ? visibleSpots : currentDaySpots;
            const spot = spots.find((s) => s.contentid === hoveredSpot);
            if (!spot) return null;

            const congestionColor = getCongestionStyle(
              spot.congestion?.cnctrRate ?? null,
            ).bgColor;

            return (
              <CustomOverlayMap
                position={{
                  lat: Number(spot.mapy),
                  lng: Number(spot.mapx),
                }}
                yAnchor={-0.5}
              >
                <MarkerLabel $bgColor={congestionColor}>
                  {spot.title}
                </MarkerLabel>
              </CustomOverlayMap>
            );
          })()}

        {mode === "route" && routePath.length > 0 && (
          <>
            <Polyline
              path={routePath}
              strokeWeight={24}
              strokeColor="#12d3d7"
              strokeOpacity={0.5}
              strokeStyle="solid"
            />
            <Polyline
              path={routePath}
              strokeWeight={15}
              strokeColor="#00a7aa"
              strokeOpacity={1}
              strokeStyle="solid"
            />
            <Polyline
              path={routePath}
              strokeWeight={13}
              strokeColor="#12d3d7"
              strokeOpacity={1}
              strokeStyle="solid"
            />
            <Polyline
              path={routePath}
              strokeWeight={6}
              strokeColor="#0f979a"
              strokeOpacity={0.5}
              strokeStyle="solid"
            />
            <Polyline
              path={routePath}
              strokeWeight={2}
              strokeColor="#fff"
              strokeOpacity={1}
              strokeStyle="solid"
            />
          </>
        )}
      </Map>
      {showSearchHereButton && (
        <SearchHereButton
          onClick={handleSearchHere}
          $open={open}
          $hasDetail={hasDetail}
        >
          <RefreshIcon />현 지도에서 검색
        </SearchHereButton>
      )}

      <ZoomButtonContainer>
        <ZoomInButton onClick={() => handleLevel("decrease")}>
          <ZoomInIcon />
        </ZoomInButton>

        <ZoomOutButton onClick={() => handleLevel("increase")}>
          <ZoomOutIcon />
        </ZoomOutButton>
      </ZoomButtonContainer>

      <TrafficButton
        type="button"
        onClick={handleToggleTraffic}
        $active={showTraffic}
        aria-pressed={showTraffic}
        aria-label="실시간 교통정보 표시 전환"
      >
        <RoadIcon $active={showTraffic} />
      </TrafficButton>
    </MapContainer>
  );
};

const MarkerLabel = styled.div<{ $bgColor: string }>`
  padding: 4px 10px;

  border-radius: 8px;
  background-color: ${({ $bgColor }) => $bgColor};

  color: #fdfcf8;
  font-size: 0.75rem;
  font-weight: 600;
  white-space: nowrap;

  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);

  pointer-events: none;
`;

const MapContainer = styled.div`
  position: absolute;
  inset: 0;
  z-index: 0;

  width: 100%;
  height: 100%;
`;

const ZoomButtonContainer = styled.div`
  position: absolute;
  top: 16px;
  right: 16px;

  display: flex;
  flex-direction: column;

  border-radius: 16px;

  background-color: #fdfcf8;

  box-shadow: 0 0px 4px rgba(0, 0, 0, 0.05);

  z-index: 10;
`;

const ZoomInIcon = styled(Plus)`
  width: 16px;
  height: 16px;

  stroke: #1b2024;
  fill: #fdfcf8;

  stroke-width: 2;
`;

const ZoomOutIcon = styled(Minus)`
  width: 16px;
  height: 16px;

  stroke: #1b2024;
  fill: #fdfcf8;

  stroke-width: 2;
`;

const ZoomInButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 40px;
  height: 40px;

  padding: 8px 12px;

  border: none;
  border-bottom: 1px solid #f1eee6;
  border-radius: 16px 16px 0 0;

  background-color: #fdfcf8;
  cursor: pointer;

  &:hover {
    background-color: #f7f5ef;
  }
`;

const ZoomOutButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 40px;
  height: 40px;

  padding: 8px 12px;

  border: none;
  border-top: 1px solid #f1eee6;
  border-radius: 0 0 16px 16px;

  background-color: #fdfcf8;
  cursor: pointer;

  &:hover {
    background-color: #f7f5ef;
  }
`;

// 교통정보 토글 버튼 (줌 버튼 아래에 위치)
const TrafficButton = styled.button<{ $active: boolean }>`
  position: absolute;
  top: 116px;
  right: 16px;

  display: flex;
  justify-content: center;
  align-items: center;

  width: 40px;
  height: 40px;

  border: none;
  border-radius: 16px;

  background-color: ${({ $active }) => ($active ? "#0c9799" : "#fdfcf8")};
  box-shadow: 0 0px 4px rgba(0, 0, 0, 0.05);
  cursor: pointer;

  transition: background-color 0.15s ease;

  z-index: 10;

  &:hover {
    background-color: ${({ $active }) => ($active ? "#0a8385" : "#f7f5ef")};
  }
`;

const RoadIcon = styled(Road)<{ $active: boolean }>`
  width: 16px;
  height: 16px;

  stroke: ${({ $active }) => ($active ? "#fff" : "#1b2024")};
  fill: none;

  stroke-width: 2;
`;

const SearchHereButton = styled.button<{
  $open: boolean;
  $hasDetail: boolean;
}>`
  position: absolute;
  top: 24px;
  left: ${({ $open, $hasDetail }) => {
    if (!$open) return "50%";
    return $hasDetail ? "calc(50% + 420px)" : "calc(50% + 210px)";
  }};
  transform: translateX(-50%);

  display: flex;
  align-items: center;
  gap: 6px;

  height: 36px;
  padding: 0 16px;

  border: none;
  border-radius: 9999px;

  background-color: #0c9799;
  color: #fff;
  font-size: 0.8125rem;
  font-weight: 600;
  white-space: nowrap;

  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.12);
  cursor: pointer;

  z-index: 10;

  transition:
    background-color 0.15s ease,
    transform 0.1s ease;

  @media (max-width: 768px) {
    left: 50%;
  }

  &:hover {
    background-color: #0a8385;
  }

  &:active {
    transform: translateX(-50%) scale(0.97);
  }
`;

const RefreshIcon = styled(RotateCw)`
  width: 14px;
  height: 14px;
  flex-shrink: 0;
  stroke: #fff;
  stroke-width: 2.5;
`;

export default KakaoMap;
