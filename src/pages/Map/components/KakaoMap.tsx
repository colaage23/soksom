import styled from "styled-components";
import { Map, MapMarker, Polyline } from "react-kakao-maps-sdk";
import { getMarkerSrc, getNumberMarkerSrc } from "../../../utils/marker";
import { useSpotStore } from "../../../stores/useSpotStore";
import { useEffect, useRef, useState } from "react";
import { Minus, Plus, RotateCw } from "lucide-react";
import { useDirectionStore } from "../../../stores/useDirectionStore";
import { useWayPointStore } from "../../../stores/useWayPointStore";

interface IKakaoMapProps {
  mode: "explore" | "route";
  open: boolean;
  hasDetail: boolean;
}

const KakaoMap = ({ mode, open, hasDetail }: IKakaoMapProps) => {
  const mapRef = useRef<kakao.maps.Map>(null);
  const { selectedSpot, setDetailSpot, setSearchCenter } = useSpotStore();
  const { directions } = useDirectionStore();
  const { wayPoint, expandedDay } = useWayPointStore();

  const [showSearchHereButton, setShowSearchHereButton] = useState(false);

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

  const lat = selectedSpot ? parseFloat(selectedSpot.mapy) : 33.34714;
  const lng = selectedSpot ? parseFloat(selectedSpot.mapx) : 126.41986;

  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    map.setLevel(selectedSpot ? 4 : 9);
  }, [selectedSpot]);

  const handleLevel = (type: "increase" | "decrease") => {
    const map = mapRef.current;
    if (!map) return;

    if (type === "increase") {
      map.setLevel(map.getLevel() + 1);
    } else {
      map.setLevel(map.getLevel() - 1);
    }
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
        onZoomChanged={handleUserMapMove}
      >
        {(!currentDaySpots || currentDaySpots.length === 0) && selectedSpot && (
          <MapMarker
            position={{
              lat: lat,
              lng: lng,
            }}
            image={{
              src: getMarkerSrc("#000000"),
              size: { width: 40, height: 40 },
              options: { offset: { x: 40, y: 40 } },
            }}
            clickable={true}
            onClick={() => setDetailSpot(selectedSpot)}
          />
        )}

        {currentDaySpots.map((point, idx) => (
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
            onClick={() => setDetailSpot(point)}
          />
        ))}

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
    </MapContainer>
  );
};

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
