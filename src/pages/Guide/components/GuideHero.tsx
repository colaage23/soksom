import styled from "styled-components";
import { Signpost } from "lucide-react";
import { TITLE_FONT, media } from "./Guide.styles";
import heroImage from "../../../assets/background/soksom_guide_background.png";

const GuideHero = () => (
  <Hero $image={heroImage}>
    <IconCircle>
      <Signpost size={20} aria-hidden />
    </IconCircle>
    <Title>이용 가이드</Title>
    <Desc>
      속솜으로 제주 여행을 더 스마트하게 계획하세요.
      <br />
      혼잡도 확인부터 AI 일정까지, 단계별로 안내해 드립니다.
    </Desc>
  </Hero>
);

export default GuideHero;

const Hero = styled.section<{ $image: string }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 540px;
  padding: 80px 24px;
  text-align: center;
  color: #fff;
  background:
    linear-gradient(rgba(30, 28, 22, 0.35), rgba(30, 28, 22, 0.45)),
    url(${({ $image }) => $image}) center / cover no-repeat;

  ${media.mobile} {
    min-height: 320px;
  }
`;

const IconCircle = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.5);
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(4px);
`;

const Title = styled.h1`
  margin: 20px 0 8px;
  font-family: ${TITLE_FONT};
  font-size: 48px;
  font-weight: 700;

  ${media.mobile} {
    font-size: 30px;
  }
`;

const Desc = styled.p`
  margin: 0;
  font-size: 18px;
  font-weight: 300;
  line-height: 1.5;
  opacity: 0.8;
  word-break: keep-all;
`;
