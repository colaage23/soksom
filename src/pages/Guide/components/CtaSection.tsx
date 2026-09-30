import styled from "styled-components";
import { Link } from "react-router-dom";
import { Leaf, MapPin } from "lucide-react";
import { COLORS, Inner, media, Section, TITLE_FONT } from "./Guide.styles";

const CtaSection = () => (
  <Section>
    <Inner $narrow>
      <Box>
        <IconCircle>
          <Leaf size={20} aria-hidden />
        </IconCircle>
        <Title>지금 제주 여행을 시작하세요</Title>
        <Desc>
          혼잡도 확인부터 AI 일정까지, 속솜이 제주 여행의 모든 것을
          도와드립니다.
        </Desc>
        <CtaLink to={"/map"}>
          <MapPin size={14} aria-hidden />
          관광지 탐색하기
        </CtaLink>
      </Box>
    </Inner>
  </Section>
);

export default CtaSection;

const Box = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 56px 32px;
  border-radius: 0 128px 128px 128px;
  background: ${COLORS.primaryDeep};
  color: #fff;
  text-align: center;
  user-select: none;

  ${media.mobile} {
    padding: 44px 20px;
  }
`;

const IconCircle = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.15);
`;

const Title = styled.h2`
  margin: 20px 0 12px;
  font-family: ${TITLE_FONT};
  font-size: 28px;
  font-weight: 400;

  ${media.mobile} {
    font-size: 22px;
  }
`;

const Desc = styled.p`
  max-width: 440px;
  margin: 0 0 28px;
  font-size: 14px;
  font-weight: 300;
  line-height: 1.7;
  opacity: 0.85;
  word-break: keep-all;
`;

const CtaLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 12px 40px;
  border-radius: 17px;
  font-size: 13px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.25s ease;

  background: #ffffff1e;
  border: 1px solid rgba(255, 255, 255, 0.5);
  color: #fff;

  &:hover {
    background: #fff;
    color: #2c3e38;
  }

  &:focus-visible {
    outline: 2px solid #fff;
    outline-offset: 3px;
  }
`;
