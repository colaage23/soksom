import { useState } from "react";
import styled from "styled-components";
import { ChevronDown } from "lucide-react";
import { faqs } from "./GuideData";
import { COLORS, Inner, Section, TONES } from "./Guide.styles";
import SectionHeader from "./SectionHeader";

const FaqSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <Section>
      <Inner $narrow>
        <SectionHeader
          badge="자주 묻는 질문"
          title="FAQ"
          subtitle="속솜 이용에 대해 궁금하신 점을 확인해 보세요."
          tone="peach"
        />
        <FaqList>
          {faqs.map(({ question, answer }, index) => {
            const isOpen = openIndex === index;
            const buttonId = `faq-button-${index}`;
            const panelId = `faq-panel-${index}`;

            return (
              <FaqItem key={question} $open={isOpen}>
                <QuestionHeading>
                  <QuestionButton
                    id={buttonId}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => toggle(index)}
                  >
                    <span>{question}</span>
                    <Chevron $open={isOpen} aria-hidden>
                      <ChevronDown size={16} />
                    </Chevron>
                  </QuestionButton>
                </QuestionHeading>
                <Panel
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  aria-hidden={!isOpen}
                  $open={isOpen}
                >
                  <PanelInner>
                    <Answer>{answer}</Answer>
                  </PanelInner>
                </Panel>
              </FaqItem>
            );
          })}
        </FaqList>
      </Inner>
    </Section>
  );
};

export default FaqSection;

const FaqList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const FaqItem = styled.li<{ $open: boolean }>`
  background: ${({ $open }) => ($open ? `${TONES.peach.bg}80` : COLORS.bgAlt)};
  border: 1px solid
    ${({ $open }) => ($open ? `${TONES.peach.color}40` : COLORS.border)};
  border-radius: 8px;
  overflow: hidden;
  transition:
    background 0.25s ease,
    border-color 0.25s ease;

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`;

const QuestionHeading = styled.h3`
  margin: 0;
`;

const QuestionButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  width: 100%;
  padding: 20px 24px;
  border: none;
  background: none;
  font: inherit;
  font-size: 14px;
  font-weight: 600;
  color: ${COLORS.text};
  text-align: left;
  cursor: pointer;

  &:focus-visible {
    outline: 2px solid ${COLORS.primary};
    outline-offset: -2px;
    border-radius: 12px;
  }
`;

const Chevron = styled.span<{ $open: boolean }>`
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: ${({ $open }) => ($open ? TONES.peach.bg : COLORS.border)};
  color: ${({ $open }) => ($open ? TONES.peach.color : COLORS.textSub)};
  transform: rotate(${({ $open }) => ($open ? "180deg" : "0deg")});
  transition:
    transform 0.25s ease,
    background 0.25s ease;

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`;

const Panel = styled.div<{ $open: boolean }>`
  display: grid;
  grid-template-rows: ${({ $open }) => ($open ? "1fr" : "0fr")};
  transition: grid-template-rows 0.25s ease;

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`;

const PanelInner = styled.div`
  overflow: hidden;
`;

const Answer = styled.p`
  margin: 0;
  padding: 24px 24px 24px;
  border-top: 1px solid ${TONES.peach.color}20;
  font-size: 13px;
  line-height: 1.7;
  color: ${COLORS.textSub};
  word-break: keep-all;
`;
