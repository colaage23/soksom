import styled from "styled-components";
import { COLORS, TITLE_FONT, TONES, media, type Tone } from "./Guide.styles";

interface SectionHeaderProps {
  badge: string;
  title: string;
  subtitle: string;
  tone?: Tone;
}

const SectionHeader = ({
  badge,
  title,
  subtitle,
  tone = "teal",
}: SectionHeaderProps) => (
  <Header>
    <Badge $tone={tone}>{badge}</Badge>
    <Title>{title}</Title>
    <Subtitle>{subtitle}</Subtitle>
  </Header>
);

export default SectionHeader;

const Header = styled.header`
  text-align: center;
  margin-bottom: 56px;

  ${media.mobile} {
    margin-bottom: 40px;
  }
`;

const Badge = styled.span<{ $tone: Tone }>`
  display: inline-block;
  padding: 4px 10px;
  border-radius: 9px;
  font-size: 11px;
  font-weight: 600;
  background: ${({ $tone }) => TONES[$tone].bg};
  color: ${({ $tone }) => TONES[$tone].color};
`;

const Title = styled.h2`
  margin: 16px 0 12px;
  font-family: ${TITLE_FONT};
  font-size: 36px;
  font-weight: 700;
  color: ${COLORS.text};

  ${media.mobile} {
    font-size: 26px;
  }
`;

const Subtitle = styled.p`
  margin: 0 0 48px 0;
  font-size: 16px;
  font-weight: 300;
  color: ${COLORS.textSub};
  word-break: keep-all;
`;
