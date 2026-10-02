import { tips } from "./GuideData";
import { CardGrid, Inner, Section } from "./Guide.styles";
import InfoCard from "./InfoCard";
import SectionHeader from "./SectionHeader";

const TipSection = () => (
  <Section $bg="alt">
    <Inner>
      <SectionHeader
        badge="여행 팁"
        title="똑똑한 제주 여행 꿀팁"
        subtitle="현지인도 추천하는 제주 여행 노하우를 미리 확인하세요."
        tone="night"
      />
      <CardGrid>
        {tips.map((item) => (
          <InfoCard key={item.title} item={item} tone="night" />
        ))}
      </CardGrid>
    </Inner>
  </Section>
);

export default TipSection;
