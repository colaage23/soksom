import styled, { keyframes } from "styled-components";
import { CustomOverlayMap, Map } from "react-kakao-maps-sdk";
import { congestionStyle, mockSpots } from "../../Map/mock";
import { useEffect, useRef } from "react";
import { getMarkerSrc } from "../../../utils/marker";

const HomeMap = () => {
  const mapRef = useRef<kakao.maps.Map>(null);

  const mainSpots = mockSpots.slice(0, 6);

  useEffect(() => {
    let resizeObserver: ResizeObserver | null = null;
    let cleanupResize: (() => void) | null = null;

    const setup = () => {
      const map = mapRef.current;
      if (!map) {
        // 아직 map이 안 잡혔으면 다음 프레임에 재시도
        requestAnimationFrame(setup);
        return;
      }

      const center = map.getCenter();
      const relayout = () => {
        map.relayout();
        map.setCenter(center);
      };

      const container = document.getElementById("home-kakao-map");
      if (container) {
        resizeObserver = new ResizeObserver(relayout);
        resizeObserver.observe(container);
      }

      window.addEventListener("resize", relayout);
      cleanupResize = () => window.removeEventListener("resize", relayout);
    };

    setup();

    return () => {
      resizeObserver?.disconnect();
      cleanupResize?.();
    };
  }, []);

  document.getElementById("home-kakao-map");

  return (
    <MapContainer>
      <MapBox>
        <MapSection>
          <Map
            id="home-kakao-map"
            center={{ lat: 33.34214, lng: 126.571986 }}
            style={{ width: "100%", height: "100%" }}
            level={10}
            draggable={false}
            zoomable={false}
            scrollwheel={false}
            disableDoubleClick={true}
            disableDoubleClickZoom={true}
            ref={mapRef}
          >
            {mainSpots.map((spot, index) => (
              <CustomOverlayMap
                key={spot.name}
                position={{
                  lat: spot.latitude,
                  lng: spot.longitude,
                }}
                yAnchor={1}
              >
                <MarkerFloatWrapper
                  style={{ animationDelay: `${index * 0.3}s` }}
                >
                  <MarkerLabel
                    $bgColor={congestionStyle[spot.congestion].bgColor}
                  >
                    {spot.name} · {congestionStyle[spot.congestion].progress}%
                  </MarkerLabel>
                  <MarkerPin
                    src={getMarkerSrc(
                      `${congestionStyle[spot.congestion].bgColor}`,
                    )}
                    $bgColor={congestionStyle[spot.congestion].bgColor}
                  />
                </MarkerFloatWrapper>
              </CustomOverlayMap>
            ))}
          </Map>
        </MapSection>

        <CongestionSection>
          <CongestionTitle>
            지금 제주,
            <br />
            어디가 <span>붐비는지 </span>
            한눈에.
          </CongestionTitle>
          <CongestionSubtitle>
            한국관광공사 OpenAPI와 자체 예측 모델로 분 단위 혼잡도를 보여드려요.
          </CongestionSubtitle>
          <SpotList>
            {mainSpots.map((spot, index) => {
              const status = congestionStyle[spot.congestion];
              return (
                <SpotCard key={index}>
                  <SpotItem>
                    <SpotDot
                      style={{
                        backgroundColor: status.bgColor,
                      }}
                    />
                    <SpotTitle>{spot.name}</SpotTitle>
                  </SpotItem>
                  <CongestionBox>
                    <CongestionProgressBar>
                      <CongestionProgressFill
                        style={{
                          backgroundColor: status.bgColor,
                          width: `${status.progress}%`,
                        }}
                      />
                    </CongestionProgressBar>
                    <CongestionBadge
                      style={{
                        backgroundColor:
                          spot.congestion === "혼잡"
                            ? status.bgColor
                            : `${status.bgColor}65`,
                        color: status.color,
                      }}
                    >
                      {spot.congestion}
                    </CongestionBadge>
                  </CongestionBox>
                </SpotCard>
              );
            })}
          </SpotList>
        </CongestionSection>
      </MapBox>
    </MapContainer>
  );
};

const float = keyframes`
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-3px);
  }
`;

const MapContainer = styled.section`
  width: 100%;
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
  padding: 96px 32px;

  background-color: #fffafc;
`;

const MapSection = styled.div`
  width: 100%;
  height: 480px;

  border-radius: 36px 0 0 36px;

  overflow: hidden;
  @media (max-width: 1024px) {
    border-radius: 36px 36px 0 0;
  }
`;

const MapBox = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;

  background-color: #faf9f2;

  border: 1px solid #e5e7eb;
  border-radius: 36px;

  @media (max-width: 1024px) {
    flex-direction: column;
  }
`;

const CongestionSection = styled.section`
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  padding: 34px;

  @media (min-width: 1025px) {
    max-width: 540px;
  }
`;

const CongestionTitle = styled.h2`
  margin: 0;

  font-family: Gowun Batang;
  font-size: 2.25rem;
  color: #040303;

  line-height: 1.25;

  word-break: keep-all;

  span {
    font-family: Gowun Batang;
    color: #0c9799;
  }
`;

const CongestionSubtitle = styled.p`
  margin: 12px 0 0;

  font-size: 0.75rem;
  color: #474e55;
`;

const SpotList = styled.ul`
  margin: 20px 0 0;
  padding: 0;

  width: 100%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
`;

const SpotCard = styled.li`
  width: 100%;

  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 12px 0;

  &:not(:last-child) {
    border-bottom: 0.5px solid #e5e7eb;
  }
`;

const SpotItem = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const SpotDot = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 9999px;
`;

const SpotTitle = styled.p`
  margin: 0;

  font-size: 0.875rem;
  color: #100c0d;
`;

const CongestionBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
`;

const CongestionProgressBar = styled.div`
  height: 6px;
  width: 96px;

  border-radius: 30px;

  background-color: #eae6dd;
`;

const CongestionProgressFill = styled.div`
  height: 6px;

  border-radius: 30px;
`;

const CongestionBadge = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  padding: 4px 8px;

  border-radius: 30px;

  color: #20201f;
  font-size: 0.6875rem;
  font-weight: 500;
`;

const MarkerFloatWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;

  animation: ${float} 2.4s ease-in-out infinite;
`;

const MarkerPin = styled.img<{ $bgColor: string }>`
  width: 24px;
  height: 24px;

  border: 3px solid ${({ $bgColor }) => `${$bgColor}80`};
  border-radius: 50%;

  box-shadow: 0 6px 8px rgba(0, 0, 0, 0.1);
`;

const MarkerLabel = styled.div<{ $bgColor: string }>`
  padding: 4px 8px;
  background-color: ${({ $bgColor }) => `${$bgColor}`};
  border-radius: 6px;
  color: #fff;
  font-size: 0.625rem;
  font-weight: 600;
  white-space: nowrap;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
`;

export default HomeMap;
