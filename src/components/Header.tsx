import React from 'react';
import * as H from '../styles/header.style';
import { ReactComponent as Logo } from '../assets/icons/logo.svg';
import { useNavigate } from 'react-router-dom';
function Header() {
  const navigate = useNavigate();

  return (
    <H.HeaderWrapper>
      <H.HeaderLayout>
        <Logo />
        <div
          className="logo-container"
          onClick={() => {
            navigate('/');
          }}
        >
          <H.LogoText color="#94C020">산책</H.LogoText>
          <H.LogoText color="#F9C758">이음</H.LogoText>
          <H.LogoText color="#645023">서울</H.LogoText>
        </div>
        <span
          className="menu-text"
          onClick={() => {
            navigate('/seoul-trails');
          }}
        >
          서울 두드림길
        </span>
        <span
          className="menu-text"
          onClick={() => {
            navigate('/community');
          }}
        >
          걸음나눔터
        </span>
        <button
          className="login-button"
          onClick={() => {
            navigate('/login');
          }}
        >
          로그인
        </button>
      </H.HeaderLayout>
    </H.HeaderWrapper>
  );
}

export default Header;
