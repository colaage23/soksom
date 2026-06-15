import { X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import colors from "../../constants/colors";
import { navItems } from "../../constants/navItems";

type HamburgerProps = {
  isOpen: boolean;
  onClose: () => void;
};

const Hamburger = ({ isOpen, onClose }: HamburgerProps) => {
  const { pathname } = useLocation();

  return (
    <MenuRoot $isOpen={isOpen} aria-hidden={!isOpen}>
      <Backdrop
        type="button"
        $isOpen={isOpen}
        aria-label="메뉴 닫기"
        onClick={onClose}
      />
      <Panel id="mobile-menu" $isOpen={isOpen} aria-label="모바일 메뉴">
        <PanelHeader>
          <PanelTitle>메뉴</PanelTitle>
          <CloseButton type="button" onClick={onClose} aria-label="메뉴 닫기">
            <CloseIcon />
          </CloseButton>
        </PanelHeader>

        <NavList>
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              $isActive={pathname === item.path}
              onClick={onClose}
            >
              {item.label}
            </NavLink>
          ))}
        </NavList>

        <BottomSection>
          <LoginAction type="button">로그인 후 여행 계획 하기</LoginAction>
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
    display: block;
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
  margin-top: 24px;
  padding-top: 24px;
  border-top: 1px solid #e5e7eb;
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

export default Hamburger;
