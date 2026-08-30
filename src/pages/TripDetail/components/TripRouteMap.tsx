import { useMemo } from "react";
import styled from "styled-components";
import { CustomOverlayMap, Map, Polyline } from "react-kakao-maps-sdk";
import type { ITripDetail } from "../../../types/trip";

interface Props {
  places: ITripDetail[];
  dayColor?: string;
}

const TripRouteMap = ({ places, dayColor = "#0c9799" }: Props) => {
  const validPlaces = useMemo(
    () => places.filter((p) => p.mapx && p.mapy),
    [places],
  );

  if (validPlaces.length === 0) {
    return (
      <MapBox>
        <EmptyState>위치 정보가 없어요</EmptyState>
      </MapBox>
    );
  }

  const path = validPlaces.map((p) => ({
    lat: Number(p.mapy),
    lng: Number(p.mapx),
  }));

  const center = path[Math.floor(path.length / 2)];

  return (
    <MapBox>
      <Map
        center={center}
        style={{ width: "100%", height: "100%" }}
        level={7}
        zoomable={false}
        draggable={false}
      >
        {path.map((position, index) => (
          <CustomOverlayMap
            key={validPlaces[index].detailId}
            position={position}
          >
            <MarkerBadge $color={dayColor}>{index + 1}</MarkerBadge>
          </CustomOverlayMap>
        ))}

        {path.length > 1 && (
          <Polyline
            path={path}
            strokeWeight={4}
            strokeColor={dayColor}
            strokeOpacity={0.85}
            strokeStyle="solid"
          />
        )}
      </Map>
    </MapBox>
  );
};

export default TripRouteMap;

const MapBox = styled.div`
  position: relative;
  width: 100%;
  height: 240px;
  border: 1px solid #edebe5;
  border-radius: 16px;
  overflow: hidden;
`;

const MarkerBadge = styled.div<{ $color: string }>`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 24px;
  height: 24px;
  border-radius: 9999px;
  border: 2px solid #fff;

  background: ${({ $color }) => $color};
  color: #fff;
  font-size: 0.675rem;
  font-weight: 700;

  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.18);
`;

const EmptyState = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;

  color: #a8a196;
  font-size: 0.8125rem;
  font-weight: 500;
`;
