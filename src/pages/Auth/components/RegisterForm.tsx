import { IdCard, Lock, Mail, ShieldCheck, User } from "lucide-react";
import styled from "styled-components";

const RegisterForm = () => {
  return (
    <RegisterFormContainer>
      <SubmitLabel>
        이메일<span>*</span>
      </SubmitLabel>
      <SubmitBox>
        <MailIcon />
        <SubmitInput placeholder="example@email.com" />
      </SubmitBox>
      <SubmitLabel>
        비밀번호<span>*</span>
      </SubmitLabel>
      <SubmitBox>
        <LockIcon />
        <SubmitInput placeholder="8자 이상 입력하세요" />
      </SubmitBox>
      <SubmitLabel>
        비밀번호 확인<span>*</span>
      </SubmitLabel>
      <SubmitBox>
        <ShieldCheckIcon />
        <SubmitInput placeholder="비밀번호를 다시 입력하세요" />
      </SubmitBox>
      <SubmitLabel>
        이름<span>*</span>
      </SubmitLabel>
      <SubmitBox>
        <UserIcon />
        <SubmitInput placeholder="실명을 입력하세요" />
      </SubmitBox>
      <SubmitLabel>
        닉네임<span>*</span>
      </SubmitLabel>
      <SubmitBox>
        <IdCardIcon />
        <SubmitInput placeholder="사용할 닉네임을 입력하세요" />
      </SubmitBox>

      <AgreementBox>
        <Checkbox />
        <CheckboxLabel>
          <strong>[필수]</strong> 이용약관에 동의합니다
        </CheckboxLabel>
        <ViewLink>보기</ViewLink>
      </AgreementBox>
      <AgreementBox>
        <Checkbox />
        <CheckboxLabel>
          <strong>[필수]</strong> 개인정보 수집 및 이용에 동의합니다
        </CheckboxLabel>
        <ViewLink>보기</ViewLink>
      </AgreementBox>

      <SubmitButton>회원가입</SubmitButton>
    </RegisterFormContainer>
  );
};

const SubmitLabel = styled.label`
  margin: 0 0 6px;
  color: #2e3339;
  font-size: 0.878rem;

  span {
    color: #f77036;
  }
`;
const SubmitButton = styled.button`
  width: 100%;
  height: 48px;

  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;

  margin: 0 0 24px;
  padding: 0 16px;

  background-color: #0c9799;

  outline: none;
  border: none;
  border-radius: 14px;

  color: #fffafc;
  font-size: 0.875rem;
  font-weight: 500;

  cursor: pointer;

  transition: 0.2s all ease;

  &:hover {
    background-color: #0a8082;
  }
`;
const SubmitBox = styled.div`
  width: 100%;
  height: 48px;

  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;

  margin: 0 0 18px;
  padding: 0 16px;

  background-color: #fdfcf8;
  border: 1px solid #f2eee6b3;
  border-radius: 14px;
`;
const SubmitInput = styled.input`
  width: 100%;
  height: 100%;

  border: none;
  outline: none;

  background-color: transparent;
`;
const MailIcon = styled(Mail)`
  width: 16px;
  height: 16px;
  stroke: #6c727a;
  stroke-width: 2;
`;
const LockIcon = styled(Lock)`
  width: 16px;
  height: 16px;
  stroke: #6c727a;
  stroke-width: 2;
`;
const Checkbox = styled.input.attrs({ type: "checkbox" })`
  width: 16px;
  height: 16px;

  margin: 0;

  cursor: pointer;
`;
const CheckboxLabel = styled.span`
  color: #474e55;
  font-size: 0.875rem;
  font-weight: 300;
`;

const RegisterFormContainer = styled.form`
  max-width: 420px;
  width: 100%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
`;
const ShieldCheckIcon = styled(ShieldCheck)`
  width: 16px;
  height: 16px;
  stroke: #6c727a;
  stroke-width: 2;
`;
const UserIcon = styled(User)`
  width: 16px;
  height: 16px;
  stroke: #6c727a;
  stroke-width: 2;
`;
const IdCardIcon = styled(IdCard)`
  width: 16px;
  height: 16px;
  stroke: #6c727a;
  stroke-width: 2;
`;
const AgreementBox = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  margin: 0 0 16px;
`;
const ViewLink = styled.button`
  padding: 0;
  background-color: transparent;

  outline: none;
  border: none;

  color: #097575;
  font-size: 0.875rem;

  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

export default RegisterForm;
