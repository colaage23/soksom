import styled from "styled-components";
import SectionHeader from "./SectionHeader";
import { steps } from "./GuideData";
import {
  IconBox,
  Inner,
  Section,
  CardTitle,
  CardDesc,
  Card,
  COLORS,
} from "./Guide.styles";

const GAP = 24;

const StepSection = () => (
  <Section $bg="alt">
    <Inner>
      <SectionHeader
        badge="사용 방법"
        title="3단계로 쉽게 시작하기"
        subtitle="복잡한 계획은 이제 그만. 3단계만으로 완벽한 제주 여행 일정을 완성하세요."
        tone="ocean"
      />
      <StepList>
        {steps.map(({ step, icon: Icon, title, description }) => (
          <StepCard key={step} $tone="ocean">
            <StepHead>
              <StepNumber aria-label={`${step}단계`}>{step}</StepNumber>
              <IconBox $tone="ocean">
                <Icon size={16} aria-hidden />
              </IconBox>
            </StepHead>
            <CardTitle>{title}</CardTitle>
            <CardDesc>{description}</CardDesc>
          </StepCard>
        ))}
      </StepList>
    </Inner>
  </Section>
);

export default StepSection;

const StepList = styled.ol`
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${GAP}px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 16px;
  }
`;

const StepCard = styled(Card)`
  padding: 28px 24px;

  &:not(:last-child)::after {
    content: "";
    position: absolute;
    top: 48px;
    left: 100%;
    width: 25px;
    height: 1.5px;
    background: rgba(99, 130, 153, 0.5);
  }

  @media (max-width: 768px) {
    &:not(:last-child)::after {
      display: none;
    }
  }
`;

const StepHead = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const StepNumber = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: ${COLORS.numberDeep};
  color: #fff;
  font-size: 14px;
  font-weight: 700;
`;
