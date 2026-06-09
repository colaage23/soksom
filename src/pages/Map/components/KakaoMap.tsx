import { useEffect, useRef } from "react";
import styled from "styled-components";
import type { Spot } from "../mock";

interface IKakaoMap {
  spot: Spot | null;
}

const KakaoMap = ({ spot }: IKakaoMap) => {
  const mapRef = useRef(null);

  useEffect(() => {
    const kakao = window.kakao;
    const container = mapRef.current; // 지도를 담을 영역의 DOM 참조

    // 지도를 생성할 때 필요한 기본 옵션
    const options = {
      center: new kakao.maps.LatLng(33.34714, 126.41986), // 지도의 중심좌표.
      level: 9, // 지도의 레벨(확대, 축소 정도)
    };

    new kakao.maps.Map(container, options); // 지도 생성 및 객체 리턴
  }, []);

  return (
    <MapContainer>
      <MapSection ref={mapRef} id="kakao-map" />
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

const MapSection = styled.section`
  width: 100%;
  height: 100%;
`;

export default KakaoMap;
