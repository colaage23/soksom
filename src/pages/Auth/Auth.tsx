import { useState } from "react";
import authBackground from "../../assets/background/soksom_auth_background.png";
import styled from "styled-components";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";

const Auth = () => {
  const [mode, setMode] = useState<"login" | "register">("login");

  return (
    <AuthContainer>
      <BackgroundBox>
        <BackgroundImage />
      </BackgroundBox>

      <AuthBox>
        <AuthTitle>
          <svg
            width="37"
            height="32"
            viewBox="0 0 37 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <ellipse
              cx="18.353"
              cy="10.3529"
              rx="12.7059"
              ry="10.3529"
              fill="url(#paint0_linear_368_63)"
            />
            <ellipse
              cx="9.41177"
              cy="16.4706"
              rx="9.41177"
              ry="10.8235"
              fill="url(#paint1_linear_368_63)"
            />
            <ellipse
              cx="28"
              cy="16.5"
              rx="9"
              ry="10.5"
              fill="url(#paint2_linear_368_63)"
            />
            <circle
              cx="18.353"
              cy="15.5294"
              r="5.17647"
              fill="url(#paint3_radial_368_63)"
            />
            <ellipse
              cx="18.353"
              cy="25.8824"
              rx="11.7647"
              ry="6.11765"
              fill="url(#paint4_linear_368_63)"
            />
            <defs>
              <linearGradient
                id="paint0_linear_368_63"
                x1="18.353"
                y1="0"
                x2="18.353"
                y2="20.7059"
                gradientUnits="userSpaceOnUse"
              >
                <stop stop-color="#CA3A23" />
                <stop offset="0.51" stop-color="#992311" />
              </linearGradient>
              <linearGradient
                id="paint1_linear_368_63"
                x1="7.29068e-08"
                y1="16.9412"
                x2="18.8235"
                y2="16.9412"
                gradientUnits="userSpaceOnUse"
              >
                <stop stop-color="#AB1E0D" />
                <stop offset="1" stop-color="#85170A" />
              </linearGradient>
              <linearGradient
                id="paint2_linear_368_63"
                x1="37"
                y1="17"
                x2="19"
                y2="17"
                gradientUnits="userSpaceOnUse"
              >
                <stop stop-color="#A62312" />
                <stop offset="1" stop-color="#7F1305" />
              </linearGradient>
              <radialGradient
                id="paint3_radial_368_63"
                cx="0"
                cy="0"
                r="1"
                gradientUnits="userSpaceOnUse"
                gradientTransform="translate(18.353 15.5294) rotate(90) scale(5.17647)"
              >
                <stop stop-color="#CF9235" />
                <stop offset="1" stop-color="#EBB25B" />
              </radialGradient>
              <linearGradient
                id="paint4_linear_368_63"
                x1="18.353"
                y1="19.7647"
                x2="18.353"
                y2="32"
                gradientUnits="userSpaceOnUse"
              >
                <stop stop-color="#E45540" />
                <stop offset="1" stop-color="#9D2A19" />
              </linearGradient>
            </defs>
          </svg>
          속솜
        </AuthTitle>
        <ModeTabs>
          <TabIndicator $mode={mode} />

          <ModeTabButton
            $isActive={mode === "login"}
            onClick={() => {
              setMode("login");
            }}
          >
            로그인
          </ModeTabButton>
          <ModeTabButton
            $isActive={mode === "register"}
            onClick={() => {
              setMode("register");
            }}
          >
            회원가입
          </ModeTabButton>
        </ModeTabs>
        {mode === "login" ? <LoginForm /> : <RegisterForm />}
      </AuthBox>
    </AuthContainer>
  );
};

const AuthContainer = styled.div`
  display: flex;
  height: calc(100vh - 72px);
`;

const BackgroundBox = styled.div`
  position: relative;
  flex: 1;
  overflow: hidden;
  @media (max-width: 1024px) {
    display: none;
  }
`;
const BackgroundImage = styled.div`
  position: absolute;
  inset: 0;
  background:
    linear-gradient(
      to left,
      rgba(255, 255, 255, 1) 0%,
      rgba(255, 255, 255, 0.2) 30%,
      rgba(255, 255, 255, 0) 100%
    ),
    url(${authBackground}) left center / auto 100% no-repeat;
`;

const AuthBox = styled.div`
  flex: 1;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 64px 16px;
`;

const AuthTitle = styled.h2`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;

  font-family: Gowun Batang;
`;

const ModeTabs = styled.nav`
  position: relative;

  width: 100%;
  max-width: 420px;

  display: flex;

  margin: 0 0 32px;
  padding: 4px;

  border-radius: 14px;
  background: #f5f2eb;
`;
const TabIndicator = styled.div<{ $mode: "login" | "register" }>`
  position: absolute;

  top: 4px;
  left: 4px;

  width: calc(50% - 4px);
  height: calc(100% - 8px);

  border-radius: 10px;
  background: white;

  transform: ${({ $mode }) =>
    $mode === "register" ? "translateX(100%)" : "translateX(0)"};

  transition: transform 0.25s cubic-bezier(0.4, 0, 0.2, 1);

  z-index: 0;
`;
const ModeTabButton = styled.button<{ $isActive: boolean }>`
  position: relative;
  z-index: 1;

  flex: 1;

  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;

  padding: 12px 16px;

  border: none;
  border-radius: 10px;
  background: transparent;

  color: ${({ $isActive }) => ($isActive ? "#101714" : "#7b827d")};

  font-size: 0.875rem;
  font-weight: ${({ $isActive }) => ($isActive ? 600 : 500)};

  cursor: pointer;

  transition: color 0.2s ease;
`;

export default Auth;
