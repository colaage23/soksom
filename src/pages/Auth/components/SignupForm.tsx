import {
  IdCard,
  Lock,
  Mail,
  ShieldCheck,
  User,
  Eye,
  EyeClosed,
} from "lucide-react";
import { useState, type FormEvent } from "react";
import styled from "styled-components";
import { useSignup } from "../../../hooks/auth/useAuth";
import { useAuthStore } from "../../../stores/auth/authStore";
import { useToast } from "../../../hooks/common/useToast";

const EMAIL_REGEX = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

const SignupForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [name, setName] = useState("");
  const [nickname, setNickname] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

  const showToast = useToast();

  const { setMode } = useAuthStore();

  const [errors, setErrors] = useState({
    email: "",
    password: "",
    passwordConfirm: "",
    name: "",
    nickname: "",
  });

  const { mutate: signupMutate, isPending } = useSignup();

  const validate = () => {
    const newErrors = {
      email: "",
      password: "",
      passwordConfirm: "",
      name: "",
      nickname: "",
    };

    if (!EMAIL_REGEX.test(email))
      newErrors.email = "유효하지 않는 이메일 형식입니다";

    if (password.length < 10) {
      newErrors.password = "10자 이상 입력해주세요";
    } else if (!/[A-Z]/.test(password)) {
      newErrors.password = "대문자를 1개 이상 포함해주세요";
    } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      newErrors.password = "특수문자를 1개 이상 포함해주세요";
    }
    if (!passwordConfirm) {
      newErrors.passwordConfirm = "비밀번호 확인을 진행해주세요.";
    } else if (password !== passwordConfirm) {
      newErrors.passwordConfirm = "비밀번호가 일치하지 않습니다";
    }

    if (!name) newErrors.name = "이름을 입력해주세요";
    if (!nickname) newErrors.nickname = "닉네임을 입력해주세요";

    return newErrors;
  };

  const handleSignup = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newErrors = validate();
    setErrors(newErrors);

    const hasError = Object.values(newErrors).some((error) => error !== "");

    if (hasError) return;

    signupMutate(
      {
        email,
        password,
        nickname,
      },
      {
        onSuccess: () => {
          showToast("회원가입이 완료되었습니다.", "success");
          setMode("login");
        },
        onError: () => {
          showToast("회원가입에 실패했습니다.", "error");
        },
      },
    );
  };

  return (
    <SignupFormContainer onSubmit={handleSignup}>
      <SubmitLabel>
        이메일<span>*</span>
        {errors.email && <ErrorText>{errors.email}</ErrorText>}
      </SubmitLabel>
      <SubmitBox>
        <MailIcon />
        <SubmitInput
          placeholder="example@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </SubmitBox>
      <SubmitLabel>
        비밀번호<span>*</span>
        {errors.password && <ErrorText>{errors.password}</ErrorText>}
      </SubmitLabel>
      <SubmitBox>
        <LockIcon />
        <SubmitInput
          type={showPassword ? "text" : "password"}
          placeholder="10자 이상, 대문자·특수문자 포함"
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
      <SubmitLabel>
        비밀번호 확인<span>*</span>
        {errors.passwordConfirm && (
          <ErrorText>{errors.passwordConfirm}</ErrorText>
        )}
      </SubmitLabel>
      <SubmitBox>
        <ShieldCheckIcon />
        <SubmitInput
          type={showPasswordConfirm ? "text" : "password"}
          placeholder="비밀번호를 다시 입력하세요"
          value={passwordConfirm}
          onChange={(e) => setPasswordConfirm(e.target.value)}
        />
        <EyeButton
          type="button"
          onClick={() => setShowPasswordConfirm((prev) => !prev)}
        >
          {showPasswordConfirm ? <EyeIcon /> : <EyeClosedIcon />}
        </EyeButton>
      </SubmitBox>
      <SubmitLabel>
        이름<span>*</span>
        {errors.name && <ErrorText>{errors.name}</ErrorText>}
      </SubmitLabel>
      <SubmitBox>
        <UserIcon />
        <SubmitInput
          placeholder="실명을 입력하세요"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </SubmitBox>
      <SubmitLabel>
        닉네임<span>*</span>
        {errors.nickname && <ErrorText>{errors.nickname}</ErrorText>}
      </SubmitLabel>
      <SubmitBox>
        <IdCardIcon />
        <SubmitInput
          placeholder="사용할 닉네임을 입력하세요"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
        />
      </SubmitBox>
      <AgreementBox>
        <Checkbox />
        <CheckboxLabel>
          <strong>[필수]</strong> 이용약관에 동의합니다
        </CheckboxLabel>
        <ViewLink type="button">보기</ViewLink>
      </AgreementBox>
      <AgreementBox>
        <Checkbox />
        <CheckboxLabel>
          <strong>[필수]</strong> 개인정보 수집 및 이용에 동의합니다
        </CheckboxLabel>
        <ViewLink type="button">보기</ViewLink>
      </AgreementBox>

      <SubmitButton type="submit" disabled={isPending}>
        {isPending ? "처리 중..." : "회원가입"}
      </SubmitButton>
    </SignupFormContainer>
  );
};

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

const SignupFormContainer = styled.form`
  max-width: 420px;
  width: 100%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
`;
const ShieldCheckIcon = styled(ShieldCheck)`
  width: 16px;
  height: 16px;
  stroke: #6c727a;
  stroke-width: 2;
`;
const UserIcon = styled(User)`
  width: 16px;
  height: 16px;
  stroke: #6c727a;
  stroke-width: 2;
`;
const IdCardIcon = styled(IdCard)`
  width: 16px;
  height: 16px;
  stroke: #6c727a;
  stroke-width: 2;
`;
const AgreementBox = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  margin: 0 0 16px;
`;
const ViewLink = styled.button`
  padding: 0;
  background-color: transparent;

  outline: none;
  border: none;

  color: #097575;
  font-size: 0.875rem;

  cursor: pointer;

  &:hover {
    text-decoration: underline;
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

export default SignupForm;
