import styled from "styled-components";
import WeatherSection from "./components/WeatherSection";
import InsightSection from "./components/InsightSection";
import HeroSectionComp from "./components/HeroSection";
import HotPlaceSection from "./components/HotPlaceSection";

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
      <HeroSectionComp searchTags={searchTags} />
      <InsightSection />
      <WeatherSection />
      <HotPlaceSection />
    </PageShell>
  );
};

export default Home;

const PageShell = styled.div`
  background: #f6f2e9;
`;
