import { MapPin, Search, Sparkles } from "lucide-react";
import styled from "styled-components";
import HomeMap from "./components/HomeMap";

const searchTags = [
  "성산일출봉",
  "협재해수욕장",
  "한라산",
  "우도",
  "비자림",
  "쇠소깍",
];

const Home = () => {
  return (
    <PageShell>
      <HeroSection>
        <BackgroundImage aria-hidden="true" />

        <Content>
          <BadgeRow>
            <InfoBadge>
              <MapPin size={14} />
              제주특별자치도
            </InfoBadge>
            <InfoBadge $accent>
              <Sparkles size={14} />
              AI 혼잡도 베타
            </InfoBadge>
          </BadgeRow>

          <Headline>
            붐비지 않는 제주,
            <br />
            속닥속닥 알려드릴게요.
          </Headline>

          <SubCopy>
            관광지 혼잡도를 미리 보고, 숨은 명소까지 이어주는 똑똑한 여행 루트.
          </SubCopy>

          <SearchPanel>
            <SearchField>
              <Search size={20} />
              <span>가고 싶은 제주 관광지를 검색해보세요</span>
            </SearchField>
            <SearchButton>탐색하기</SearchButton>
          </SearchPanel>

          <TagSection>
            <TagLabel>최근 검색</TagLabel>
            <TagList>
              {searchTags.map((tag) => (
                <SearchTag key={tag}>{tag}</SearchTag>
              ))}
            </TagList>
          </TagSection>

          <ScrollHint>SCROLL</ScrollHint>
        </Content>
      </HeroSection>
      <HomeMap />
    </PageShell>
  );
};

export default Home;

const PageShell = styled.div`
  background: #f6f2e9;
`;

const HeroSection = styled.section`
  position: relative;
  overflow: hidden;
  height: 85vh;
  background: #6f806f;

  @media (max-width: 768px) {
    min-height: 100svh;
    height: auto;
  }
`;

const BackgroundImage = styled.div`
  position: absolute;
  inset: 0;
  background:
    linear-gradient(rgba(10, 21, 18, 0.18), rgba(10, 21, 18, 0.34)),
    url("https://readdy.ai/api/search-image?query=Dreamy%20editorial%20Jeju%20Island%20coastline%20at%20golden%20hour%20with%20volcanic%20black%20rocks%2C%20soft%20turquoise%20ocean%20waves%2C%20Hallasan%20mountain%20silhouette%20in%20background%2C%20canola%20flower%20field%20foreground%2C%20warm%20cinematic%20tones%2C%20painterly%20stylized%20travel%20illustration%20feel%2C%20muted%20teal%20and%20cream%20palette%2C%20clean%20composition%20with%20room%20for%20text%20overlay&width=1800&height=1100&seq=hero-jeju-main-01&orientation=landscape")
      center center / cover no-repeat;

  @media (max-width: 768px) {
    background-position: 62% center;
  }
`;

const Content = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 100vh;
  max-width: 1180px;
  margin: 0 auto;
  color: #f7f2e8;

  @media (max-width: 1024px) {
    padding-top: 132px;
  }

  @media (max-width: 768px) {
    justify-content: flex-end;
    min-height: 100svh;
    padding: 110px 20px 48px;
  }

  @media (max-width: 480px) {
    padding: 96px 16px 24px;
  }
`;

const BadgeRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 24px;
`;

const InfoBadge = styled.div<{ $accent?: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: 7px;
  width: fit-content;
  padding: 6px 16px;
  border: 1px solid
    ${({ $accent }) =>
      $accent ? "rgba(101, 216, 206, 0.42)" : "rgba(255, 255, 255, 0.18)"};
  border-radius: 999px;
  background: ${({ $accent }) =>
    $accent ? "rgba(53, 149, 143, 0.9)" : "rgba(89, 99, 94, 0.28)"};
  color: #f5f0e5;
  font-size: 0.92rem;
  font-weight: 600;
  backdrop-filter: blur(12px);
`;

const Headline = styled.h1`
  margin: 0;
  font-size: 4.5rem;
  line-height: 1.1;
  font-family: Gowun Batang;
  @media (max-width: 768px) {
    font-size: clamp(2.6rem, 12vw, 4.1rem);
  }

  @media (max-width: 480px) {
    font-size: 2.35rem;
  }
`;

const SubCopy = styled.p`
  margin: 22px 0 34px;
  color: rgba(247, 242, 232, 0.9);
  font-size: 1.12rem;
  line-height: 1.6;

  @media (max-width: 768px) {
    margin: 18px 0 26px;
    font-size: 1rem;
  }

  @media (max-width: 480px) {
    margin: 16px 0 22px;
    font-size: 0.92rem;
    line-height: 1.5;
  }
`;

const SearchPanel = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  align-items: center;
  gap: 18px;
  width: min(100%, 800px);
  padding: 12px;
  border-radius: 22px;
  background: white;
  box-shadow: 0 12px 60px rgba(15, 29, 28, 0.18);

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 12px;
    padding: 14px;
    border-radius: 24px;
  }

  @media (max-width: 480px) {
    gap: 10px;
    padding: 10px;
    border-radius: 20px;
  }
`;

const SearchField = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
  min-width: 0;
  padding: 0 18px;
  color: #7a7e77;
  font-size: 1.02rem;

  span {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  @media (max-width: 768px) {
    padding: 4px 8px;
    font-size: 0.95rem;

    span {
      white-space: normal;
      line-height: 1.4;
    }
  }

  @media (max-width: 480px) {
    gap: 10px;
    padding: 2px 6px;
    font-size: 0.88rem;
  }
`;

const SearchButton = styled.button`
  min-width: 144px;
  height: 50px;
  padding: 0 28px;
  border: 0;
  border-radius: 16px;
  background: #2d9b99;
  color: white;
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;

  &:hover {
    background: #278788;
  }

  @media (max-width: 768px) {
    width: 100%;
    height: 48px;
    border-radius: 14px;
    font-size: 0.95rem;
  }
`;

const TagSection = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 12px;
  margin-top: 22px;

  @media (max-width: 480px) {
    gap: 10px;
    margin-top: 18px;
  }
`;

const TagLabel = styled.span`
  font-size: 0.8rem;
  font-weight: 600;
  color: rgba(247, 242, 232, 0.88);
`;

const TagList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;

  @media (max-width: 480px) {
    gap: 8px;
  }
`;

const SearchTag = styled.button`
  padding: 6px 15px;
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.18);
  background: rgba(175, 162, 126, 0.42);
  color: #f7f2e8;
  font-size: 0.9rem;
  cursor: pointer;
  backdrop-filter: blur(12px);

  @media (max-width: 480px) {
    padding: 6px 12px;
    font-size: 0.8rem;
  }
`;

const ScrollHint = styled.span`
  align-self: center;
  margin-top: 100px;
  width: fit-content;
  color: rgba(247, 242, 232, 0.82);
  font-size: 0.82rem;
  font-weight: 700;
  letter-spacing: 0.24em;

  @media (max-width: 768px) {
    margin-top: 48px;
  }

  @media (max-width: 480px) {
    margin-top: 28px;
    font-size: 0.74rem;
    letter-spacing: 0.18em;
  }
`;
