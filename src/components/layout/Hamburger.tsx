import { ChevronRight, LogOut, UserRound, X } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import colors from "../../constants/colors";
import { navItems } from "../../constants/navItems";
import { useAuthStore } from "../../stores/auth/authStore";
import { useGetUserInfo } from "../../hooks/auth/useGetUserInfo";
import { useWayPointStore } from "../../stores/useWayPointStore";

type HamburgerProps = {
  isOpen: boolean;
  onClose: () => void;
};

const Hamburger = ({ isOpen, onClose }: HamburgerProps) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const accessToken = useAuthStore((state) => state.accessToken);
  const isInitialized = useAuthStore((state) => state.isInitialized);
  const clearAuth = useAuthStore((state) => state.clearAuth);
  const isLoggedIn = isInitialized && Boolean(accessToken);

  const { data: userInfo } = useGetUserInfo();

  const handleClose = () => {
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }

    onClose();
  };

  const handleLogout = () => {
    clearAuth();
    handleClose();
    navigate("/");

    useWayPointStore.getState().resetWayPoint();
    useWayPointStore.persist.clearStorage();
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
        <PanelHeader>
          <PanelTitle>메뉴</PanelTitle>
          <CloseButton
            type="button"
            onClick={handleClose}
            aria-label="메뉴 닫기"
          >
            <CloseIcon />
          </CloseButton>
        </PanelHeader>

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
                <ProfileNickname>{userInfo?.nickname ?? "-"}</ProfileNickname>
                <ProfileEmail>{userInfo?.email ?? "-"}</ProfileEmail>
              </ProfileTextBox>
            </ProfileRow>

            <ProfileArrowIcon />
          </ProfileSection>
        )}

        <NavList>
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              $isActive={pathname === item.path}
              onClick={handleClose}
            >
              {item.label}
            </NavLink>
          ))}
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
    width: min(82vw, 320px);
    height: 100%;
    padding: 20px 18px 24px;
    background: rgba(255, 255, 255, 0.98);
    box-shadow: -18px 0 40px rgba(15, 23, 42, 0.18);
    transform: ${({ $isOpen }) =>
      $isOpen ? "translateX(0)" : "translateX(100%)"};
    will-change: transform;
    transition: transform 0.28s ease;
  }
`;

const PanelHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
`;

const PanelTitle = styled.h2`
  margin: 0;
  color: #111827;
  font-size: 1rem;
  font-weight: 700;
`;

const CloseButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border: 0;
  border-radius: 999px;
  background: #f3f4f6;
  color: #111827;
`;

const CloseIcon = styled(X)`
  width: 18px;
  height: 18px;
  stroke-width: 2.4;
`;

const NavList = styled.nav`
  display: grid;
  gap: 10px;
`;

const NavLink = styled(Link)<{ $isActive: boolean }>`
  display: flex;
  align-items: center;
  min-height: 52px;
  padding: 0 16px;
  border-radius: 16px;
  background: ${({ $isActive }) => ($isActive ? "#e8f6f5" : "#f9fafb")};
  color: ${({ $isActive }) => ($isActive ? colors.main : "#1f2937")};
  text-decoration: none;
  font-size: 1rem;
  font-weight: 600;
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

  padding: 0 0 20px;
  margin-bottom: 20px;

  border: none;
  border-bottom: 1px solid #e5e7eb;
  background: transparent;

  cursor: pointer;
  transition: opacity 0.15s ease;

  &:hover {
    opacity: 0.7;
  }
`;

const ProfileRow = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;

  min-width: 0;
`;

const ProfileArrowIcon = styled(ChevronRight)`
  width: 18px;
  height: 18px;
  flex-shrink: 0;

  stroke: #9ca3af;
  stroke-width: 2.2;
`;

const ProfileImage = styled.img`
  width: 44px;
  height: 44px;

  border-radius: 50%;
  object-fit: cover;

  background-color: #f5f2eb;
`;

const ProfileTextBox = styled.div`
  display: flex;
  align-items: start;
  flex-direction: column;
  gap: 2px;

  min-width: 0;
`;

const ProfileNickname = styled.span`
  color: #111827;
  font-size: 0.9375rem;
  font-weight: 700;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const ProfileEmail = styled.span`
  color: #6b7280;
  font-size: 0.8125rem;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const LogoutButton = styled.button`
  width: 100%;
  min-height: 48px;

  display: flex;
  align-items: center;
  gap: 8px;
  justify-content: center;

  margin-top: auto;

  padding: 0 16px;

  border: 0;
  border-radius: 14px;
  background: transparent;

  color: #ef4444;

  font-size: 0.9375rem;
  font-weight: 600;

  cursor: pointer;
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
