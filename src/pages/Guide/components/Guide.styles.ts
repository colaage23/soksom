import styled from "styled-components";

export const COLORS = {
  primary: "#0c9799",
  primaryDeep: "#28746f",
  numberDeep: "#203b5c",
  bg: "#fdfcf8",
  bgAlt: "#f7f5ef",
  border: "#edebe5",
  surface: "#ffffff",
  text: "#1f2321",
  textSub: "#6b6f6c",
} as const;

export const TITLE_FONT = `"Gowun Batang", "Noto Serif KR", serif`;

export const media = {
  tablet: "@media (max-width: 1024px)",
  mobile: "@media (max-width: 640px)",
};

export type Tone = "teal" | "ocean" | "peach" | "night";

export const TONES: Record<Tone, { bg: string; color: string }> = {
  teal: { bg: "#e3f1ec", color: "#63997e" },
  ocean: { bg: "#e3edf1", color: "#638299" },
  peach: { bg: "#f1e4e3", color: "#98554d" },
  night: { bg: "#e8e4ee", color: "#786399" },
};

export const Section = styled.section<{ $bg?: "base" | "alt" }>`
  background: ${({ $bg }) => ($bg === "alt" ? COLORS.bgAlt : COLORS.bg)};
  padding: 96px 24px;

  ${media.mobile} {
    padding: 64px 20px;
  }
`;

export const Inner = styled.div<{ $narrow?: boolean }>`
  max-width: ${({ $narrow }) => ($narrow ? "760px" : "1040px")};
  margin: 0 auto;
`;

export const CardGrid = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;

  ${media.tablet} {
    grid-template-columns: repeat(2, 1fr);
  }
  ${media.mobile} {
    grid-template-columns: 1fr;
  }
`;

export const IconBox = styled.span<{ $tone: Tone }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 14px;
  background: ${({ $tone }) => TONES[$tone].bg};
  color: ${({ $tone }) => TONES[$tone].color};
  transition:
    background 0.25s ease,
    color 0.25s ease;

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`;

export const Card = styled.li<{ $tone: Tone }>`
  position: relative;
  background: ${COLORS.surface};
  border: 1px solid ${COLORS.border};
  border-radius: 10px;
  padding: 24px;
  user-select: none;
  transition: border-color 0.4s ease;

  &:hover {
    background: ${({ $tone }) => TONES[$tone].bg};
    border-color: ${({ $tone }) => TONES[$tone].color};
  }

  &:hover ${IconBox} {
    background: ${({ $tone }) => TONES[$tone].color};
    color: ${({ $tone }) => TONES[$tone].bg};
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`;

export const CardTitle = styled.h3`
  margin: 20px 0 10px;
  font-size: 15px;
  font-weight: 700;
  color: ${COLORS.text};
`;

export const CardDesc = styled.p`
  margin: 0;
  font-size: 13px;
  line-height: 1.7;
  color: ${COLORS.textSub};
  word-break: keep-all;
`;
