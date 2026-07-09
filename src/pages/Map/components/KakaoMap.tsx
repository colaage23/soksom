import styled from "styled-components";
import { Map, MapMarker, Polyline } from "react-kakao-maps-sdk";
import { getMarkerSrc, getNumberMarkerSrc } from "../../../utils/marker";
import { useSpotStore } from "../../../stores/useSpotStore";
import { useEffect, useRef } from "react";
import { LocateFixed, Minus, Plus } from "lucide-react";
import { useDirectionStore } from "../../../stores/useDirectionStore";
import { useWayPointStore } from "../../../stores/useWayPointStore";

interface IKakaoMapProps {
  mode: "explore" | "route";
}

const KakaoMap = ({ mode }: IKakaoMapProps) => {
  const mapRef = useRef<kakao.maps.Map>(null);
  const { selectedSpot, setDetailSpot } = useSpotStore();
  const { directions } = useDirectionStore();
  const { wayPoint, expandedDay } = useWayPointStore();

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

  const handleCurrentLocation = () => {
    // 추후 alert말고 커스텀 모달이나 토스트 메세지 추가하면 예쁠 듯.
    if (!navigator.geolocation) {
      alert("현재 위치를 지원하지 않는 브라우저입니다.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;

        const map = mapRef.current;

        if (map) {
          map.setCenter(new kakao.maps.LatLng(lat, lng));
          map.setLevel(3);
        }
      },
      (error) => {
        console.error(error);

        switch (error.code) {
          case error.PERMISSION_DENIED:
            alert("위치 권한이 거부되었습니다.");
            break;
          case error.POSITION_UNAVAILABLE:
            alert("위치 정보를 사용할 수 없습니다.");
            break;
          case error.TIMEOUT:
            alert("위치 요청 시간이 초과되었습니다.");
            break;
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      },
    );
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
        center={{
          // 지도의 중심좌표
          lat: lat,
          lng: selectedSpot?.mapy ? lng - 0.006 : lng,
        }}
        style={{
          // 지도의 크기
          width: "100%",
          height: "100%",
        }}
        level={selectedSpot ? 4 : 9} // 지도의 확대 레벨
        zoomable={true}
        ref={mapRef}
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
      <ZoomButtonContainer>
        <ZoomInButton onClick={() => handleLevel("decrease")}>
          <ZoomInIcon />
        </ZoomInButton>

        <ZoomOutButton onClick={() => handleLevel("increase")}>
          <ZoomOutIcon />
        </ZoomOutButton>
      </ZoomButtonContainer>

      <CurrentLocateButton onClick={() => handleCurrentLocation()}>
        <CurrentLocateIcon />
      </CurrentLocateButton>
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

const CurrentLocateIcon = styled(LocateFixed)`
  width: 16px;
  height: 16px;

  stroke: #1b2024;
  fill: #fdfcf8;

  stroke-width: 2;
`;

const CurrentLocateButton = styled.button`
  position: absolute;
  top: 112px;
  right: 16px;

  display: flex;
  justify-content: center;
  align-items: center;

  width: 40px;
  height: 40px;

  padding: 8px 12px;

  border: none;
  border-top: 1px solid #f1eee6;
  border-radius: 16px;

  background-color: #fdfcf8;

  box-shadow: 0 0px 4px rgba(0, 0, 0, 0.05);

  cursor: pointer;

  z-index: 10;

  &:hover {
    background-color: #f7f5ef;
  }
`;

export default KakaoMap;
