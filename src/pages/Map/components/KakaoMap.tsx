import styled from "styled-components";
import { congestionStyle } from "../mock";
import { Map, MapMarker } from "react-kakao-maps-sdk";
import { getMarkerSrc } from "../../../utils/marker";
import { useSpotStore } from "../../../stores/useSpotStore";

const KakaoMap = () => {
  const { selectedSpot, setDetailSpot } = useSpotStore();

  return (
    <MapContainer>
      <Map
        id="kakao-map"
        center={{
          // 지도의 중심좌표
          lat: selectedSpot?.latitude ?? 33.34714,
          lng: selectedSpot?.longitude
            ? selectedSpot.longitude - 0.006
            : 126.41986,
        }}
        style={{
          // 지도의 크기
          width: "100%",
          height: "100%",
        }}
        level={selectedSpot ? 4 : 9} // 지도의 확대 레벨
      >
        {selectedSpot && (
          <MapMarker
            position={{
              lat: selectedSpot?.latitude,
              lng: selectedSpot?.longitude,
            }}
            image={{
              src: getMarkerSrc(
                congestionStyle[selectedSpot.congestion].bgColor,
              ),
              size: { width: 40, height: 40 },
              options: { offset: { x: 40, y: 40 } },
            }}
            clickable={true}
            onClick={() => setDetailSpot(selectedSpot)}
          />
        )}
      </Map>
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

export default KakaoMap;
