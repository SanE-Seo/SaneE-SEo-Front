import React from 'react';
import { ReactComponent as KakaoIcon } from '../../assets/icons/kakao-icon.svg';
import styled from 'styled-components';

function KakaoLogin() {
  const handleKaKaoLogin = () => {
    window.location.href = `https://kauth.kakao.com/oauth/authorize?redirect_uri=http://localhost:3000/redirect&&response_type=code&&client_id=7126e3761e4f77dba781a4ddf981d5ef`;
  };
  return (
    <ButtonContainer onClick={handleKaKaoLogin}>
      <KakaoIcon />
      <span className="button-text">카카오계정으로 로그인</span>
    </ButtonContainer>
  );
}

export default KakaoLogin;

const ButtonContainer = styled.div`
  width: 290px;
  height: 40px;
  border: 1px solid #fbe139;
  background: #fbe139;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  .button-text {
    color: #553f1e;
    ${(props) => props.theme.fonts.text_sm};
    margin-left: 9px;
  }
`;
