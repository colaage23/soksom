import { Lock, Mail } from "lucide-react";
import styled from "styled-components";

const Socials = [
  {
    name: "카카오톡",
    bgColor: "#fcd100",
    color: "#391d1d",
    icon: (
      <svg
        width="20"
        height="18"
        viewBox="0 0 20 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <mask
          id="mask0_367_41"
          maskUnits="userSpaceOnUse"
          x="0"
          y="0"
          width="20"
          height="18"
        >
          <path
            d="M9.75288 0C4.36648 0 0 3.44286 0 7.68977C0 10.4355 1.82548 12.8447 4.57148 14.2052C4.42209 14.7204 3.61147 17.5196 3.57921 17.7396C3.57921 17.7396 3.5598 17.9048 3.6668 17.9678C3.7738 18.0308 3.89965 17.9819 3.89965 17.9819C4.20649 17.939 7.45786 15.6552 8.02062 15.2586C8.58282 15.3382 9.16171 15.3795 9.75288 15.3795C15.1393 15.3795 19.5058 11.9368 19.5058 7.68977C19.5058 3.44286 15.1393 0 9.75288 0Z"
            fill="white"
          />
          <path
            d="M4.3607 10.3742C4.05039 10.3742 3.79803 10.1332 3.79803 9.83682V6.49411H2.92008C2.61559 6.49411 2.36792 6.24691 2.36792 5.94316C2.36792 5.63942 2.61568 5.39222 2.92008 5.39222H5.80131C6.10581 5.39222 6.35347 5.63942 6.35347 5.94316C6.35347 6.24691 6.10571 6.49411 5.80131 6.49411H4.92336V9.83682C4.92336 10.1332 4.67101 10.3742 4.3607 10.3742ZM9.29453 10.3668C9.0599 10.3668 8.88041 10.2716 8.8263 10.1183L8.54769 9.38893L6.83193 9.38884L6.55313 10.1187C6.4992 10.2717 6.31981 10.3668 6.08518 10.3668C5.96176 10.367 5.83976 10.3405 5.72751 10.2892C5.5724 10.2176 5.42329 10.0209 5.59416 9.49021L6.94005 5.94766C7.03486 5.67824 7.32285 5.40066 7.68934 5.39231C8.05685 5.40057 8.34484 5.67824 8.43984 5.94823L9.78518 9.48918C9.95641 10.0211 9.80731 10.2179 9.6522 10.2893C9.53992 10.3405 9.41794 10.3669 9.29453 10.3668ZM8.25182 8.39226L7.68981 6.7957L7.1278 8.39226H8.25182Z"
            fill="black"
          />
          <path
            d="M10.6907 10.2921C10.3933 10.2921 10.1515 10.0607 10.1515 9.77633V5.95489C10.1515 5.64458 10.4092 5.39222 10.7259 5.39222C11.0426 5.39222 11.3003 5.64458 11.3003 5.95489V9.26055H12.4959C12.7933 9.26055 13.0352 9.49199 13.0352 9.77633C13.0352 10.0607 12.7933 10.2921 12.4959 10.2921H10.6907ZM13.8167 10.3668C13.5064 10.3668 13.254 10.1145 13.254 9.80418V5.95489C13.254 5.64458 13.5064 5.39222 13.8167 5.39222C14.127 5.39222 14.3794 5.64458 14.3794 5.95489V7.16424L15.9492 5.5944C16.0299 5.51366 16.1409 5.46921 16.2613 5.46921C16.4018 5.46921 16.5428 5.52979 16.6485 5.63539C16.7471 5.73385 16.8059 5.86055 16.8139 5.99212C16.8221 6.12481 16.7779 6.24644 16.6898 6.33469L15.4075 7.61672L16.7925 9.45158C16.8373 9.51044 16.8698 9.5776 16.8884 9.64916C16.9069 9.72072 16.9111 9.79524 16.9006 9.86842C16.8905 9.94164 16.8661 10.0121 16.8286 10.0758C16.7911 10.1395 16.7414 10.1952 16.6823 10.2395C16.585 10.3135 16.466 10.3534 16.3438 10.3531C16.2566 10.3535 16.1706 10.3334 16.0925 10.2946C16.0145 10.2558 15.9466 10.1992 15.8943 10.1294L14.5748 8.38101L14.3796 8.57626V9.8039C14.3794 9.95313 14.32 10.0962 14.2145 10.2017C14.109 10.3073 13.9659 10.3666 13.8167 10.3668Z"
            fill="black"
          />
        </mask>
        <g mask="url(#mask0_367_41)">
          <path
            d="M21.7565 -3.376H-2.25061V20.6311H21.7565V-3.376Z"
            fill="#391D1D"
          />
        </g>
      </svg>
    ),
  },
  {
    name: "Google",
    bgColor: "#f0f0f0",
    color: "#181a1e",
    icon: (
      <svg
        width="18"
        height="18"
        viewBox="0 0 18 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clipPath="url(#clip0_367_44)">
          <path
            d="M9.00002 3.5625C10.3275 3.5625 11.5163 4.02 12.4538 4.9125L15.0225 2.34375C13.4625 0.8925 11.4263 0 9.00002 0C5.48252 0 2.44127 2.0175 0.960022 4.9575L3.95252 7.27875C4.66127 5.145 6.65252 3.5625 9.00002 3.5625Z"
            fill="#EA4335"
          />
          <path
            d="M17.6175 9.20625C17.6175 8.6175 17.5613 8.0475 17.475 7.5H9V10.8825H13.8525C13.635 11.9925 13.005 12.9375 12.06 13.575L14.9588 15.825C16.65 14.2575 17.6175 11.94 17.6175 9.20625Z"
            fill="#4285F4"
          />
          <path
            d="M3.94875 10.7212C3.76875 10.1775 3.66375 9.6 3.66375 9C3.66375 8.4 3.765 7.8225 3.94875 7.27875L0.95625 4.9575C0.345 6.1725 0 7.545 0 9C0 10.455 0.345 11.8275 0.96 13.0425L3.94875 10.7212Z"
            fill="#FBBC05"
          />
          <path
            d="M8.99999 18C11.43 18 13.4737 17.2012 14.9587 15.8212L12.06 13.5712C11.2537 14.115 10.215 14.4337 8.99999 14.4337C6.65249 14.4337 4.66124 12.8512 3.94874 10.7175L0.956238 13.0387C2.44124 15.9825 5.48249 18 8.99999 18Z"
            fill="#34A853"
          />
        </g>
        <defs>
          <clipPath id="clip0_367_44">
            <rect width="18" height="18" fill="white" />
          </clipPath>
        </defs>
      </svg>
    ),
  },
  {
    name: "네이버",
    bgColor: "#03c75a",
    color: "#fff",
    icon: (
      <svg
        width="18"
        height="18"
        viewBox="0 0 18 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M12.2045 9.63547L5.53116 0H0V18H5.79552V8.36792L12.4688 18H18V0H12.2045V9.63547Z"
          fill="white"
        />
      </svg>
    ),
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
  border-radius: 14px;

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
  border-radius: 14px;

  color: ${({ $color }) => `${$color}`};
  font-size: 0.875rem;
  font-weight: 400;

  cursor: pointer;

  transition: 0.2s all ease;

  span {
    font-weight: 500;
  }

  svg {
    margin: 0 8px 0;
  }

  &:hover {
    filter: brightness(0.95);
  }
`;

export default LoginForm;
