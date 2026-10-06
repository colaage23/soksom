import styled from "styled-components";
import WeatherSection from "./components/WeatherSection";
import InsightSection from "./components/InsightSection";
import HeroSectionComp from "./components/HeroSection";
import HotPlaceSection from "./components/HotPlaceSection";

const Home = () => {
  return (
    <PageShell>
      <HeroSectionComp />
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
