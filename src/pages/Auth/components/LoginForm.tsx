import { Lock, Mail, Eye, EyeClosed } from "lucide-react";
import styled from "styled-components";
import KakaoSymbol from "../../../assets/symbol/kakao.png";
import GoogleSymbol from "../../../assets/symbol/google.png";
import NaverSymbol from "../../../assets/symbol/naver.png";
import { useState, type FormEvent } from "react";
import { useLogin } from "../../../hooks/auth/useAuth";
import { useNavigate } from "react-router-dom";
import FindPasswordModal from "../../../components/modal/FindPasswordModal";
import { getSocialAuthUrl } from "../../../utils/socialAuth";
import { useToast } from "../../../hooks/common/useToast";

const EMAIL_REGEX = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isFindPasswordModalOpen, setIsFindPasswordModalOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const showToast = useToast();

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const { mutateAsync: loginMutateAsync, isPending } = useLogin();

  const validate = () => {
    const newErrors = {
      email: "",
      password: "",
    };

    if (!EMAIL_REGEX.test(email))
      newErrors.email = "유효하지 않는 이메일 형식입니다";
    if (password.length < 10) newErrors.password = "10자 이상 입력해주세요";

    return newErrors;
  };

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newErrors = validate();
    setErrors(newErrors);

    const hasError = Object.values(newErrors).some((error) => error !== "");
    if (hasError) return;

    try {
      await loginMutateAsync({ email, password });
      showToast("로그인이 완료되었습니다.", "success");
      navigate("/");
    } catch (error) {
      showToast("로그인에 실패했습니다.", "error");
      console.error(error);
    }
  };

  return (
    <>
      <LoginFormContainer onSubmit={handleLogin}>
        <SubmitLabel>
          이메일 {errors.email && <ErrorText>{errors.email}</ErrorText>}
        </SubmitLabel>
        <SubmitBox>
          <MailIcon />
          <SubmitInput
            placeholder="이메일을 입력하세요"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </SubmitBox>
        <SubmitLabel>
          비밀번호 {errors.password && <ErrorText>{errors.password}</ErrorText>}
        </SubmitLabel>
        <SubmitBox>
          <LockIcon />
          <SubmitInput
            type={showPassword ? "text" : "password"}
            placeholder="비밀번호를 입력하세요"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <EyeButton
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
          >
            {showPassword ? <EyeIcon /> : <EyeClosedIcon />}
          </EyeButton>
        </SubmitBox>
        <SubmitButton type="submit" disabled={isPending}>
          {isPending ? "처리 중..." : "로그인"}
        </SubmitButton>
        <AuthOptions>
          <RememberMe>
            <Checkbox />
            <CheckboxLabel>로그인 상태 유지</CheckboxLabel>
          </RememberMe>
          <ForgotPassword
            type="button"
            onClick={() => setIsFindPasswordModalOpen(true)}
          >
            비밀번호 찾기
          </ForgotPassword>
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
              type="button"
              $bgColor={social.bgColor}
              $color={social.color}
              onClick={() => {
                window.location.href = getSocialAuthUrl(social.provider);
              }}
            >
              {social.icon} <span>{social.name}</span>로 로그인
            </SocialLoginButton>
          ))}
        </SocialButtonBox>
      </LoginFormContainer>

      <FindPasswordModal
        isOpen={isFindPasswordModalOpen}
        onClose={() => setIsFindPasswordModalOpen(false)}
      />
    </>
  );
};

type Provider = "kakao" | "google" | "naver";

const Socials = [
  {
    provider: "kakao" as Provider,
    name: "카카오톡",
    bgColor: "#FEE500",
    color: "#000000",
    icon: <img width={16} src={KakaoSymbol} alt="카카오 로그인 심볼" />,
  },
  {
    provider: "google" as Provider,
    name: "Google",
    bgColor: "#F2F2F2",
    color: "#181a1e",
    icon: <img width={16} src={GoogleSymbol} alt="구글 로그인 심볼" />,
  },
  {
    provider: "naver" as Provider,
    name: "네이버",
    bgColor: "#03A94D",
    color: "#fff",
    icon: <img width={16} src={NaverSymbol} alt="네이버 로그인 심볼" />,
  },
];

const ErrorText = styled.p`
  margin: 0 0 0 auto;

  color: #ef4444;
  font-size: 0.75rem;
  white-space: nowrap;
`;

const SubmitLabel = styled.label`
  width: 100%;
  display: flex;
  justify-content: start;
  align-items: center;

  margin: 0 0 6px;
  color: #2e3339;
  font-size: 0.878rem;
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
const ForgotPassword = styled.button`
  padding: 0;

  border: none;
  background: transparent;

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
const EyeButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  background: transparent;
  border: none;
  cursor: pointer;
`;
const EyeIcon = styled(Eye)`
  width: 16px;
  height: 16px;
  stroke: #6c727a;
  stroke-width: 2;
`;
const EyeClosedIcon = styled(EyeClosed)`
  width: 16px;
  height: 16px;
  stroke: #6c727a;
  stroke-width: 2;
`;

export default LoginForm;
