import React, { useEffect, useState } from 'react';
import DefaultLayout from '../components/DefaultLayout';
import * as M from '../styles/my-page.style';
import DefaultProfileImg from '../assets/image/default-profile.png';
import { ReactComponent as SettingIcon } from '../assets/icons/setting-icon.svg';

import { useQuery } from '@tanstack/react-query';
import { getUser, logoutUser } from '../apis/user';
import { useAuth } from '../contexts/AuthContext';

function MyPage() {
  const { isLoggedIn, logout } = useAuth();

  const { isLoading, data } = useQuery({
    queryKey: ['getUser'],
    queryFn: () => getUser(),
    enabled: isLoggedIn, //로그인한 상태에서만 실행
  });

  return (
    <>
      <DefaultLayout>
        <M.MyPageWrapper>
          <M.UserInfoLayout>
            <div className="user-info-container">
              <div className="user-image-container">
                {isLoggedIn && !isLoading && data ? (
                  <img
                    src={data.image == null ? DefaultProfileImg : data.image}
                    alt="profile"
                    className="profile-icon"
                  />
                ) : (
                  <img src={DefaultProfileImg}></img>
                )}
              </div>
              <div className="user-name-container">
                {isLoggedIn && !isLoading && data?.nickname
                  ? data.nickname
                  : '이름 없음'}
              </div>
              <div className="user-email-container">
                {isLoggedIn && !isLoading && data?.email
                  ? data.email
                  : 'example@gmail.com'}
              </div>
            </div>
            <M.UserInfoEditButton>
              {/* onClick={() => setIsOpenMenu(!isOpenMenu)} */}
              프로필 관리
              <SettingIcon />
            </M.UserInfoEditButton>
          </M.UserInfoLayout>
        </M.MyPageWrapper>
      </DefaultLayout>
    </>
  );
}

export default MyPage;
