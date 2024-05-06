import React, { useState, useEffect } from 'react';
import * as P from '../../styles/profile-edit-modal.style';
import { ReactComponent as CloseIcon } from '../../assets/icons/close-icon.svg';
import DefaultProfileImg from '../../assets/image/default-profile.png';
import { useQuery } from '@tanstack/react-query';
import {
  getUser,
  updateUserProfile,
  checkNicknameDuplicate,
} from '../../apis/user';
import { useAuth } from '../../contexts/AuthContext';
import { nicknameRegex, emailRegex } from '../../utils/regex';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

interface propsType {
  closeProfileEditModal: () => void; // onClose 함수 타입으로 지정
}

function ProfileEditModal({ closeProfileEditModal }: propsType) {
  const navigate = useNavigate();
  const { isLoggedIn, logout } = useAuth();
  const { isLoading, data } = useQuery({
    queryKey: ['getUser'],
    queryFn: () => getUser(),
    enabled: isLoggedIn, //로그인한 상태에서만 실행
  });

  const [inputNickName, setInputNickName] = useState(
    isLoggedIn && !isLoading && data && data.name ? data.name : '이름없음',
  );
  const [nickNameAlertText, setNickNameAlertText] = useState('');
  const [inputEmail, setInputEmail] = useState(
    isLoggedIn && !isLoading && data && data.email ? data.email : '이메일없음',
  );
  const [emailAlertText, setEmailAlertText] = useState('');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
      setSelectedFile(file);
      console.log('File selected:', imageUrl);
    }
  };

  const handleCheckDuplicate = async (nickname: string) => {
    const res = await checkNicknameDuplicate(nickname);
    if (res?.status == 200) {
      return false;
    } else {
      return true;
    }
  };

  const isValidNickname = (nickname: string) => {
    if (nickname.length < 2 || nickname.length > 10) {
      return false;
    }
    return nicknameRegex.test(nickname);
  };

  const handleNicknameAlertText = async (nickname: string) => {
    if (isValidNickname(nickname) === false) {
      setNickNameAlertText('닉네임은 2~10자의 한글/영어/숫자만 가능해요.');
      return;
    }

    if ((await handleCheckDuplicate(nickname)) === false) {
      setNickNameAlertText('사용 가능한 별명이에요.');
    } else {
      setNickNameAlertText('이미 존재하는 별명이에요.');
    }
  };

  const handleEmailChange = (email: string) => {
    setInputEmail(email);
    if (emailRegex.test(email)) {
      setEmailAlertText('올바른 이메일 형식이에요.');
    } else {
      setEmailAlertText('올바르지 않은 이메일 형식이에요.');
    }
  };

  const handleUpdateProfile = async () => {
    // Check if nickname and email conditions are met
    if (
      nickNameAlertText === '사용 가능한 별명이에요.' &&
      emailAlertText !== '올바르지 않은 이메일 형식이에요.'
    ) {
      const updateResult = await updateUserProfile(
        inputNickName,
        inputEmail,
        selectedFile,
      );
      if (updateResult && updateResult.success) {
        alert('정보 수정 완료');
        closeProfileEditModal();
      } else {
        alert('정보 수정 실패');
      }
    } else {
      if (nickNameAlertText !== '사용 가능한 별명이에요.') {
        alert('별명을 확인해주세요.');
      } else if (emailAlertText === '올바르지 않은 이메일 형식이에요.') {
        alert('이메일 형식을 확인해주세요.');
      }
    }
  };

  return (
    <>
      <P.ModalBackground />
      <P.ProfileEditModal>
        <div className="header-container">
          <P.CloseButton
            onClick={() => {
              closeProfileEditModal();
              setSelectedImage(null);
            }}
          >
            <CloseIcon />
          </P.CloseButton>
        </div>
        <div className="user-info-container">
          <div className="edit-image-container">
            {selectedImage ? (
              <img src={selectedImage} alt="profile" className="profile-icon" />
            ) : (
              <img
                src={
                  isLoggedIn && !isLoading && data && data.profile
                    ? data.profile
                    : DefaultProfileImg
                }
                alt="profile"
                className="profile-icon"
              />
            )}
            <P.ImageEditButton>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                style={{ display: 'none' }}
                id="file-input"
              />
              <label htmlFor="file-input">프로필 사진 수정</label>
            </P.ImageEditButton>
          </div>
          <div className="edit-nickname-container">
            닉네임 수정
            <div className="input-container">
              <P.EditNicknameInput
                value={inputNickName}
                onChange={(e) => setInputNickName(e.target.value)}
              />
              <P.CheckDuplicateButton
                onClick={() => handleNicknameAlertText(inputNickName)}
              >
                중복 확인
              </P.CheckDuplicateButton>
            </div>
            <div className={`alert-text ${nickNameAlertText ? 'show' : ''}`}>
              {nickNameAlertText}
            </div>
          </div>
          <div className="edit-email-container">
            이메일 수정
            <div className="input-container">
              <P.EditEmailInput
                value={inputEmail}
                onChange={(e) => handleEmailChange(e.target.value)}
              />
            </div>
            <div className={`alert-text ${emailAlertText ? 'show' : ''}`}>
              {emailAlertText}
            </div>
          </div>
          <P.CompleteButton
            onClick={() => {
              handleUpdateProfile();
            }}
          >
            수정 완료
          </P.CompleteButton>
        </div>
      </P.ProfileEditModal>
    </>
  );
}

ProfileEditModal.propTypes = {
  closeProfileEditModal: PropTypes.func.isRequired, // onClose prop의 타입을 함수로 검증
};

export default ProfileEditModal;
