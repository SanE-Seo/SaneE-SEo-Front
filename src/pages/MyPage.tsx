import React, { useState } from 'react';
import DefaultLayout from '../components/DefaultLayout';
import UserActivity from '../components/Mypage/UserActivity';
import * as M from '../styles/my-page.style';
import DefaultProfileImg from '../assets/image/default-profile.png';
import { ReactComponent as SettingIcon } from '../assets/icons/setting-icon.svg';
import ProfileEditModal from '../components/Mypage/ProfileEditModal';

import { useQuery } from '@tanstack/react-query';
import { getUser } from '../apis/user';
import { useRecoilState } from 'recoil';
import { isLoggedInState } from '../contexts/UserState';

function MyPage() {
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(isLoggedInState);
  const [profileEditIsOpen, setProfileEditIsOpen] = useState<boolean>(false);
  const { isLoading, data } = useQuery({
    queryKey: ['getUser'],
    queryFn: () => getUser(),
    enabled: isLoggedIn, //로그인한 상태에서만 실행
  });

  const openProfileEditModal = () => {
    setProfileEditIsOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeProfileEditModal = async () => {
    setProfileEditIsOpen(false);
    document.body.style.overflow = 'unset';
  };

  return (
    <>
      <DefaultLayout>
        {/* <div
          style={{
            backgroundColor: themes.colors.background,
            display: flex,
            alignItems: center,
          }}
        > */}
        <M.MyPageBackground>
          <M.MyPageWrapper>
            <M.UserInfoLayout>
              <div className="user-info-container">
                <div className="user-image-container">
                  {isLoggedIn && !isLoading && data ? (
                    <img
                      src={
                        data.profile == null ? DefaultProfileImg : data.profile
                      }
                      alt="profile"
                      className="profile-icon"
                    />
                  ) : (
                    <img src={DefaultProfileImg}></img>
                  )}
                </div>
                <div className="user-nickname-container">
                  {isLoggedIn && !isLoading && data?.name
                    ? data.name
                    : '이름 없음'}
                </div>
                <div className="user-email-container">
                  {isLoggedIn && !isLoading && data?.email
                    ? data.email
                    : 'example@gmail.com'}
                </div>
              </div>
              <M.UserInfoEditButton onClick={() => openProfileEditModal()}>
                프로필 관리
                <SettingIcon />
              </M.UserInfoEditButton>
            </M.UserInfoLayout>

            <UserActivity></UserActivity>
          </M.MyPageWrapper>
        </M.MyPageBackground>
        {/* </div> */}
      </DefaultLayout>
      {profileEditIsOpen && (
        <ProfileEditModal
          closeProfileEditModal={() => closeProfileEditModal()}
        />
      )}
    </>
  );
}

export default MyPage;
