import { useEffect } from "react";
import { CheckCircle2, XCircle, Info, X } from "lucide-react";
import styled, { keyframes } from "styled-components";
import {
  useToastStore,
  type ToastType,
} from "../../stores/common/useToastStore";

const ICONS: Record<ToastType, typeof CheckCircle2> = {
  success: CheckCircle2,
  error: XCircle,
  info: Info,
};

const COLORS: Record<ToastType, { bg: string; border: string; icon: string }> =
  {
    success: { bg: "#e5faf8", border: "#b2e8e5", icon: "#0c9799" },
    error: { bg: "#fdeceb", border: "#f3c4bf", icon: "#e0553f" },
    info: { bg: "#fdfcf8", border: "#edebe5", icon: "#7b827d" },
  };

const AUTO_DISMISS_MS = 3000;

const ToastItem = ({
  id,
  message,
  type,
}: {
  id: number;
  message: string;
  type: ToastType;
}) => {
  const removeToast = useToastStore((state) => state.removeToast);
  const Icon = ICONS[type];
  const color = COLORS[type];

  useEffect(() => {
    const timer = setTimeout(() => removeToast(id), AUTO_DISMISS_MS);
    return () => clearTimeout(timer);
  }, [id, removeToast]);

  return (
    <ToastCard $bg={color.bg} $border={color.border}>
      <IconWrapper style={{ color: color.icon }}>
        <Icon size={18} />
      </IconWrapper>
      <Message>{message}</Message>
      <CloseButton type="button" onClick={() => removeToast(id)}>
        <X size={14} />
      </CloseButton>
    </ToastCard>
  );
};

const Toast = () => {
  const toasts = useToastStore((state) => state.toasts);

  console.log("🔔 Toast 렌더링, toasts:", toasts);

  if (toasts.length === 0) return null;

  return (
    <Wrapper>
      {toasts.map((toast) => (
        <ToastItem key={toast.id} {...toast} />
      ))}
    </Wrapper>
  );
};

export default Toast;

const Wrapper = styled.div`
  position: fixed;
  bottom: 24px;
  left: 50%;
  transform: translateX(-50%);

  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: center;

  z-index: 1000;

  @media (max-width: 768px) {
    bottom: 16px;
    width: calc(100% - 32px);
  }
`;

const slideUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const ToastCard = styled.div<{ $bg: string; $border: string }>`
  display: flex;
  align-items: center;
  gap: 10px;

  min-width: 280px;
  max-width: 420px;
  padding: 12px 14px;

  border: 1px solid ${({ $border }) => $border};
  border-radius: 14px;
  background: ${({ $bg }) => $bg};
  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.1);

  animation: ${slideUp} 0.2s ease;

  @media (max-width: 768px) {
    min-width: 0;
    width: 100%;
  }
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-shrink: 0;
`;

const Message = styled.p`
  flex: 1;
  margin: 0;

  color: #101714;
  font-size: 0.875rem;
  font-weight: 600;
  word-break: keep-all;
`;

const CloseButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;

  width: 20px;
  height: 20px;

  border: none;
  border-radius: 50%;
  background: transparent;

  color: #a8a196;
  cursor: pointer;

  &:hover {
    background: rgba(0, 0, 0, 0.05);
  }
`;
