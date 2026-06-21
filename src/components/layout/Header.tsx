import { useEffect, useState } from "react";
import { Menu, User } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import colors from "../../constants/colors";
import Hamburger from "./Hamburger";
import { navItems } from "../../constants/navItems";
import SoksomLogo from "../../../public/logo.svg";

const Header = () => {
  const { pathname } = useLocation();
  const isHomePage = pathname === "/";
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const updateScrollState = () => {
      setIsScrolled(window.scrollY > 12);
    };

    updateScrollState();
    window.addEventListener("scroll", updateScrollState, { passive: true });

    return () => window.removeEventListener("scroll", updateScrollState);
  }, [pathname]);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

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
              <UserIcon $isSolid={isSolid} />
              <LoginBtn $isSolid={isSolid} onClick={() => navigate("/auth")}>
                로그인
              </LoginBtn>
            </DesktopActions>
            <HamburgerBtn
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

const HamburgerBtn = styled.button`
  display: none;
  align-items: center;
  justify-content: center;
  width: 38px;
  height: 38px;
  padding: 0;
  border: 0;
  border-radius: 999px;
  background: transparent;
  color: #111827;
  cursor: pointer;

  @media (max-width: 768px) {
    display: inline-flex;
  }
`;

const UserIcon = styled(User)<{ $isSolid: boolean }>`
  width: 20px;
  height: 20px;
  stroke: currentColor;
  stroke-width: 2.2;
  color: ${({ $isSolid }) => ($isSolid ? "#111827" : "white")};
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

export default Header;
