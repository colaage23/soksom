import styled from "styled-components";
import { congestionStyle, type Spot } from "../mock";
import { Map, MapMarker } from "react-kakao-maps-sdk";
import { getMarkerSrc } from "../../../utils/marker";

interface IKakaoMapProps {
  spot: Spot | null;
  setDetailSpot: React.Dispatch<React.SetStateAction<Spot | null>>;
}

const KakaoMap = ({ spot, setDetailSpot }: IKakaoMapProps) => {
  return (
    <MapContainer>
      <Map
        id="kakao-map"
        center={{
          // 지도의 중심좌표
          lat: spot?.latitude ?? 33.34714,
          lng: spot?.longitude ? spot.longitude - 0.006 : 126.41986,
        }}
        style={{
          // 지도의 크기
          width: "100%",
          height: "100%",
        }}
        level={spot ? 4 : 9} // 지도의 확대 레벨
      >
        {spot && (
          <MapMarker
            position={{ lat: spot?.latitude, lng: spot?.longitude }}
            image={{
              src: getMarkerSrc(congestionStyle[spot.congestion].bgColor),
              size: { width: 40, height: 40 },
              options: { offset: { x: 40, y: 40 } },
            }}
            clickable={true}
            onClick={() => setDetailSpot(spot)}
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
