import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useDeleteUser, useLogout } from "../../../hooks/auth/useAuth";
import { useToast } from "../../../hooks/common/useToast";

export const WithdrawalFooter = () => {
  const navigate = useNavigate();
  const logout = useLogout();
  const showToast = useToast();
  const { mutateAsync: deleteUser, isPending: isDeletingUser } =
    useDeleteUser();

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

  return (
    <SidebarList>
      <SidebarWithdrawal
        type="button"
        onClick={handleDeleteUser}
        disabled={isDeletingUser}
      >
        <span>{isDeletingUser ? "탈퇴 처리 중..." : "회원 탈퇴"}</span>
      </SidebarWithdrawal>
    </SidebarList>
  );
};

const SidebarList = styled.footer`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 4px 10px;
  margin: 64px 0 0 0;
  padding-top: 32px;
  border-top: 1px solid #e4ddcf;

  p {
    margin: 0;
    color: #8f887c;
    font-size: 0.8125rem;
  }

  @media (max-width: 640px) {
    flex-direction: column;
    gap: 2px;
    margin: 32px 18px 0;
    padding-top: 20px;
  }
`;

const SidebarWithdrawal = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  min-height: 44px;
  padding: 0 4px;
  border: 0;
  background: none;
  color: #a8a296;
  font: inherit;
  font-size: 0.8125rem;
  cursor: pointer;
  transition: color 0.15s ease;

  span {
    text-decoration: underline;
    text-underline-offset: 3px;
  }

  &:hover {
    color: #ef6a56;
  }

  &:focus-visible {
    outline: 2px solid #ef6a56;
    outline-offset: 2px;
    border-radius: 4px;
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }
`;
