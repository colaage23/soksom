import { useState } from "react";
import authBackground from "../../assets/background/soksom_auth_background.png";
import styled from "styled-components";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import SoksomLogo from "../../../public/logo.svg";

const Auth = () => {
  const [mode, setMode] = useState<"login" | "register">("login");

  return (
    <AuthContainer>
      <BackgroundBox>
        <BackgroundImage />
      </BackgroundBox>

      <AuthBox>
        <AuthTitle>
          <BrandImage src={SoksomLogo} alt="logo" />
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
const BrandImage = styled.img`
  display: block;
  width: 32px;
  height: auto;
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
