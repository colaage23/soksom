import logoImage from "../../assets/icons/soksom-logo.svg";
import { Menu, User } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";

const navItems = [
  { label: "탐색", path: "/search" },
  { label: "내 일정", path: "/plan" },
  { label: "혼잡도 지도", path: "/congestion" },
  { label: "이용 가이드", path: "/guide" },
];

const Header = () => {
  const { pathname } = useLocation();

  return (
    <HeaderShell>
      <HeaderInner>
        <BrandBlock>
          <BrandImage src={logoImage} alt="속솜" />
          <BrandText>
            <h3>속솜</h3>
          </BrandText>
        </BrandBlock>

        <DesktopNav aria-label="주요 메뉴">
          {navItems.map((item) => (
            <NavItem
              key={item.path}
              to={item.path}
              $isActive={pathname === item.path}
            >
              {item.label}
            </NavItem>
          ))}
        </DesktopNav>

        <Actions>
          <DesktopActions>
            <IconLink>
              <UserIcon />
            </IconLink>
            <LoginBtn>로그인</LoginBtn>
          </DesktopActions>
          <HamburgerBtn>
            <MenuIcon />
          </HamburgerBtn>
        </Actions>
      </HeaderInner>
    </HeaderShell>
  );
};

const HeaderShell = styled.header`
  position: sticky;
  top: 0;
  left: 0;
  right: 0;
  z-index: 20;
  width: 100%;
  background: transparent;
  border-bottom: 1px solid #e9e9e9;
`;

const HeaderInner = styled.div`
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  gap: 24px;
  width: 100%;
  padding: 8px 30px;
  box-sizing: border-box;

  @media (max-width: 960px) {
    height: 72px;
    padding: 0 20px;
  }

  @media (max-width: 768px) {
    grid-template-columns: auto 1fr auto;
    height: 62px;
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
`;

const BrandImage = styled.img`
  display: block;
  width: 35px;
  height: auto;

  @media (max-width: 768px) {
    width: 74px;
  }
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

const BrandText = styled.div`
  display: grid;
  gap: 2px;
`;

const NavItem = styled(Link)<{ $isActive: boolean }>`
  color: ${({ $isActive }) => ($isActive ? "#24959b" : "#5a635f")};
  text-decoration: none;
  font-size: 0.84rem;
  font-weight: 600;
  letter-spacing: -0.03em;
  transition: color 0.2s ease;

  &:hover {
    color: #24959b;
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
  color: #101714;
  cursor: pointer;

  @media (max-width: 768px) {
    display: inline-flex;
  }
`;

const IconLink = styled.div`
  display: grid;
  place-items: center;
  width: 18px;
  height: 18px;
  color: #101714;
`;

const UserIcon = styled(User)`
  width: 18px;
  height: 18px;
  stroke: currentColor;
  stroke-width: 2.2;
`;

const MenuIcon = styled(Menu)`
  width: 20px;
  height: 20px;
  stroke: currentColor;
  stroke-width: 2.2;
`;

const LoginBtn = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 76px;
  height: 36px;
  padding: 0 18px;
  border-radius: 999px;
  background: #111111;
  color: #fbf8f1;
  text-decoration: none;
  font-size: 0.76rem;
  font-weight: 700;
  letter-spacing: -0.03em;

  &:hover {
    background: #1e1e1e;
  }
`;

export default Header;
