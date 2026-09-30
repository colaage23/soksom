import SectionHeader from "./SectionHeader";
import InfoCard from "./InfoCard";
import { features } from "./GuideData";
import { CardGrid, Inner, Section } from "./Guide.styles";

const FeatureSection = () => (
  <Section>
    <Inner>
      <SectionHeader
        badge="주요 기능"
        title="속솜의 핵심 기능"
        subtitle="제주 여행을 더 편리하고 알차게 만들어주는 4가지 핵심 기능을 소개합니다."
      />
      <CardGrid>
        {features.map((item) => (
          <InfoCard key={item.title} item={item} tone="teal" />
        ))}
      </CardGrid>
    </Inner>
  </Section>
);

export default FeatureSection;
