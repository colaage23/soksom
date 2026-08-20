import { useEffect, useRef, useState } from "react";
import { LogOut, Menu, User, UserCircle, UserRound } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import colors from "../../constants/colors";
import Hamburger from "./Hamburger";
import { navItems } from "../../constants/navItems";
import SoksomLogo from "../../../public/logo.svg";
import { useAuthStore } from "../../stores/auth/authStore";
import { useGetUserInfo } from "../../hooks/auth/useGetUserInfo";
import { useWayPointStore } from "../../stores/useWayPointStore";

const Header = () => {
  const { pathname } = useLocation();
  const isHomePage = pathname === "/";
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);

  const navigate = useNavigate();

  const accessToken = useAuthStore((state) => state.accessToken);
  const isInitialized = useAuthStore((state) => state.isInitialized);
  const clearAuth = useAuthStore((state) => state.clearAuth);
  const isLoggedIn = isInitialized && Boolean(accessToken);

  const { data: userInfo } = useGetUserInfo();

  useEffect(() => {
    const updateScrollState = () => {
      setIsScrolled(window.scrollY > 12);
    };

    updateScrollState();
    window.addEventListener("scroll", updateScrollState, { passive: true });

    return () => window.removeEventListener("scroll", updateScrollState);
  }, [pathname]);

  const [prevPathname, setPrevPathname] = useState(pathname);

  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    setIsMenuOpen(false);
    setIsUserMenuOpen(false);
  }

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  useEffect(() => {
    if (!isUserMenuOpen) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(e.target as Node)
      ) {
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isUserMenuOpen]);

  const handleLogout = () => {
    clearAuth();
    setIsUserMenuOpen(false);
    navigate("/");

    useWayPointStore.getState().resetWayPoint();
    useWayPointStore.persist.clearStorage();
  };

  const isSolid = !isHomePage || isScrolled;

  return (
    <>
      <HeaderShell $isSolid={isSolid}>
        <HeaderInner>
          <BrandBlock onClick={() => navigate("/")}>
            <BrandImage src={SoksomLogo} alt="속솜" />
            <BrandText $isSolid={isSolid}>
              <h3>속솜</h3>
            </BrandText>
          </BrandBlock>

          <DesktopNav aria-label="주요 메뉴">
            {navItems.map((item) => (
              <NavItem
                key={item.path}
                to={item.path}
                $isActive={pathname === item.path}
                $isSolid={isSolid}
              >
                {item.label}
              </NavItem>
            ))}
          </DesktopNav>

          <Actions>
            <DesktopActions>
              {isLoggedIn ? (
                <UserMenuWrapper ref={userMenuRef}>
                  <UserIcon
                    $isSolid={isSolid}
                    onClick={() => setIsUserMenuOpen((prev) => !prev)}
                  />
                  {isUserMenuOpen && (
                    <UserDropdown>
                      <UserProfileBox>
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
                            {userInfo?.nickname ?? "-"}
                          </ProfileNickname>
                          <ProfileEmail>{userInfo?.email ?? "-"}</ProfileEmail>
                        </ProfileTextBox>
                      </UserProfileBox>

                      <DropdownDivider />

                      <DropdownItem
                        onClick={() => {
                          setIsUserMenuOpen(false);
                          navigate("/mypage");
                        }}
                      >
                        <UserCircleIcon />
                        마이페이지
                      </DropdownItem>
                      <DropdownItem onClick={handleLogout}>
                        <LogOutIcon />
                        로그아웃
                      </DropdownItem>
                    </UserDropdown>
                  )}
                </UserMenuWrapper>
              ) : (
                <LoginBtn $isSolid={isSolid} onClick={() => navigate("/auth")}>
                  로그인
                </LoginBtn>
              )}
            </DesktopActions>
            <HamburgerBtn
              $isSolid={isSolid}
              onClick={() => setIsMenuOpen(true)}
              aria-label="메뉴 열기"
            >
              <MenuIcon />
            </HamburgerBtn>
          </Actions>
        </HeaderInner>
      </HeaderShell>
      <Hamburger isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  );
};

const HeaderShell = styled.header<{ $isSolid: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 20;
  width: 100%;
  background: ${({ $isSolid }) =>
    $isSolid ? "rgba(255, 255, 255, 0.96)" : "transparent"};
  box-shadow: ${({ $isSolid }) =>
    $isSolid ? "0 10px 30px rgba(15, 23, 42, 0.08)" : "none"};
  backdrop-filter: ${({ $isSolid }) => ($isSolid ? "blur(12px)" : "none")};
  transition:
    background-color 0.24s ease,
    box-shadow 0.24s ease,
    backdrop-filter 0.24s ease;
`;

const HeaderInner = styled.div`
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  gap: 24px;
  width: 100%;
  min-height: 72px;
  padding: 0px 45px;
  box-sizing: border-box;

  @media (max-width: 960px) {
    padding: 0 20px;
  }

  @media (max-width: 768px) {
    grid-template-columns: auto 1fr auto;
    gap: 12px;
    padding: 0 16px;
  }
`;

const BrandBlock = styled.div`
  display: inline-flex;
  align-items: center;
  min-width: fit-content;
  text-decoration: none;
  gap: 5px;

  cursor: pointer;
`;

const BrandImage = styled.img`
  display: block;
  width: 32px;
  height: auto;
`;

const DesktopNav = styled.nav`
  display: flex;
  align-items: center;
  gap: 28px;
  justify-self: center;

  @media (max-width: 960px) {
    gap: 18px;
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

const BrandText = styled.div<{ $isSolid: boolean }>`
  display: grid;
  gap: 2px;
  color: ${({ $isSolid }) => ($isSolid ? "#111827" : "white")};

  h3 {
    font-size: 1.4rem;
    font-weight: 600;
    letter-spacing: -0.03em;
    font-family: Gowun Batang;
  }
`;

const NavItem = styled(Link)<{ $isActive: boolean; $isSolid: boolean }>`
  color: ${({ $isActive, $isSolid }) => {
    if ($isActive) return colors.main;

    return $isSolid ? "#374151" : "white";
  }};
  text-decoration: none;
  font-size: 0.9rem;
  font-weight: 500;
  letter-spacing: -0.03em;
  transition: color 0.2s ease;

  &:hover {
    color: ${colors.main};
  }
`;

const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
  justify-self: end;

  @media (max-width: 768px) {
    gap: 0;
  }
`;

const DesktopActions = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;

  @media (max-width: 768px) {
    display: none;
  }
`;

const HamburgerBtn = styled.button<{ $isSolid: boolean }>`
  display: none;
  align-items: center;
  justify-content: center;
  width: 38px;
  height: 38px;
  padding: 0;
  border: 0;
  border-radius: 999px;
  background: transparent;
  color: ${({ $isSolid }) => ($isSolid ? "#111827" : "white")};
  cursor: pointer;

  @media (max-width: 768px) {
    display: inline-flex;
  }
`;

const UserIcon = styled(User)<{ $isSolid: boolean }>`
  padding: 0.5rem;
  width: 36px;
  height: 36px;
  stroke: currentColor;
  stroke-width: 2.2;
  color: ${({ $isSolid }) => ($isSolid ? "#111827" : "white")};
  cursor: pointer;
`;

const MenuIcon = styled(Menu)`
  width: 20px;
  height: 20px;
  stroke: currentColor;
  stroke-width: 2.2;
`;

const LoginBtn = styled.button<{ $isSolid: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 76px;
  height: 36px;
  padding: 0 18px;
  border-radius: 999px;
  background: ${({ $isSolid }) => ($isSolid ? colors.main : "white")};
  color: ${({ $isSolid }) => ($isSolid ? "white" : "black")};
  font-size: 0.8rem;
  font-weight: 700;
  border: 0;
  transition:
    background-color 0.2s ease,
    color 0.2s ease;

  cursor: pointer;

  &:hover {
    background: #0c9799;
    color: white;
  }
`;

const UserMenuWrapper = styled.div`
  position: relative;
  display: inline-flex;
  align-items: center;
`;

const DropdownItem = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;

  padding: 10px 12px;

  border: none;
  border-radius: 10px;
  background: transparent;

  color: #374151;
  font-size: 0.875rem;
  font-weight: 500;

  cursor: pointer;
  transition: background-color 0.15s ease;

  &:hover {
    background-color: #f5f2eb;
  }
`;

const UserCircleIcon = styled(UserCircle)`
  width: 16px;
  height: 16px;
  stroke: currentColor;
  stroke-width: 2;
`;

const LogOutIcon = styled(LogOut)`
  width: 16px;
  height: 16px;
  stroke: currentColor;
  stroke-width: 2;
`;

const UserDropdown = styled.div`
  position: absolute;
  top: calc(100% + 12px);
  right: 0;

  min-width: 220px;

  display: flex;
  flex-direction: column;
  padding: 6px;

  background: white;
  border-radius: 14px;
  box-shadow: 0 10px 30px rgba(15, 23, 42, 0.12);

  z-index: 30;
`;

const UserProfileBox = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  padding: 10px 12px 12px;
`;

const ProfileImage = styled.img`
  width: 36px;
  height: 36px;
  flex-shrink: 0;

  border-radius: 50%;
  object-fit: cover;

  background-color: #f5f2eb;
`;

const ProfileTextBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;

  min-width: 0;
`;

const ProfileNickname = styled.span`
  color: #101714;
  font-size: 0.875rem;
  font-weight: 600;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const ProfileEmail = styled.span`
  color: #7b827d;
  font-size: 0.75rem;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const DropdownDivider = styled.div`
  height: 1px;
  margin: 2px 4px 6px;

  background-color: #f2eee6;
`;

const ProfileImagePlaceholder = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;

  width: 36px;
  height: 36px;

  border-radius: 50%;
  background-color: #f5f2eb;
`;

const ProfileFallbackIcon = styled(UserRound)`
  width: 22px;
  height: 22px;
  stroke: #b5b1a7;
  stroke-width: 1.6;
`;

export default Header;
