import { useEffect, useRef } from "react";
import styled from "styled-components";
import colors from "../../../constants/colors";
import { useLogout } from "../../../hooks/auth/useAuth";
import { useMypageCounts } from "../../../hooks/mypage/useMypageCounts";
import { useGetUserInfo } from "../../../hooks/auth/useGetUserInfo";
import { AUTH_PROVIDER_LOGO } from "../../../constants/authProvider";

const PROVIDER_LABEL: Record<string, string> = {
  KAKAO: "카카오",
  GOOGLE: "구글",
  NAVER: "네이버",
};

export const MypageSidebar = () => {
  const logout = useLogout();

  const { data: userInfo } = useGetUserInfo();

  const {
    recentCount,
    favoriteCount,
    pastTripCount,
    isLoading: isCountLoading,
  } = useMypageCounts();

  const stats = [
    { label: "즐겨찾기", value: favoriteCount },
    { label: "다녀온 여행", value: pastTripCount },
    { label: "최근 조회한 장소", value: recentCount },
  ];

  const sidebarRef = useRef<HTMLElement | null>(null);
  const sidebarListSlotRef = useRef<HTMLDivElement | null>(null);
  const sidebarListRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const updateSidebarListPosition = () => {
      const sidebarElement = sidebarRef.current;
      const sidebarListSlotElement = sidebarListSlotRef.current;
      const sidebarListElement = sidebarListRef.current;

      if (!sidebarElement || !sidebarListSlotElement || !sidebarListElement) {
        return;
      }
    };

    updateSidebarListPosition();
    window.addEventListener("scroll", updateSidebarListPosition, {
      passive: true,
    });
    window.addEventListener("resize", updateSidebarListPosition);

    return () => {
      window.removeEventListener("scroll", updateSidebarListPosition);
      window.removeEventListener("resize", updateSidebarListPosition);
    };
  }, []);

  return (
    <Sidebar ref={sidebarRef}>
      <ProfileCard>
        <AvatarCircle>
          {userInfo?.img ? (
            <ProfileImage
              src={userInfo.img}
              alt={`${userInfo.nickname || userInfo.name || "사용자"} 프로필`}
            />
          ) : (
            (userInfo?.nickname || userInfo?.name || "?").trim().charAt(0) ||
            "?"
          )}
        </AvatarCircle>
        <ProfileInfo>
          <ProfileName>
            {userInfo?.authProvider &&
              userInfo.authProvider !== "LOCAL" &&
              AUTH_PROVIDER_LOGO[userInfo.authProvider] && (
                <ProviderLogo
                  src={AUTH_PROVIDER_LOGO[userInfo.authProvider]}
                  alt={userInfo.authProvider}
                />
              )}
            {userInfo?.nickname || userInfo?.name || "-"}
          </ProfileName>
          <ProfileEmail>
            {userInfo?.authProvider === "LOCAL"
              ? userInfo?.email || "-"
              : `${PROVIDER_LABEL[userInfo?.authProvider ?? ""] ?? "소셜"} 계정으로 로그인`}
            <Divider />
            <LogoutButton type="button" onClick={() => logout()}>
              로그아웃
            </LogoutButton>
          </ProfileEmail>
        </ProfileInfo>

        <StatList>
          {stats.map(({ label, value }) => (
            <StatItem key={label}>
              <dt>{label}</dt>
              <dd>{isCountLoading ? "–" : value}</dd>
            </StatItem>
          ))}
        </StatList>
      </ProfileCard>
    </Sidebar>
  );
};

const ProfileCard = styled.article`
  display: flex;
  flex-wrap: wrap;
  justify-items: center;
  gap: 24px;
  width: 100%;
  padding: 28px 22px;
  /* 
  border-radius: 24px;
  background: rgba(255, 255, 255, 0.82);
  box-shadow: 0 20px 40px rgba(35, 49, 44, 0.06); */

  @media (max-width: 980px) {
    max-width: none;
    padding: 8px;
    gap: 18px;
  }
`;

const StatList = styled.dl`
  display: flex;
  align-items: end;
  gap: 40px;
  margin: 0 0 0 auto;
  user-select: none;
  cursor: default;

  @media (max-width: 768px) {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 0;
    width: 100%;
    margin: 0;
    padding: 14px 0;
    border-top: 1px solid #e4ddcf;
    border-bottom: 1px solid #e4ddcf;
  }
`;

const StatItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;

  dt {
    color: #7b766b;
    font-size: 0.8rem;
  }

  dd {
    margin: 0;
    color: #24302a;
    font-family: Gowun Batang;
    font-size: 1.75rem;
    font-weight: 700;
    line-height: 1;
  }

  @media (max-width: 768px) {
    align-items: center;

    & + & {
      border-left: 1px solid #e4ddcf;
    }

    dd {
      font-size: 1.4rem;
    }
  }
`;

const AvatarCircle = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  width: 72px;
  height: 72px;
  border-radius: 28px;
  border: 1px solid #e5dcc8;
  background: linear-gradient(145deg, ${colors.main}, #1f7f84);
  color: white;
  font-size: 2rem;
  font-weight: 700;

  @media (max-width: 768px) {
    width: 64px;
    height: 64px;
    border-radius: 26px;
  }
`;

const ProfileImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const ProfileInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  gap: 8px;
`;

const ProfileName = styled.h2`
  display: flex;
  align-items: center;
  gap: 8px;

  margin: 0;
  color: #24302a;
  font-size: 2rem;
  font-family: Gowun Batang;

  line-height: 1;

  @media (max-width: 768px) {
    font-size: 1.625rem;
  }
`;

const ProviderLogo = styled.img`
  width: 22px;
  height: 22px;
  flex-shrink: 0;
  object-fit: contain;
`;

const ProfileEmail = styled.p`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 24px;
  margin: -2px 0 0;
  color: #7b766b;
  font-size: 0.95rem;

  @media (max-width: 768px) {
    width: 100%;
    font-size: 0.875rem;
    justify-content: space-between;
  }
`;

const Divider = styled.div`
  width: 1px;
  height: 1rem;
  background-color: #cbc5b7;

  @media (max-width: 768px) {
    display: none;
  }
`;

const LogoutButton = styled.button`
  height: fit-content;

  padding: 8px 16px;

  background-color: #fffefc;
  border: 1px solid #dbd6cb;
  border-radius: 12px;

  font-size: 0.725rem;
  font-weight: 500;
  line-height: 1;

  cursor: pointer;

  transition: background-color 0.2s ease;

  &:hover {
    background-color: #fffdfa;
  }

  @media (max-width: 768px) {
    font-size: 0.625rem;
    padding: 8px 18px;
    margin-right: 4px;
  }
`;

const Sidebar = styled.aside`
  display: grid;
  gap: 16px;
  align-self: start;
  border-bottom: 1px solid #dbd6cb;

  @media (max-width: 768px) {
    border-bottom: none;
  }
`;
