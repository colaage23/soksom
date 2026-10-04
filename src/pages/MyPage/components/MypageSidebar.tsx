import { CalendarDays, Heart, MapPinned, UserRoundX } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import colors from "../../../constants/colors";
import { useDeleteUser, useLogout } from "../../../hooks/auth/useAuth";
import { useMypageCounts } from "../../../hooks/mypage/useMypageCounts";
import { useGetUserInfo } from "../../../hooks/auth/useGetUserInfo";
import { useToast } from "../../../hooks/common/useToast";
import { AUTH_PROVIDER_LOGO } from "../../../constants/authProvider";

const SIDEBAR_LIST_TOP = 96;

const sidebarSections = [
  { id: "recent", label: "최근 방문 장소", icon: MapPinned },
  { id: "favorites", label: "즐겨찾기", icon: Heart },
  { id: "trips", label: "여행 일정", icon: CalendarDays },
] as const;

const PROVIDER_LABEL: Record<string, string> = {
  KAKAO: "카카오",
  GOOGLE: "구글",
  NAVER: "네이버",
};

interface MypageSidebarProps {
  selectedSection: (typeof sidebarSections)[number]["id"];
  onSelectSection: (sectionId: (typeof sidebarSections)[number]["id"]) => void;
}

export const MypageSidebar = ({
  selectedSection,
  onSelectSection,
}: MypageSidebarProps) => {
  const navigate = useNavigate();

  const logout = useLogout();
  const showToast = useToast();
  const { mutateAsync: deleteUser, isPending: isDeletingUser } =
    useDeleteUser();

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

  const handleDeleteUser = async () => {
    const confirmed = window.confirm(
      "회원 탈퇴 후에는 계정을 복구할 수 없습니다. 정말 탈퇴하시겠습니까?",
    );

    if (!confirmed) return;

    try {
      await deleteUser();
      logout();
      navigate("/");
      showToast("회원 탈퇴가 완료되었습니다.", "success");
    } catch {
      showToast("회원 탈퇴에 실패했습니다. 다시 시도해주세요.", "error");
    }
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
      {/* <SidebarListSlot
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


          <SidebarWithdrawal
            type="button"
            $active={false}
            onClick={handleDeleteUser}
            disabled={isDeletingUser}
          >
            <UserRoundX size={17} />
            <span>{isDeletingUser ? "탈퇴 처리 중..." : "회원 탈퇴"}</span>
          </SidebarWithdrawal>
        </SidebarList>
      </SidebarListSlot> */}
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

  background-color: #fcfaf5;
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

// const SidebarListSlot = styled.div<{ $height?: number }>`
//   min-height: ${({ $height }) => ($height ? `${$height}px` : "auto")};

//   @media (max-width: 980px) {
//     display: none;
//     min-height: auto;
//   }
// `;

// const SidebarList = styled.div<{
//   $pinned: boolean;
//   $left: number;
//   $width: number;
// }>`
//   position: ${({ $pinned }) => ($pinned ? "fixed" : "relative")};
//   top: ${({ $pinned }) => ($pinned ? `${SIDEBAR_LIST_TOP}px` : "auto")};
//   left: ${({ $pinned, $left }) => ($pinned ? `${$left}px` : "auto")};
//   width: ${({ $pinned, $width }) => ($pinned ? `${$width}px` : "100%")};
//   z-index: ${({ $pinned }) => ($pinned ? 10 : 1)};
//   overflow: hidden;
//   border: 1px solid rgba(36, 149, 155, 0.08);
//   border-radius: 24px;
//   background: rgba(255, 255, 255, 0.84);
//   box-shadow: 0 18px 34px rgba(35, 49, 44, 0.05);

//   @media (max-width: 980px) {
//     position: relative;
//     top: auto;
//     left: auto;
//     width: 100%;
//   }
// `;

// const SidebarButton = styled.button<{ $active: boolean }>`
//   display: flex;
//   align-items: center;
//   gap: 12px;
//   width: 100%;
//   padding: 16px 18px;
//   border: 0;
//   border-bottom: 1px solid rgba(36, 149, 155, 0.06);
//   background: ${({ $active }) =>
//     $active ? "rgba(36, 149, 155, 0.08)" : "transparent"};
//   color: ${({ $active }) => ($active ? colors.main : "#65716b")};
//   font-size: 0.95rem;
//   font-weight: 700;
//   text-align: left;
//   cursor: pointer;
// `;

// const SidebarWithdrawal = styled(SidebarButton)`
//   color: #ef6a56;
//   border-bottom: 0;

//   &:disabled {
//     cursor: not-allowed;
//     opacity: 0.6;
//   }
// `;
