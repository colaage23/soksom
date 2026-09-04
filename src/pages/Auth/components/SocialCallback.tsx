import { useEffect, useRef, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import { axiosInstance } from "../../../api/axiosInstance";
import SoksomLogo from "../../../../public/logo.svg";
import { useAuthStore } from "../../../stores/auth/authStore";
import { useToast } from "../../../hooks/common/useToast";

const SocialCallback = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [error, setError] = useState(false);
  const hasRequested = useRef(false);
  const setAccessToken = useAuthStore((state) => state.setAccessToken);
  const showToast = useToast();

  useEffect(() => {
    const code = searchParams.get("code");
    const provider = searchParams.get("state");

    if (!code || !provider) {
      navigate("/auth", { replace: true });
      return;
    }
    if (hasRequested.current) return;
    hasRequested.current = true;

    const login = async () => {
      try {
        const { data } = await axiosInstance.post(`/auth/social/${provider}`, {
          code,
        });

        setAccessToken(data.accessToken);
        localStorage.setItem("soksomRefreshToken", data.refreshToken);

        navigate("/", { replace: true });
        showToast("로그인이 완료되었습니다.", "success");
      } catch (err) {
        showToast("로그인에 실패했습니다.", "error");

        console.error("소셜 로그인 실패", err);
        setError(true);
      }
    };

    login();
  }, [searchParams, navigate, setAccessToken, showToast]);

  if (error) {
    return (
      <CallbackContainer>
        <BrandImage src={SoksomLogo} alt="logo" />
        <ErrorTitle>로그인에 실패했어요</ErrorTitle>
        <ErrorDescription>
          잠시 문제가 발생했어요. 다시 시도해주세요.
        </ErrorDescription>
        <ButtonGroup>
          <RetryButton onClick={() => navigate("/auth", { replace: true })}>
            다시 시도하기
          </RetryButton>
          <HomeButton onClick={() => navigate("/", { replace: true })}>
            홈으로 돌아가기
          </HomeButton>
        </ButtonGroup>
      </CallbackContainer>
    );
  }

  return (
    <CallbackContainer>
      <BrandImage src={SoksomLogo} alt="logo" />
      <Spinner />
      <LoadingText>로그인 처리 중이에요</LoadingText>
      <LoadingSubText>잠시만 기다려주세요</LoadingSubText>
    </CallbackContainer>
  );
};

const spin = keyframes`
  to {
    transform: rotate(360deg);
  }
`;

const CallbackContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 16px;

  height: 100vh;
  padding: 16px;

  background: #f6f2e9;
`;

const BrandImage = styled.img`
  width: 40px;
  height: auto;

  margin-bottom: 8px;
`;

const Spinner = styled.div`
  width: 32px;
  height: 32px;

  border: 3px solid #e5e2da;
  border-top-color: #0c9799;
  border-radius: 50%;

  animation: ${spin} 0.8s linear infinite;
`;

const LoadingText = styled.p`
  color: #101714;
  font-size: 1rem;
  font-weight: 600;
  font-family: Gowun Batang;
`;

const LoadingSubText = styled.p`
  color: #7b827d;
  font-size: 0.875rem;
`;

const ErrorTitle = styled.h2`
  color: #101714;
  font-size: 1.125rem;
  font-weight: 600;
  font-family: Gowun Batang;
`;

const ErrorDescription = styled.p`
  color: #7b827d;
  font-size: 0.875rem;

  text-align: center;
`;

const RetryButton = styled.button`
  margin-top: 8px;
  padding: 12px 24px;

  border: none;
  border-radius: 12px;
  background-color: #0c9799;

  color: #fffafc;
  font-size: 0.875rem;
  font-weight: 500;

  cursor: pointer;

  transition: 0.2s all ease;

  &:hover {
    background-color: #0a8082;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;

  margin-top: 8px;
`;

const HomeButton = styled.button`
  margin-top: 8px;
  padding: 12px 24px;

  border: 1px solid #e5e2da;
  border-radius: 12px;
  background-color: #fff;

  color: #474e55;
  font-size: 0.875rem;
  font-weight: 500;

  cursor: pointer;

  transition: 0.2s all ease;

  &:hover {
    background-color: #fdfcf9;
  }
`;

export default SocialCallback;
