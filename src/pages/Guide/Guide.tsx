import CtaSection from "./components/CtaSection";
import FaqSection from "./components/FaqSection";
import FeatureSection from "./components/FeatureSection";
import GuideHero from "./components/GuideHero";
import StepSection from "./components/StepSection";
import TipSection from "./components/TipSection";

const Guide = () => {
  return (
    <>
      <GuideHero />
      <FeatureSection />
      <StepSection />
      <TipSection />
      <FaqSection />
      <CtaSection />
    </>
  );
};

export default Guide;
