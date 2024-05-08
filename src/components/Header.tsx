import React, { useEffect, useState } from 'react';
import * as H from '../styles/header.style';
import { ReactComponent as Logo } from '../assets/icons/logo.svg';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getUser, logoutUser } from '../apis/user';
import DefaultProfileImg from '../assets/image/default-profile.png';
import { ReactComponent as MenuIcon } from '../assets/icons/menu-icon.svg';
import { Cookies } from 'react-cookie';
import { useRecoilState } from 'recoil';
import { isLoggedInState, memberIdState } from '../contexts/UserState';
function Header() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(isLoggedInState);
  const [memberId, setMemberId] = useRecoilState(memberIdState);

  const { isLoading, data } = useQuery({
    queryKey: ['getUser'],
    queryFn: () => getUser(),
    enabled: isLoggedIn, //로그인한 상태에서만 실행
  });

  const [isOpenMenu, setIsOpenMenu] = useState<boolean>(false);
  const cookie = new Cookies();

  useEffect(() => {
    if (data) {
      setMemberId(data?.name);
    }
  }, [data]);

  const handleLogout = async () => {
    const res = await logoutUser();

    if (res?.success) {
      setIsLoggedIn(false);
      cookie.remove('refreshToken');
      window.location.href = '/';
    }
  };
  return (
    <>
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
          {isLoggedIn && !isLoading && data ? (
            <div className="menu-box">
              <img
                src={data.profile == null ? DefaultProfileImg : data.profile}
                alt="profile"
                className="profile-icon"
              />
              <button onClick={() => setIsOpenMenu(!isOpenMenu)}>
                <MenuIcon />
              </button>
            </div>
          ) : (
            <button
              className="login-button"
              onClick={() => {
                navigate('/login');
              }}
            >
              로그인
            </button>
          )}
        </H.HeaderLayout>
      </H.HeaderWrapper>
      {isOpenMenu && (
        <div
          style={{
            width: '1100px',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-end',
            margin: 'auto',
          }}
        >
          <H.MenuBox>
            <span
              onClick={() => {
                navigate('/mypage');
              }}
              className="menu-text"
            >
              마이페이지
            </span>
            <span className="menu-text" onClick={handleLogout}>
              로그아웃
            </span>
          </H.MenuBox>
        </div>
      )}
    </>
  );
}

export default Header;
