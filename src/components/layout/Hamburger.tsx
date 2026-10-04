import {
  BookOpen,
  ChevronLeft,
  House,
  LogOut,
  Telescope,
  UserRound,
  type LucideIcon,
} from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import colors from "../../constants/colors";
import { navItems } from "../../constants/navItems";
import { useAuthStore } from "../../stores/auth/authStore";
import { useGetUserInfo } from "../../hooks/auth/useGetUserInfo";
import { useLogout } from "../../hooks/auth/useAuth";
import { AUTH_PROVIDER_LOGO } from "../../constants/authProvider";

type HamburgerProps = {
  isOpen: boolean;
  onClose: () => void;
};

const NAV_ICONS: Record<string, LucideIcon> = {
  홈: House,
  탐색: Telescope,
  "이용 가이드": BookOpen,
};

const Hamburger = ({ isOpen, onClose }: HamburgerProps) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const logout = useLogout();

  const accessToken = useAuthStore((state) => state.accessToken);
  const isInitialized = useAuthStore((state) => state.isInitialized);
  const isLoggedIn = isInitialized && Boolean(accessToken);

  const { data: userInfo } = useGetUserInfo();

  const handleClose = () => {
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }

    onClose();
  };

  const handleLogout = () => {
    logout();
    handleClose();
    navigate("/");
  };

  return (
    <MenuRoot $isOpen={isOpen}>
      <Backdrop
        type="button"
        $isOpen={isOpen}
        aria-label="메뉴 닫기"
        onClick={handleClose}
      />
      <Panel id="mobile-menu" $isOpen={isOpen} aria-label="모바일 메뉴">
        {isLoggedIn && (
          <ProfileSection
            type="button"
            onClick={() => {
              handleClose();
              navigate("/mypage");
            }}
          >
            <ProfileRow>
              {userInfo?.img ? (
                <ProfileImage
                  src={userInfo.img}
                  alt={userInfo?.nickname ?? "프로필"}
                />
              ) : (
                <ProfileImagePlaceholder>
                  <ProfileFallbackIcon />
                </ProfileImagePlaceholder>
              )}
              <ProfileTextBox>
                <ProfileNickname>
                  {userInfo?.authProvider &&
                    userInfo.authProvider !== "LOCAL" &&
                    AUTH_PROVIDER_LOGO[userInfo.authProvider] && (
                      <ProviderLogo
                        src={AUTH_PROVIDER_LOGO[userInfo.authProvider]}
                        alt={userInfo.authProvider}
                      />
                    )}
                  {userInfo?.nickname ?? "-"}
                </ProfileNickname>
                {userInfo?.authProvider === "LOCAL" && (
                  <ProfileEmail>{userInfo?.email ?? "-"}</ProfileEmail>
                )}
              </ProfileTextBox>
            </ProfileRow>

            <ProfileArrowIcon />
          </ProfileSection>
        )}

        <OverviewText>메뉴</OverviewText>
        <NavList>
          {navItems.map((item) => {
            const isActive = pathname === item.path;
            const Icon = NAV_ICONS[item.label];

            return (
              <NavLink
                key={item.path}
                to={item.path}
                $isActive={isActive}
                aria-current={isActive ? "page" : undefined}
                onClick={handleClose}
              >
                <NavLabel>
                  {Icon && <Icon size={18} aria-hidden />}
                  {item.label}
                </NavLabel>
              </NavLink>
            );
          })}
        </NavList>

        <BottomSection>
          {isLoggedIn ? (
            <LogoutButton type="button" onClick={handleLogout}>
              <LogOutIcon />
              로그아웃
            </LogoutButton>
          ) : (
            <LoginAction
              type="button"
              onClick={() => {
                handleClose();
                navigate("/auth");
              }}
            >
              로그인 후 여행 계획 하기
            </LoginAction>
          )}
        </BottomSection>
      </Panel>
    </MenuRoot>
  );
};

const MenuRoot = styled.div<{ $isOpen: boolean }>`
  pointer-events: none;
  visibility: hidden;
  opacity: 0;

  @media (max-width: 768px) {
    position: fixed;
    inset: 0;
    z-index: 30;
    pointer-events: ${({ $isOpen }) => ($isOpen ? "auto" : "none")};
    visibility: ${({ $isOpen }) => ($isOpen ? "visible" : "hidden")};
    opacity: ${({ $isOpen }) => ($isOpen ? 1 : 0)};
    transition:
      opacity 0.24s ease,
      visibility 0.24s ease;
  }
`;

const Backdrop = styled.button<{ $isOpen: boolean }>`
  position: absolute;
  inset: 0;
  border: 0;
  background: rgba(15, 23, 42, 0.34);
  opacity: ${({ $isOpen }) => ($isOpen ? 1 : 0)};
  transition: opacity 0.24s ease;
`;

const Panel = styled.aside<{ $isOpen: boolean }>`
  display: none;
  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;

    position: absolute;
    top: 0;
    right: 0;
    width: min(82vw, 260px);
    height: 100%;
    background: rgba(255, 255, 255, 0.98);
    box-shadow: -18px 0 40px rgba(15, 23, 42, 0.18);
    transform: ${({ $isOpen }) =>
      $isOpen ? "translateX(0)" : "translateX(100%)"};
    will-change: transform;
    transition: transform 0.28s ease;
  }
`;

const OverviewText = styled.p`
  height: 32px;

  display: flex;
  justify-content: start;
  align-items: center;
  margin: 0;
  padding: 0 0 0 16px;

  color: #b8af9f;

  font-size: 12px;
`;

const NavList = styled.nav`
  display: flex;
  flex-direction: column;
  padding: 0px 8px 0 8px;
  cursor: pointer;
`;

const NavLabel = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 12px;

  svg {
    flex-shrink: 0;
    stroke-width: 2;
  }
`;

const NavLink = styled(Link)<{ $isActive: boolean }>`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: start;
  gap: 8px;
  min-height: 48px;
  padding: 0 0 0 10px;
  color: ${({ $isActive }) => ($isActive ? "#0C9799" : "#2a2621")};
  background-color: ${({ $isActive }) =>
    $isActive ? "#0c979919" : "transparent"};
  font-size: 14px;
  font-weight: 500;
  text-decoration: none;
  transition: background-color 0.2s ease;
  border-radius: 8px;

  &:hover {
    background: #0c979919;
  }

  &:focus-visible {
    outline: 2px solid ${colors.main};
    outline-offset: -2px;
    border-radius: 8px;
  }
`;

const BottomSection = styled.div`
  flex: 1;
  min-height: 0;

  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;

const LoginAction = styled.button`
  width: 100%;
  min-height: 48px;
  border: 0;
  border-radius: 14px;
  background: ${colors.main};
  color: white;
  font-size: 0.95rem;
  font-weight: 700;
`;

const LogOutIcon = styled(LogOut)`
  width: 18px;
  height: 18px;
  stroke: currentColor;
  stroke-width: 2;
`;

const ProfileSection = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;

  width: 100%;

  padding: 16px 20px 16px 16px;
  margin-bottom: 8px;

  border: none;
  border-bottom: 1px solid #efebe3;
  background: transparent;

  cursor: pointer;
  transition: opacity 0.15s ease;

  &:hover {
    opacity: 0.8;
  }
`;

const ProfileRow = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;

  min-width: 0;
`;

const ProfileArrowIcon = styled(ChevronLeft)`
  width: 18px;
  height: 18px;
  flex-shrink: 0;

  stroke: #c4bdb0;
  stroke-width: 2.2;
`;

const ProfileImage = styled.img`
  width: 48px;
  height: 48px;

  border-radius: 16px;
  object-fit: cover;

  background-color: #f5f2eb;
`;

const ProfileTextBox = styled.div`
  display: flex;
  align-items: start;
  flex-direction: column;
  gap: 5px;

  min-width: 0;
`;

const ProfileNickname = styled.span`
  display: flex;
  align-items: center;
  gap: 6px;

  color: #111827;
  font-size: 16px;
  font-weight: 600;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const ProviderLogo = styled.img`
  width: 18px;
  height: 18px;
  flex-shrink: 0;
  object-fit: contain;
`;

const ProfileEmail = styled.span`
  color: #6b7280;
  font-size: 12px;
  font-weight: 300;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const LogoutButton = styled.button`
  min-height: 48px;

  display: flex;
  align-items: center;
  gap: 8px;
  justify-content: start;

  margin-top: auto;

  padding: 16px 8px 16px 10px;
  margin: 8px;

  border: 0;
  border-radius: 10px;
  background: transparent;
  transition: all 0.2s ease;

  color: #2a2621;

  font-size: 0.875rem;
  font-weight: 500;

  cursor: pointer;

  &:hover {
    color: #ef4444;
    background-color: rgba(239, 68, 68, 0.1);
  }
`;

const ProfileImagePlaceholder = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;

  width: 44px;
  height: 44px;

  border-radius: 50%;
  background-color: #f5f2eb;
`;

const ProfileFallbackIcon = styled(UserRound)`
  width: 26px;
  height: 26px;
  stroke: #b5b1a7;
  stroke-width: 1.6;
`;

export default Hamburger;
