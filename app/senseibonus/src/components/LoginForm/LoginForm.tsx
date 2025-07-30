import styled from '@emotion/styled';
import { useRef, useState } from 'react';
import track from '../../utils/track';
import { EventType } from '../../types/analytics';

const shakeAnimation = `
  @keyframes shake {
    0% { transform: translateX(0); }
    25% { transform: translateX(-5px); }
    50% { transform: translateX(5px); }
    75% { transform: translateX(-5px); }
    100% { transform: translateX(0); }
  }
`;

const LoginFormContainer = styled.form(() => ({
  width: '100%',
  height: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
}));

const HeaderText = styled.h1(() => ({
  color: '#646866',
  fontSize: 18,
  fontWeight: 400,
}));

const PasswordInput = styled.input<{ shake: boolean }>(({ shake }) => ({
  backgroundColor: '#030507',
  borderRadius: 10,
  borderStyle: 'none',
  height: 45,
  width: 200,
  color: '#E6F1F9',
  fontFamily: 'VCROSD-Mono',
  textAlign: 'center',
  '&:focus': {
    outline: 'none',
  },
  animation: shake ? `shake 0.5s ease-in-out` : 'none',
}));

const SubmitButton = styled.button(() => ({
  display: 'flex',
  justifyContent: 'center',
  position: 'relative',
  background: 'transparent',
  color: '#646866',
  margin: 10,
  fontWeight: 400,
  fontSize: 18,
}));

const GlobalStyle = styled.div`
  ${shakeAnimation}
`;

interface LoginFormProps {
  onUserAuthorized: VoidFunction;
}

const LoginForm: React.FC<LoginFormProps> = ({ onUserAuthorized }) => {
  const [shake, setShake] = useState(false);
  const passwordRef = useRef<HTMLInputElement>(null);
  const onListen = async () => {
    if (passwordRef.current?.value === 'basicvisualrecords') {
      onUserAuthorized();
      await track(EventType.LoginAttemptEvent, {
        success: true,
      });
    } else {
      setShake(true);
      setTimeout(() => setShake(false), 500);
      await track(EventType.LoginAttemptEvent, {
        success: false,
      });
    }
  };
  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    onListen();
  };

  return (
    <>
      <GlobalStyle />
      <LoginFormContainer onSubmit={handleSubmit}>
        <HeaderText>enter password</HeaderText>
        <PasswordInput
          ref={passwordRef}
          type="text"
          name="password"
          shake={shake}
          autoComplete="off"
        />
        <SubmitButton onClick={onListen}>listen</SubmitButton>
      </LoginFormContainer>
    </>
  );
};

export default LoginForm;
