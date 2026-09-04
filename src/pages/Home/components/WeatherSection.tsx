import {
  ArrowUpRight,
  CircleAlert,
  Cloud,
  CloudRain,
  Heart,
  Sun,
  SunMedium,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import fallbackImage from "../../../assets/fallback.png";
import colors from "../../../constants/colors";
import { useJejuWeather } from "../../../hooks/useJejuWeather";
import { useGetFavoriteSpots } from "../../../hooks/favorite/useGetFavoriteSpots";
import { useToggleFavorite } from "../../../hooks/favorite/useToggleFavorite";
import {
  homeSectionDescription,
  homeSectionEyebrow,
  homeSectionInner,
  homeSectionTitle,
} from "../styles/homeSectionStyles.ts";

const weatherIconByCode = (weatherCode: number, size: number, isDay = true) => {
  if (weatherCode === 0) {
    return isDay ? <SunMedium size={size} /> : <Cloud size={size} />;
  }

  if ([1, 2, 3, 45, 48].includes(weatherCode)) {
    return <Cloud size={size} />;
  }

  if ([51, 53, 55, 61, 63, 65, 80, 81, 82, 95].includes(weatherCode)) {
    return <CloudRain size={size} />;
  }

  return <Sun size={size} />;
};

const WeatherSection = () => {
  const navigate = useNavigate();
  const { data: weather, isLoading, isError } = useJejuWeather();
  const { data: favoriteSpots = [], isLoading: isFavoriteLoading } =
    useGetFavoriteSpots();
  const { toggleFavorite, isPending: isFavoritePending } = useToggleFavorite();

  const forecastItems = weather?.forecast ?? [];
  const places = favoriteSpots.slice(0, 3);

  const handleMoveToSpot = (title: string, contentId: string) => {
    const searchParams = new URLSearchParams({ keyword: title, contentId });
    navigate({ pathname: "/map", search: `?${searchParams.toString()}` });
  };

  return (
    <Section>
      <Inner>
        <Header>
          <Eyebrow>JEJU AT A GLANCE</Eyebrow>
          <Title>
            날씨 한 번 슬쩍,
            <br />
            관심 장소 바로 출발.
          </Title>
          <HeaderDescription>
            오늘 제주 하늘과 함께, 지금 바로 들르기 좋은 장소를 같은 흐름으로
            묶어 보여드려요.
          </HeaderDescription>
          <MoreLink type="button" onClick={() => navigate("/mypage/favorites")}>
            관심 관광지 전체 보기
            <ArrowUpRight size={16} />
          </MoreLink>
        </Header>

        <ContentGrid>
          <WeatherCard>
            <WeatherTop>
              <div>
                <WeatherMeta>
                  {weather?.locationLabel ?? "제주시 · 지금"}
                </WeatherMeta>
                <WeatherSummary>
                  {isLoading
                    ? "제주 날씨를 불러오는 중이에요"
                    : isError
                      ? "날씨 정보를 불러오지 못했어요"
                      : weather?.summary}
                </WeatherSummary>
              </div>
              <WeatherIconWrap>
                {weatherIconByCode(
                  weather?.weatherCode ?? 0,
                  20,
                  weather?.isDay ?? true,
                )}
              </WeatherIconWrap>
            </WeatherTop>

            <WeatherInfoRow>
              <CurrentTemp>{weather?.temperature ?? "--°"}</CurrentTemp>
              <WeatherDetailGroup>
                <WeatherDetails>
                  체감 {weather?.apparentTemperature ?? "--°"} · 습도{" "}
                  {weather?.humidity ?? "--%"}
                </WeatherDetails>
                <WeatherDetails>
                  바람 {weather?.windSpeed ?? "--m/s"} · 자외선{" "}
                  {weather?.uvIndex ?? "--"}
                </WeatherDetails>
              </WeatherDetailGroup>
            </WeatherInfoRow>

            <ForecastStrip>
              {forecastItems.map(
                ({ day, weatherCode, temperature, rainProbability }) => (
                  <ForecastItem key={day}>
                    <ForecastDay>{day}</ForecastDay>
                    {weatherIconByCode(weatherCode, 16)}
                    <ForecastTemp>{temperature}</ForecastTemp>
                    <ForecastRain>{rainProbability}</ForecastRain>
                  </ForecastItem>
                ),
              )}
            </ForecastStrip>

            <WeatherNote>
              <CircleAlert size={14} />
              Open-Meteo 예보 기준. 최대 7일 제공
            </WeatherNote>
          </WeatherCard>

          <PlacesGrid>
            {isFavoriteLoading ? (
              <PlacesMessage>관심 관광지를 불러오는 중이에요.</PlacesMessage>
            ) : places.length === 0 ? (
              <PlacesMessage>아직 즐겨찾기한 관광지가 없어요.</PlacesMessage>
            ) : (
              places.map((place) => (
                <SpotCard key={place.contentid}>
                  <SpotImage $image={place.firstimage || fallbackImage}>
                    <FavoriteButton
                      type="button"
                      disabled={isFavoritePending || !place.favoriteId}
                      aria-label={`${place.title} 즐겨찾기 해제`}
                      onClick={() => {
                        if (place.favoriteId) {
                          toggleFavorite(place, place.favoriteId);
                        }
                      }}
                    >
                      <Heart size={16} fill="currentColor" />
                    </FavoriteButton>
                  </SpotImage>

                  <SpotBody>
                    <SpotText>
                      <SpotArea>
                        {[place.addr1, place.addr2].filter(Boolean).join(" ") ||
                          "주소 정보 없음"}
                      </SpotArea>
                      <SpotName>{place.title}</SpotName>
                    </SpotText>
                    <SpotAction
                      type="button"
                      aria-label={`${place.title} 보기`}
                      onClick={() =>
                        handleMoveToSpot(place.title, place.contentid)
                      }
                    >
                      <ArrowUpRight size={16} />
                    </SpotAction>
                  </SpotBody>
                </SpotCard>
              ))
            )}
          </PlacesGrid>
        </ContentGrid>
      </Inner>
    </Section>
  );
};

export default WeatherSection;

const Section = styled.section`
  padding: 180px 24px;
  background: linear-gradient(180deg, #f3eee3 0%, #f6f2e9 100%);

  @media (max-width: 768px) {
    padding: 40px 16px 80px;
  }
`;

const Inner = styled.div`
  ${homeSectionInner};
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 30px;

  @media (max-width: 900px) {
    align-items: start;
  }
`;

const Eyebrow = styled.span`
  ${homeSectionEyebrow};
`;

const Title = styled.h2`
  ${homeSectionTitle};
`;

const HeaderDescription = styled.p`
  ${homeSectionDescription};
  max-width: 680px;
`;

const MoreLink = styled.button`
  display: inline-flex;
  align-items: center;
  align-self: flex-end;
  gap: 8px;
  padding: 0;
  border: 0;
  background: transparent;
  color: #2e2a24;
  font-size: 0.95rem;
  font-weight: 500;
  text-decoration: none;
  white-space: nowrap;
  cursor: pointer;

  @media (max-width: 900px) {
    align-self: flex-start;
  }
`;

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: minmax(360px, 450px) minmax(0, 1fr);
  gap: 18px;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

const WeatherCard = styled.article`
  padding: 32px 30px 30px;
  border-radius: 38px;
  color: #f6faf8;
  background:
    radial-gradient(
      circle at top right,
      rgba(88, 177, 176, 0.42),
      transparent 26%
    ),
    linear-gradient(160deg, ${colors.main} 0%, #136f72 100%);
  box-shadow: 0 24px 44px rgba(28, 104, 102, 0.18);

  @media (max-width: 768px) {
    padding: 22px;
    border-radius: 28px;
  }
`;

const WeatherTop = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
`;

const WeatherMeta = styled.span`
  display: block;
  margin-bottom: 10px;
  color: rgba(238, 248, 245, 0.72);
  font-size: 0.84rem;
  font-weight: 600;
`;

const WeatherSummary = styled.p`
  margin: 0;
  font-size: 1rem;
  font-weight: 700;
`;

const WeatherIconWrap = styled.div`
  display: grid;
  place-items: center;
  width: 92px;
  height: 92px;
  border-radius: 26px;
  background: rgba(255, 255, 255, 0.12);

  svg {
    width: 40px;
    height: 40px;
  }
`;

const CurrentTemp = styled.p`
  margin: 0;
  font-size: clamp(3.1rem, 8vw, 4.6rem);
  line-height: 0.88;
  letter-spacing: -0.05em;
  font-family: Gowun Batang;
`;

const WeatherInfoRow = styled.div`
  display: flex;
  align-items: center;
  gap: 26px;
  margin: 42px 0 28px;

  @media (max-width: 640px) {
    align-items: flex-start;
    flex-direction: column;
    gap: 10px;
    margin: 30px 0 22px;
  }
`;

const WeatherDetailGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding-top: 8px;

  @media (max-width: 640px) {
    padding-top: 0;
  }
`;

const WeatherDetails = styled.p`
  margin: 0;
  color: rgba(238, 248, 245, 0.8);
  font-size: 0.8rem;
  font-weight: 500;
  line-height: 1.35;
`;

const ForecastStrip = styled.div`
  display: grid;
  grid-template-columns: repeat(7, minmax(0, 1fr));
  gap: 8px;

  @media (max-width: 480px) {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
`;

const ForecastItem = styled.div`
  display: grid;
  justify-items: center;
  gap: 8px;
  padding: 12px 6px;
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.08);
  color: rgba(246, 250, 248, 0.92);
`;

const ForecastDay = styled.span`
  font-size: 0.72rem;
  font-weight: 700;
`;

const ForecastTemp = styled.span`
  font-size: 0.92rem;
  font-weight: 700;
`;

const ForecastRain = styled.span`
  color: rgba(238, 248, 245, 0.7);
  font-size: 0.72rem;
  font-weight: 600;
`;

const WeatherNote = styled.p`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  margin: 18px 0 0;
  color: rgba(238, 248, 245, 0.72);
  font-size: 0.78rem;
  font-weight: 600;
`;

const PlacesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 14px;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const PlacesMessage = styled.p`
  grid-column: 1 / -1;
  display: grid;
  place-items: center;
  min-height: 320px;
  margin: 0;
  padding: 24px;
  border-radius: 26px;
  background: rgba(255, 251, 245, 0.92);
  color: #7b746b;
  font-weight: 600;
  text-align: center;
`;

const SpotCard = styled.article`
  overflow: hidden;
  border-radius: 26px;
  background: rgba(255, 251, 245, 0.92);
  box-shadow: 0 18px 36px rgba(89, 71, 46, 0.08);
`;

const SpotImage = styled.div<{ $image: string }>`
  position: relative;
  min-height: 320px;
  background:
    linear-gradient(180deg, rgba(0, 0, 0, 0.06), rgba(0, 0, 0, 0.08)),
    url(${({ $image }) => $image}) center center / cover no-repeat;

  @media (max-width: 900px) {
    min-height: 280px;
  }
`;

const FavoriteButton = styled.button`
  position: absolute;
  right: 14px;
  top: 14px;
  display: grid;
  place-items: center;
  width: 38px;
  height: 38px;
  border: 0;
  border-radius: 50%;
  background: rgba(255, 251, 245, 0.96);
  color: #ff7b3d;
  box-shadow: 0 10px 24px rgba(50, 35, 18, 0.12);
  cursor: pointer;

  &:disabled {
    cursor: wait;
    opacity: 0.6;
  }
`;

const SpotBody = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 16px;
  padding: 16px 18px 20px;
`;

const SpotText = styled.div`
  min-width: 0;
`;

const SpotAction = styled.button`
  display: grid;
  flex-shrink: 0;
  place-items: center;
  width: 38px;
  height: 38px;
  border: 0;
  border-radius: 50%;
  background: #111111;
  color: white;
  cursor: pointer;
`;

const SpotArea = styled.p`
  display: -webkit-box;
  overflow: hidden;
  margin: 0 0 6px;
  color: #9f988d;
  font-size: 0.82rem;
  line-height: 1.4;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
`;

const SpotName = styled.h3`
  overflow: hidden;
  margin: 0;
  color: #171311;
  font-size: 1.5rem;
  font-family: Gowun Batang;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
