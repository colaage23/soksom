import { useState } from "react";
import authBackground from "../../assets/background/soksom_auth_background.png";
import styled from "styled-components";
import { IdCard, Lock, Mail, ShieldCheck, User } from "lucide-react";

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
        <g clip-path="url(#clip0_367_44)">
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
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M12.2045 9.63547L5.53116 0H0V18H5.79552V8.36792L12.4688 18H18V0H12.2045V9.63547Z"
          fill="white"
        />
      </svg>
    ),
  },
];

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
            width="40"
            height="39"
            viewBox="0 0 40 39"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M18.0578 2.66334C15.1249 -0.111344 5.84281 5.52 8.74037 11.504C11.6379 17.488 16.5852 16.7636 16.5852 16.7636L24.9955 15.5321C24.9955 15.5321 30.7437 16.8264 30.0135 8.38901C29.2834 -0.0484155 20.9908 5.43803 18.0578 2.66334Z"
              fill="url(#paint0_linear_368_86)"
            />
            <path
              d="M36.8977 20.9539C39.795 23.9496 33.8239 33.121 27.5551 30.0918C21.2862 27.0626 22.0767 22.1255 22.0767 22.1255L23.4206 13.7324C23.4206 13.7324 22.0951 7.95009 30.9542 8.86218C39.8133 9.77426 34.0004 17.9582 36.8977 20.9539Z"
              fill="url(#paint1_linear_368_86)"
            />
            <path
              d="M2.03594 19.6546C-0.820404 16.8873 4.18386 7.29744 10.1656 9.8442C16.1473 12.3909 15.6988 17.3708 15.6988 17.3708L14.9365 25.8365C14.9365 25.8365 16.4969 31.4993 8.23731 31.2576C-0.0222894 31.0158 4.89228 22.4219 2.03594 19.6546Z"
              fill="url(#paint2_linear_368_86)"
            />
            <path
              d="M19.0511 37.0435C16.4245 40.3269 6.60285 35.4428 8.85811 28.7621C11.1134 22.0813 16.1097 22.2711 16.1097 22.2711L24.6036 22.5938C24.6036 22.5938 30.1852 20.5504 30.3426 29.5783C30.5 38.6061 21.6776 33.76 19.0511 37.0435Z"
              fill="url(#paint3_linear_368_86)"
            />
            <path
              d="M17.7935 16.1737C17.1256 16.6307 17.2427 17.0623 16.6778 17.3002C16.2988 17.4598 16.012 17.4739 16.012 17.4739C15.163 17.6852 16.246 18.5015 16.012 19.0992C15.8433 19.5303 15.4962 19.5358 15.2994 20.0744C15.0211 20.8361 16.0603 20.3632 16.3683 20.7245C16.8039 21.2355 16.1948 21.8665 16.7246 22.3498C17.2545 22.8332 17.8379 21.8071 18.5061 22.0248C19.062 22.2059 18.8793 23 19.575 23C20.2707 23 20.3663 22.2864 21.0002 22.0248C21.5229 21.809 21.9335 22.1485 22.4254 21.6997C22.9174 21.2509 22.2987 20.6985 22.4254 20.0744C22.5618 19.4022 23.5914 18.9934 23.138 18.4491C22.717 17.9437 22.4117 18.1333 22.0691 17.799C21.6442 17.3842 22.0932 16.8571 21.3565 16.4987C20.6406 16.1504 20.2674 16.5606 19.575 16.4987C18.8689 16.4356 18.5402 15.6627 17.7935 16.1737Z"
              fill="#E3A820"
              stroke="#E3A820"
              stroke-width="4"
            />
            <defs>
              <linearGradient
                id="paint0_linear_368_86"
                x1="18.029"
                y1="1.57795"
                x2="20.2096"
                y2="16.4702"
                gradientUnits="userSpaceOnUse"
              >
                <stop stop-color="#E43A20" />
                <stop offset="1" stop-color="#A6210D" />
              </linearGradient>
              <linearGradient
                id="paint1_linear_368_86"
                x1="38.0377"
                y1="21.0061"
                x2="22.4065"
                y2="18.5033"
                gradientUnits="userSpaceOnUse"
              >
                <stop stop-color="#E13D24" />
                <stop offset="1" stop-color="#AA230F" />
              </linearGradient>
              <linearGradient
                id="paint2_linear_368_86"
                x1="0.976807"
                y1="19.6885"
                x2="15.6016"
                y2="21.0054"
                gradientUnits="userSpaceOnUse"
              >
                <stop stop-color="#CD341D" />
                <stop offset="1" stop-color="#A2210E" />
              </linearGradient>
              <linearGradient
                id="paint3_linear_368_86"
                x1="19.136"
                y1="38.1972"
                x2="19.7454"
                y2="22.1587"
                gradientUnits="userSpaceOnUse"
              >
                <stop stop-color="#EE4E35" />
                <stop offset="1" stop-color="#B9331F" />
              </linearGradient>
            </defs>
          </svg>
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
        {mode === "login" ? (
          <LoginForm>
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
          </LoginForm>
        ) : (
          <RegisterForm>
            <SubmitLabel>
              이메일<span>*</span>
            </SubmitLabel>
            <SubmitBox>
              <MailIcon />
              <SubmitInput placeholder="example@email.com" />
            </SubmitBox>
            <SubmitLabel>
              비밀번호<span>*</span>
            </SubmitLabel>
            <SubmitBox>
              <LockIcon />
              <SubmitInput placeholder="8자 이상 입력하세요" />
            </SubmitBox>
            <SubmitLabel>
              비밀번호 확인<span>*</span>
            </SubmitLabel>
            <SubmitBox>
              <ShieldCheckIcon />
              <SubmitInput placeholder="비밀번호를 다시 입력하세요" />
            </SubmitBox>
            <SubmitLabel>
              이름<span>*</span>
            </SubmitLabel>
            <SubmitBox>
              <UserIcon />
              <SubmitInput placeholder="실명을 입력하세요" />
            </SubmitBox>
            <SubmitLabel>
              닉네임<span>*</span>
            </SubmitLabel>
            <SubmitBox>
              <IdCardIcon />
              <SubmitInput placeholder="사용할 닉네임을 입력하세요" />
            </SubmitBox>

            <AgreementBox>
              <Checkbox />
              <CheckboxLabel>
                <strong>[필수]</strong> 이용약관에 동의합니다
              </CheckboxLabel>
              <ViewLink>보기</ViewLink>
            </AgreementBox>
            <AgreementBox>
              <Checkbox />
              <CheckboxLabel>
                <strong>[필수]</strong> 개인정보 수집 및 이용에 동의합니다
              </CheckboxLabel>
              <ViewLink>보기</ViewLink>
            </AgreementBox>

            <SubmitButton>회원가입</SubmitButton>
          </RegisterForm>
        )}
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

const LoginForm = styled.form`
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

const RegisterForm = styled.form`
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

export default Auth;
