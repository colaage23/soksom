import { CalendarDays, Heart, LogOut, MapPinned } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import colors from "../../../constants/colors";
import { useGetUserInfo } from "../../../hooks/auth/useGetUserInfo";
import { useAuthStore } from "../../../stores/auth/authStore";
import { useWayPointStore } from "../../../stores/useWayPointStore";

const SIDEBAR_LIST_TOP = 96;

const sidebarSections = [
  { id: "recent", label: "최근 방문 장소", icon: MapPinned },
  { id: "favorites", label: "즐겨찾기", icon: Heart },
  { id: "trips", label: "여행 일정", icon: CalendarDays },
] as const;

interface MypageSidebarProps {
  selectedSection: (typeof sidebarSections)[number]["id"];
  onSelectSection: (sectionId: (typeof sidebarSections)[number]["id"]) => void;
}

export const MypageSidebar = ({
  selectedSection,
  onSelectSection,
}: MypageSidebarProps) => {
  const navigate = useNavigate();
  const clearAuth = useAuthStore((state) => state.clearAuth);
  const { data: userInfo } = useGetUserInfo();
  const [isSidebarListPinned, setIsSidebarListPinned] = useState(false);
  const [sidebarListLeft, setSidebarListLeft] = useState(0);
  const [sidebarListWidth, setSidebarListWidth] = useState(0);
  const [sidebarListHeight, setSidebarListHeight] = useState(0);
  const sidebarRef = useRef<HTMLElement | null>(null);
  const sidebarListSlotRef = useRef<HTMLDivElement | null>(null);
  const sidebarListRef = useRef<HTMLDivElement | null>(null);

  const scrollToSection = (
    sectionId: (typeof sidebarSections)[number]["id"],
  ) => {
    onSelectSection(sectionId);
    document
      .getElementById(`mypage-${sectionId}`)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleLogout = () => {
    clearAuth();
    useWayPointStore.getState().resetWayPoint();
    useWayPointStore.persist.clearStorage();
    navigate("/");
  };

  useEffect(() => {
    const updateSidebarListPosition = () => {
      const sidebarElement = sidebarRef.current;
      const sidebarListSlotElement = sidebarListSlotRef.current;
      const sidebarListElement = sidebarListRef.current;

      if (!sidebarElement || !sidebarListSlotElement || !sidebarListElement) {
        return;
      }

      if (window.innerWidth <= 980) {
        setIsSidebarListPinned(false);
        setSidebarListLeft(0);
        setSidebarListWidth(0);
        setSidebarListHeight(0);

        return;
      }

      const sidebarRect = sidebarElement.getBoundingClientRect();
      const slotRect = sidebarListSlotElement.getBoundingClientRect();

      setSidebarListLeft(slotRect.left);
      setSidebarListWidth(sidebarRect.width);
      setSidebarListHeight(sidebarListElement.offsetHeight);
      setIsSidebarListPinned(slotRect.top <= SIDEBAR_LIST_TOP);
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
        <ProfileName>{userInfo?.nickname || userInfo?.name || "-"}</ProfileName>
        <ProfileEmail>{userInfo?.email || "-"}</ProfileEmail>
      </ProfileCard>
      <SidebarListSlot
        ref={sidebarListSlotRef}
        $height={isSidebarListPinned ? sidebarListHeight : undefined}
      >
        <SidebarList
          ref={sidebarListRef}
          $pinned={isSidebarListPinned}
          $left={sidebarListLeft}
          $width={sidebarListWidth}
        >
          {sidebarSections.map((section) => {
            const Icon = section.icon;

            return (
              <SidebarButton
                key={section.id}
                type="button"
                $active={selectedSection === section.id}
                onClick={() => scrollToSection(section.id)}
              >
                <Icon size={17} />
                <span>{section.label}</span>
              </SidebarButton>
            );
          })}

          <SidebarLogout type="button" $active={false} onClick={handleLogout}>
            <LogOut size={17} />
            <span>로그아웃</span>
          </SidebarLogout>
        </SidebarList>
      </SidebarListSlot>
    </Sidebar>
  );
};

const ProfileCard = styled.article`
  display: grid;
  justify-items: center;
  gap: 10px;
  width: 100%;
  max-width: 280px;
  padding: 28px 22px;
  border: 1px solid rgba(36, 149, 155, 0.1);
  border-radius: 24px;
  background: rgba(255, 255, 255, 0.82);
  box-shadow: 0 20px 40px rgba(35, 49, 44, 0.06);

  @media (max-width: 980px) {
    max-width: none;
  }
`;

const AvatarCircle = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  width: 62px;
  height: 62px;
  border-radius: 999px;
  background: linear-gradient(145deg, ${colors.main}, #1f7f84);
  color: white;
  font-size: 2rem;
  font-weight: 700;
`;

const ProfileImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const ProfileName = styled.h2`
  margin: 0;
  color: #24302a;
  font-size: 1.9rem;
  font-family: Gowun Batang;
`;

const ProfileEmail = styled.p`
  margin: -2px 0 0;
  color: #90a099;
  font-size: 0.95rem;
`;

const Sidebar = styled.aside`
  display: grid;
  gap: 16px;
  align-self: start;
`;

const SidebarListSlot = styled.div<{ $height?: number }>`
  min-height: ${({ $height }) => ($height ? `${$height}px` : "auto")};

  @media (max-width: 980px) {
    display: none;
    min-height: auto;
  }
`;

const SidebarList = styled.div<{
  $pinned: boolean;
  $left: number;
  $width: number;
}>`
  position: ${({ $pinned }) => ($pinned ? "fixed" : "relative")};
  top: ${({ $pinned }) => ($pinned ? `${SIDEBAR_LIST_TOP}px` : "auto")};
  left: ${({ $pinned, $left }) => ($pinned ? `${$left}px` : "auto")};
  width: ${({ $pinned, $width }) => ($pinned ? `${$width}px` : "100%")};
  z-index: ${({ $pinned }) => ($pinned ? 10 : 1)};
  overflow: hidden;
  border: 1px solid rgba(36, 149, 155, 0.08);
  border-radius: 24px;
  background: rgba(255, 255, 255, 0.84);
  box-shadow: 0 18px 34px rgba(35, 49, 44, 0.05);

  @media (max-width: 980px) {
    position: relative;
    top: auto;
    left: auto;
    width: 100%;
  }
`;

const SidebarButton = styled.button<{ $active: boolean }>`
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  padding: 16px 18px;
  border: 0;
  border-bottom: 1px solid rgba(36, 149, 155, 0.06);
  background: ${({ $active }) =>
    $active ? "rgba(36, 149, 155, 0.08)" : "transparent"};
  color: ${({ $active }) => ($active ? colors.main : "#65716b")};
  font-size: 0.95rem;
  font-weight: 700;
  text-align: left;
  cursor: pointer;
`;

const SidebarLogout = styled(SidebarButton)`
  color: #ef6a56;
  border-bottom: 0;
`;
