import styled from "styled-components";
import { useState } from "react";
import { X } from "lucide-react";

interface ITripNameModalProps {
  isOpen: boolean;
  isSubmitting?: boolean;
  onClose: () => void;
  onConfirm: (tripName: string) => void;
}

const TripNameModal = ({
  isOpen,
  isSubmitting,
  onClose,
  onConfirm,
}: ITripNameModalProps) => {
  const [tripName, setTripName] = useState("");

  if (!isOpen) return null;

  const handleConfirm = () => {
    const trimmed = tripName.trim();
    if (!trimmed) return;
    onConfirm(trimmed);
  };

  return (
    <Overlay onClick={onClose}>
      <ModalBox onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <ModalTitle>여행 이름을 입력해주세요</ModalTitle>
          <CloseButton onClick={onClose}>
            <CloseIcon />
          </CloseButton>
        </ModalHeader>

        <NameInput
          type="text"
          placeholder="예: 제주도 1박2일 여행"
          value={tripName}
          onChange={(e) => setTripName(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleConfirm();
          }}
          autoFocus
        />

        <ConfirmButton
          onClick={handleConfirm}
          disabled={!tripName.trim() || isSubmitting}
        >
          {isSubmitting ? "생성 중..." : "일정 생성하기"}
        </ConfirmButton>
      </ModalBox>
    </Overlay>
  );
};

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 2000;

  display: flex;
  justify-content: center;
  align-items: center;

  background-color: rgba(27, 32, 36, 0.4);
`;

const ModalBox = styled.div`
  width: 360px;

  display: flex;
  flex-direction: column;
  gap: 16px;

  padding: 24px;

  border-radius: 20px;

  background-color: #fdfcf8;

  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ModalTitle = styled.h3`
  margin: 0;

  color: #1b2024;
  font-size: 1rem;
  font-weight: 600;
`;

const CloseButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 28px;
  height: 28px;

  outline: none;
  border: none;
  border-radius: 30px;

  background-color: transparent;

  cursor: pointer;

  &:hover {
    background-color: #f5f2eb;
  }
`;

const CloseIcon = styled(X)`
  width: 16px;
  height: 16px;
  stroke: #6c727a;
  stroke-width: 2;
`;

const NameInput = styled.input`
  height: 44px;
  width: 100%;

  box-sizing: border-box;

  padding: 0 14px;

  border: 1px solid #f5f2eb;
  border-radius: 12px;

  font-size: 0.875rem;

  outline: none;

  &:focus {
    border-color: #0c9799;
  }
`;

const ConfirmButton = styled.button`
  height: 48px;
  width: 100%;

  display: flex;
  justify-content: center;
  align-items: center;

  outline: none;
  border: none;
  border-radius: 9999px;

  background-color: #0c9799;

  color: #fffafc;
  font-size: 0.875rem;
  font-weight: 500;

  cursor: pointer;

  &:disabled {
    background-color: #c7c2b6;
    cursor: not-allowed;
  }

  &:hover:not(:disabled) {
    background-color: #0fa0a3;
  }
`;

export default TripNameModal;
