import { Mail, Send, ShieldCheck, UserRound, X } from "lucide-react";
import { useState } from "react";
import { createPortal } from "react-dom";
import styled from "styled-components";
import colors from "../../constants/colors";

interface FindPasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const FindPasswordModal = ({ isOpen, onClose }: FindPasswordModalProps) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  if (!isOpen) return null;

  return createPortal(
    <Overlay onClick={onClose}>
      <Dialog onClick={(e) => e.stopPropagation()}>
        <CloseButton type="button" onClick={onClose} aria-label="모달 닫기">
          <CloseIcon />
        </CloseButton>

        <Badge>
          <BadgeIcon />
          비밀번호 찾기
        </Badge>

        <FormArea>
          <FieldGroup>
            <FieldLabel>이메일</FieldLabel>
            <FieldBox>
              <FieldIcon as={Mail} />
              <FieldInput
                type="email"
                placeholder="example@soksom.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FieldBox>
          </FieldGroup>

          <FieldGroup>
            <FieldLabel>이름</FieldLabel>
            <FieldBox>
              <FieldIcon as={UserRound} />
              <FieldInput
                type="text"
                placeholder="이름을 입력해주세요."
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </FieldBox>
          </FieldGroup>

          <NoticeCard>
            <NoticeHeader>
              <NoticeIcon />
              발송 안내
            </NoticeHeader>
            <NoticeText>
              정보가 일치하면 등록된 이메일로 임시 비밀번호가 전송됩니다.
            </NoticeText>
          </NoticeCard>

          <ButtonRow>
            <SecondaryButton type="button" onClick={onClose}>
              취소
            </SecondaryButton>
            <PrimaryButton type="button">
              <SendIcon />
              임시 비밀번호 받기
            </PrimaryButton>
          </ButtonRow>
        </FormArea>
      </Dialog>
    </Overlay>,
    document.body,
  );
};

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 999;

  display: flex;
  justify-content: center;
  align-items: center;

  padding: 24px;

  background: rgba(16, 23, 20, 0.56);
  backdrop-filter: blur(8px);
`;

const Dialog = styled.div`
  position: relative;

  width: min(100%, 480px);
  padding: 24px;

  border: 1px solid rgba(226, 232, 240, 0.9);
  border-radius: 28px;
  background:
    radial-gradient(
      circle at top right,
      rgba(36, 149, 155, 0.12),
      transparent 34%
    ),
    linear-gradient(180deg, #ffffff 0%, #f9fbfb 100%);
  box-shadow: 0 24px 70px rgba(15, 23, 42, 0.2);

  @media (max-width: 640px) {
    padding: 24px;
    border-radius: 22px;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 18px;
  right: 18px;

  width: 36px;
  height: 36px;

  display: flex;
  justify-content: center;
  align-items: center;

  border: none;
  border-radius: 999px;
  background: #f3f6f7;

  cursor: pointer;
`;

const CloseIcon = styled(X)`
  width: 18px;
  height: 18px;
  stroke: #475569;
`;

const Badge = styled.div`
  width: fit-content;

  display: inline-flex;
  align-items: center;
  gap: 8px;

  margin: 0 0 16px;
  padding: 8px 12px;

  border-radius: 999px;
  background: rgba(36, 149, 155, 0.1);

  color: #11767b;
  font-size: 0.813rem;
  font-weight: 600;
`;

const BadgeIcon = styled(ShieldCheck)`
  width: 16px;
  height: 16px;
  stroke-width: 2;
`;

const FormArea = styled.div`
  display: flex;
  flex-direction: column;
  gap: 18px;
`;

const FieldGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const FieldLabel = styled.label`
  color: #25313b;
  font-size: 0.875rem;
`;

const FieldBox = styled.div`
  width: 100%;
  height: 54px;

  display: flex;
  align-items: center;
  gap: 12px;

  padding: 0 16px;

  border: 1px solid #e6edf0;
  border-radius: 16px;
  background: #fcfdfd;
`;

const FieldIcon = styled(Mail)`
  width: 18px;
  height: 18px;
  stroke: #6b7280;
  stroke-width: 2;
`;

const FieldInput = styled.input`
  width: 100%;
  height: 100%;

  border: none;
  outline: none;
  background: transparent;

  color: #111827;
  font-size: 0.938rem;

  &::placeholder {
    color: #9aa3af;
  }
`;

const NoticeCard = styled.div`
  padding: 16px 18px;

  border: 1px solid #dceff0;
  border-radius: 18px;
  background: linear-gradient(180deg, #f4fbfb 0%, #f9fdfd 100%);
`;

const NoticeHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  margin: 0 0 8px;

  color: #11767b;
  font-size: 0.875rem;
  font-weight: 700;
`;

const NoticeIcon = styled(Mail)`
  width: 16px;
  height: 16px;
  stroke-width: 2;
`;

const NoticeText = styled.p`
  margin: 0;

  color: #51606c;
  font-size: 0.875rem;
  line-height: 1.6;
`;

const ButtonRow = styled.div`
  display: flex;
  gap: 12px;

  @media (max-width: 640px) {
    flex-direction: column-reverse;
  }
`;

const SecondaryButton = styled.button`
  flex: 1;
  height: 52px;

  border: 1px solid #d6dde1;
  border-radius: 14px;
  background: #ffffff;

  color: #334155;
  font-size: 0.938rem;
  font-weight: 600;

  cursor: pointer;
`;

const PrimaryButton = styled.button`
  flex: 1;
  height: 52px;

  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;

  border: none;
  border-radius: 14px;
  background: ${colors.main};

  color: #ffffff;
  font-size: 0.938rem;
  font-weight: 700;

  cursor: pointer;
  box-shadow: 0 14px 30px rgba(36, 149, 155, 0.24);
`;

const SendIcon = styled(Send)`
  width: 16px;
  height: 16px;
  stroke-width: 2.2;
`;

export default FindPasswordModal;
