import {
  ArrowUpRight,
  CircleAlert,
  Cloud,
  CloudRain,
  Heart,
  Sun,
  SunMedium,
} from "lucide-react";
import styled from "styled-components";
import colors from "../../../constants/colors";

const forecastItems = [
  { day: "오늘", icon: SunMedium, temp: "24°", rain: "10%" },
  { day: "내일", icon: Cloud, temp: "23°", rain: "20%" },
  { day: "수", icon: CloudRain, temp: "21°", rain: "80%" },
  { day: "목", icon: Cloud, temp: "22°", rain: "40%" },
  { day: "금", icon: Sun, temp: "25°", rain: "5%" },
  { day: "토", icon: Sun, temp: "26°", rain: "0%" },
  { day: "일", icon: Cloud, temp: "24°", rain: "15%" },
] as const;

const places = [
  {
    area: "서귀포시",
    name: "쇠소깍",
    status: "여유",
    tone: "calm",
    image:
      "https://readdy.ai/api/search-image?query=Soft%20natural%20editorial%20photo%20of%20Jeju%20Soeseokkak%20emerald%20green%20river%20valley%20with%20black%20volcanic%20rocks%2C%20tall%20pine%20trees%20and%20wooden%20rowboats%2C%20calm%20water%20reflecting%20sky%2C%20gentle%20morning%20mist%2C%20warm%20travel%20brochure%20tones%2C%20clean%20uncluttered%20background%2C%20peaceful%20composition&width=600&height=720&seq=fav-soeseokkak-01&orientation=portrait",
  },
  {
    area: "제주시 구좌읍",
    name: "비자림",
    status: "여유",
    tone: "calm",
    image:
      "https://readdy.ai/api/search-image?query=Soft%20natural%20editorial%20photo%20of%20Jeju%20Soeseokkak%20emerald%20green%20river%20valley%20with%20black%20volcanic%20rocks%2C%20tall%20pine%20trees%20and%20wooden%20rowboats%2C%20calm%20water%20reflecting%20sky%2C%20gentle%20morning%20mist%2C%20warm%20travel%20brochure%20tones%2C%20clean%20uncluttered%20background%2C%20peaceful%20composition&width=600&height=720&seq=fav-soeseokkak-01&orientation=portrait",
  },
  {
    area: "제주시 조천읍",
    name: "사려니숲길",
    status: "보통",
    tone: "normal",
    image:
      "https://readdy.ai/api/search-image?query=Soft%20natural%20editorial%20photo%20of%20Jeju%20Soeseokkak%20emerald%20green%20river%20valley%20with%20black%20volcanic%20rocks%2C%20tall%20pine%20trees%20and%20wooden%20rowboats%2C%20calm%20water%20reflecting%20sky%2C%20gentle%20morning%20mist%2C%20warm%20travel%20brochure%20tones%2C%20clean%20uncluttered%20background%2C%20peaceful%20composition&width=600&height=720&seq=fav-soeseokkak-01&orientation=portrait",
  },
] as const;

const toneLabelColor = {
  calm: {
    bg: "#e8f3e7",
    fg: "#4d7f58",
  },
  normal: {
    bg: "#ffe7d8",
    fg: "#b9642b",
  },
} as const;

const WeatherSection = () => {
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
          <MoreLink>
            관심 관광지 전체 보기
            <ArrowUpRight size={16} />
          </MoreLink>
        </Header>

        <ContentGrid>
          <WeatherCard>
            {/* 수정 필요 */}
            <WeatherTop>
              <div>
                <WeatherMeta>제주시 · 지금</WeatherMeta>
                <WeatherSummary>맑고 산뜻한 초여름</WeatherSummary>
              </div>
              <WeatherIconWrap>
                <SunMedium size={20} />
              </WeatherIconWrap>
            </WeatherTop>

            <WeatherInfoRow>
              <CurrentTemp>24°</CurrentTemp>
              <WeatherDetailGroup>
                <WeatherDetails>체감 25° · 습도 62%</WeatherDetails>
                <WeatherDetails>북서풍 3m/s · 자외선 보통</WeatherDetails>
              </WeatherDetailGroup>
            </WeatherInfoRow>

            <ForecastStrip>
              {forecastItems.map(({ day, icon: Icon, temp, rain }) => (
                <ForecastItem key={day}>
                  <ForecastDay>{day}</ForecastDay>
                  <Icon size={16} />
                  <ForecastTemp>{temp}</ForecastTemp>
                  <ForecastRain>{rain}</ForecastRain>
                </ForecastItem>
              ))}
            </ForecastStrip>

            <WeatherNote>
              <CircleAlert size={14} />
              기상청 중기예보 기반. 최대 11일 제공
            </WeatherNote>
          </WeatherCard>

          <PlacesGrid>
            {places.map((place) => (
              <SpotCard key={place.name}>
                <SpotImage $image={place.image}>
                  <SpotBadge
                    style={{
                      backgroundColor: toneLabelColor[place.tone].bg,
                      color: toneLabelColor[place.tone].fg,
                    }}
                  >
                    {place.status}
                  </SpotBadge>
                  <FavoriteButton
                    type="button"
                    aria-label={`${place.name} 즐겨찾기`}
                  >
                    <Heart size={16} fill="currentColor" />
                  </FavoriteButton>
                </SpotImage>

                <SpotBody>
                  <SpotText>
                    <SpotArea>{place.area}</SpotArea>
                    <SpotName>{place.name}</SpotName>
                  </SpotText>
                  <SpotAction type="button" aria-label={`${place.name} 보기`}>
                    <ArrowUpRight size={16} />
                  </SpotAction>
                </SpotBody>
              </SpotCard>
            ))}
          </PlacesGrid>
        </ContentGrid>
      </Inner>
    </Section>
  );
};

export default WeatherSection;

const Section = styled.section`
  padding: 70px 24px 110px;
  background: linear-gradient(180deg, #f3eee3 0%, #f6f2e9 100%);

  @media (max-width: 768px) {
    padding: 40px 16px 80px;
  }
`;

const Inner = styled.div`
  max-width: 1300px;
  margin: 0 auto;
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
  display: block;
  margin-bottom: 14px;
  color: ${colors.main};
  font-size: 0.78rem;
  font-weight: 800;
  letter-spacing: 0.18em;
`;

const Title = styled.h2`
  margin: 0;
  color: #15120f;
  font-family: Gowun Batang;
  font-size: clamp(2.2rem, 5vw, 3.5rem);
  line-height: 1.06;
`;

const MoreLink = styled.a`
  display: inline-flex;
  align-items: center;
  align-self: flex-end;
  gap: 8px;
  color: #2e2a24;
  font-size: 0.95rem;
  font-weight: 500;
  text-decoration: none;
  white-space: nowrap;

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
  padding: 12px 8px;
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

const SpotBadge = styled.span`
  position: absolute;
  top: 14px;
  left: 14px;
  padding: 6px 10px;
  border-radius: 999px;
  font-size: 0.75rem;
  font-weight: 700;
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
  margin: 0 0 6px;
  color: #9f988d;
  font-size: 0.82rem;
`;

const SpotName = styled.h3`
  margin: 0;
  color: #171311;
  font-size: 1.5rem;
  font-family: Gowun Batang;
`;
