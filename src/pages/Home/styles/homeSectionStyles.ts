import { css } from "styled-components";
import colors from "../../../constants/colors";

export const homeSectionInner = css`
  max-width: 1300px;
  margin: 0 auto;
`;

export const homeSectionEyebrow = css`
  display: inline-block;
  margin-bottom: 14px;
  color: ${colors.main};
  font-size: 0.78rem;
  font-weight: 800;
  letter-spacing: 0.18em;
`;

export const homeSectionTitle = css`
  margin: 0;
  color: #18130d;
  font-family: Gowun Batang;
  font-size: clamp(2rem, 5vw, 3.8rem);
  line-height: 1.02;
`;

export const homeSectionDescription = css`
  margin: 18px 0 0;
  color: #666055;
  font-size: 1rem;
  line-height: 1.7;

  @media (max-width: 768px) {
    margin-top: 16px;
    font-size: 0.94rem;
  }
`;
