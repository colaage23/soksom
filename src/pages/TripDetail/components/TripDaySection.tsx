import { MapPin } from "lucide-react";
import styled from "styled-components";
import type { ITripDetail } from "../../../types/trip";
import { useDayRoute } from "../../../hooks/trip/useDayRoute";
import { getCongestionStyle } from "../../../constants/congestion.utils";
import RouteSummaryCard from "../../Map/components/RouteSummaryCard";
import TripRouteMap from "./TripRouteMap";

interface Props {
  date: string;
  dayIndex: number;
  spots: ITripDetail[];
  dayColor: string;
}

const formatLeg = (distance: number, duration: number) =>
  `${(distance / 1000).toFixed(1)}km · 약 ${Math.round(duration / 60)}분`;

const TripDaySection = ({ date, dayIndex, spots, dayColor }: Props) => {
  const { summary, resultMsg, legs } = useDayRoute(spots);

  const congestionBySpot = spots.map((spot) => {
    const cnctrRate = spot.congestion?.cnctrRate
      ? Number(spot.congestion.cnctrRate)
      : null;
    return getCongestionStyle(cnctrRate);
  });

  return (
    <DaySection>
      <DayTitle>
        <DayBadge $color={dayColor}>Day {dayIndex + 1}</DayBadge>
        {date}
      </DayTitle>

      <TripRouteMap
        places={spots}
        dayColor={dayColor}
        congestionColors={congestionBySpot.map((c) => c.bgColor)}
      />

      {spots.length > 1 && (
        <RouteSummaryCard
          distance={summary?.distance}
          duration={summary?.duration}
          resultMsg={resultMsg}
        />
      )}

      <PlaceList>
        {spots.map((place, idx) => {
          const congestion = congestionBySpot[idx];

          return (
            <PlaceRow key={place.detailId}>
              <PlaceCard>
                <OrderBadge $color={dayColor}>{place.visitOrder}</OrderBadge>

                <PlaceVisual>
                  {place.firstimage ? (
                    <PlaceImage src={place.firstimage} alt={place.title} />
                  ) : (
                    <MapPin size={20} color="#a8a196" />
                  )}
                </PlaceVisual>

                <PlaceBody>
                  <PlaceTitleRow>
                    <PlaceTitle>{place.title}</PlaceTitle>
                    <CongestionBadge
                      $bg={congestion.bgColor}
                      $color={congestion.color}
                    >
                      {congestion.label}
                    </CongestionBadge>
                  </PlaceTitleRow>
                  <PlaceTagBox>
                    {place.lclsSystm1Nm && (
                      <PlaceTag>#{place.lclsSystm1Nm}</PlaceTag>
                    )}
                    {place.lclsSystm2Nm && (
                      <PlaceTag>#{place.lclsSystm2Nm}</PlaceTag>
                    )}
                    {place.lclsSystm3Nm && (
                      <PlaceTag>#{place.lclsSystm3Nm}</PlaceTag>
                    )}
                  </PlaceTagBox>
                  <PlaceAddr>{place.addr1 || "주소 정보 없음"}</PlaceAddr>
                </PlaceBody>
              </PlaceCard>

              {legs?.[idx] && idx < spots.length - 1 && (
                <LegConnector>
                  <LegLine />
                  <LegLabel>
                    {formatLeg(legs[idx].distance, legs[idx].duration)}
                  </LegLabel>
                  <LegLine />
                </LegConnector>
              )}
            </PlaceRow>
          );
        })}
      </PlaceList>
    </DaySection>
  );
};

export default TripDaySection;

const DaySection = styled.section`
  display: flex;
  flex-direction: column;
  gap: 10px;

  margin-top: 18px;
`;

const DayTitle = styled.h2`
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 0;

  color: #2e3339;
  font-size: 0.9375rem;
  font-weight: 700;
`;

const DayBadge = styled.span<{ $color: string }>`
  display: inline-flex;
  align-items: center;
  padding: 3px 10px;
  border-radius: 9999px;
  background: ${({ $color }) => `${$color}1a`};
  color: ${({ $color }) => $color};
  font-size: 0.75rem;
  font-weight: 700;
`;

const PlaceList = styled.div`
  display: flex;
  flex-direction: column;
`;

const PlaceRow = styled.div`
  display: flex;
  flex-direction: column;
`;

const PlaceCard = styled.article`
  display: grid;
  grid-template-columns: 22px 56px 1fr;
  align-items: center;
  gap: 12px;

  padding: 12px;
  border: 1px solid #edebe5;
  border-radius: 14px;
  background: #fff;
`;

const OrderBadge = styled.span<{ $color: string }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;

  width: 22px;
  height: 22px;
  border-radius: 9999px;
  background: ${({ $color }) => `${$color}1a`};

  color: ${({ $color }) => $color};
  font-size: 0.6875rem;
  font-weight: 700;
`;

const PlaceVisual = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 56px;
  height: 56px;
  overflow: hidden;
  border-radius: 12px;
  background: #f5f2eb;
`;

const PlaceImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const PlaceBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3px;
  min-width: 0;
`;

const PlaceTitle = styled.h4`
  margin: 0;
  color: #101714;
  font-size: 0.9375rem;
  font-weight: 600;
`;

const PlaceTagBox = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const PlaceTag = styled.span`
  width: fit-content;
  color: #0c9799;
  font-size: 0.75rem;
  font-weight: 600;
`;

const PlaceAddr = styled.p`
  margin: 0;
  overflow: hidden;
  color: #8f887c;
  font-size: 0.8125rem;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const LegConnector = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;

  padding: 6px 0 6px 33px; /* OrderBadge(22px) + gap(12px) 라인에 맞춤 */
`;

const LegLine = styled.div`
  width: 1px;
  height: 12px;
  background: #edebe5;
`;

const LegLabel = styled.span`
  color: #7b827d;
  font-size: 0.75rem;
  font-weight: 600;
  white-space: nowrap;
`;

const PlaceTitleRow = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  min-width: 0;
`;

const CongestionBadge = styled.span<{ $bg: string; $color: string }>`
  flex-shrink: 0;

  padding: 2px 7px;
  border-radius: 999px;

  background: ${({ $bg }) => $bg};
  color: ${({ $color }) => $color};

  font-size: 0.6875rem;
  font-weight: 700;
`;
