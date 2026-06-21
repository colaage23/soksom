import { Lock, Mail } from "lucide-react";
import styled from "styled-components";
import KakaoSymbol from "../../../assets/symbol/kakao.png";
import GoogleSymbol from "../../../assets/symbol/google.png";
import NaverSymbol from "../../../assets/symbol/naver.png";

const Socials = [
  {
    name: "카카오톡",
    bgColor: "#FEE500",
    color: "#000000",
    icon: <img width={16} src={KakaoSymbol} alt="카카오 로그인 심볼" />,
  },
  {
    name: "Google",
    bgColor: "#F2F2F2",
    color: "#181a1e",
    icon: <img width={16} src={GoogleSymbol} alt="구글 로그인 심볼" />,
  },
  {
    name: "네이버",
    bgColor: "#03A94D",
    color: "#fff",
    icon: <img width={16} src={NaverSymbol} alt="네이버 로그인 심볼" />,
  },
];

const LoginForm = () => {
  return (
    <LoginFormContainer>
      <SubmitLabel>이메일</SubmitLabel>
      <SubmitBox>
        <MailIcon />
        <SubmitInput placeholder="이메일을 입력하세요" />
      </SubmitBox>
      <SubmitLabel>비밀번호</SubmitLabel>
      <SubmitBox>
        <LockIcon />
        <SubmitInput placeholder="비밀번호를 입력하세요" />
      </SubmitBox>
      <SubmitButton>로그인</SubmitButton>
      <AuthOptions>
        <RememberMe>
          <Checkbox />
          <CheckboxLabel>로그인 상태 유지</CheckboxLabel>
        </RememberMe>
        <ForgotPassword>비밀번호 찾기</ForgotPassword>
      </AuthOptions>
      <DividerBox>
        <Divider />
        <span>또는</span>
        <Divider />
      </DividerBox>
      <SocialButtonBox>
        {Socials.map((social, index) => (
          <SocialLoginButton
            key={index}
            $bgColor={social.bgColor}
            $color={social.color}
          >
            {social.icon} <span>{social.name}</span>로 로그인
          </SocialLoginButton>
        ))}
      </SocialButtonBox>
    </LoginFormContainer>
  );
};

const SubmitLabel = styled.label`
  margin: 0 0 6px;
  color: #2e3339;
  font-size: 0.878rem;

  span {
    color: #f77036;
  }
`;
const SubmitButton = styled.button`
  width: 100%;
  height: 48px;

  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;

  margin: 0 0 24px;
  padding: 0 16px;

  background-color: #0c9799;

  outline: none;
  border: none;
  border-radius: 12px;

  color: #fffafc;
  font-size: 0.875rem;
  font-weight: 500;

  cursor: pointer;

  transition: 0.2s all ease;

  &:hover {
    background-color: #0a8082;
  }
`;

const LoginFormContainer = styled.form`
  max-width: 420px;
  width: 100%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
`;
const SubmitBox = styled.div`
  width: 100%;
  height: 48px;

  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;

  margin: 0 0 18px;
  padding: 0 16px;

  background-color: #fdfcf8;
  border: 1px solid #f2eee6b3;
  border-radius: 14px;
`;
const SubmitInput = styled.input`
  width: 100%;
  height: 100%;

  border: none;
  outline: none;

  background-color: transparent;
`;
const MailIcon = styled(Mail)`
  width: 16px;
  height: 16px;
  stroke: #6c727a;
  stroke-width: 2;
`;
const LockIcon = styled(Lock)`
  width: 16px;
  height: 16px;
  stroke: #6c727a;
  stroke-width: 2;
`;
const AuthOptions = styled.div`
  width: 100%;

  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const RememberMe = styled.label`
  display: flex;
  align-items: center;
  gap: 6px;
`;
const Checkbox = styled.input.attrs({ type: "checkbox" })`
  width: 16px;
  height: 16px;

  margin: 0;

  cursor: pointer;
`;
const CheckboxLabel = styled.span`
  color: #474e55;
  font-size: 0.875rem;
  font-weight: 300;
`;
const ForgotPassword = styled.a`
  color: #474e55;
  font-size: 0.875rem;
  font-weight: 300;

  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;
const DividerBox = styled.div`
  width: 100%;

  display: flex;
  justify-content: center;
  align-items: center;

  margin: 32px 0 16px 0;
  span {
    color: #6c727a;
    font-size: 0.75rem;
    padding: 0 12px;
  }
`;
const Divider = styled.div`
  flex: 1;

  height: 1px;
  background-color: #f2eee6;
`;
const SocialButtonBox = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  gap: 8px;
`;
const SocialLoginButton = styled.button<{ $bgColor: string; $color: string }>`
  width: 100%;
  height: 48px;

  display: flex;
  justify-content: center;
  align-items: center;

  padding: 0 16px;

  background-color: ${({ $bgColor }) => `${$bgColor}`};

  outline: none;
  border: none;
  border-radius: 12px;

  color: ${({ $color }) => `${$color}`};
  font-size: 0.875rem;
  font-weight: 400;

  cursor: pointer;

  transition: 0.2s all ease;

  span {
    font-weight: 500;
  }

  img {
    margin: 0 8px 0;
  }

  &:hover {
    filter: brightness(0.95);
  }
`;

export default LoginForm;
