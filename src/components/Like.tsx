import React, { useEffect, useState } from 'react';
import * as S from '../styles/seoultrails-detail.style';
import HeartEmptyIcon from '../assets/icons/heart-empty-icon';
import HeartFilledIcon from '../assets/icons/heart-filled-icon';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { addLikes, checkLikes, deleteLikes } from '../apis/like';
import styled from 'styled-components';
type likeProps = {
  postId: string;
  likeStatus: boolean;
  setLikeStatus: (value: boolean) => void;
};

function Like({ postId, likeStatus, setLikeStatus }: likeProps) {
  const navigate = useNavigate();

  const { isLoggedIn } = useAuth();

  useEffect(() => {
    if (isLoggedIn) {
      fetchLikeStatus();
    }
  }, [isLoggedIn]);

  const handleLike = async () => {
    if (isLoggedIn) {
      if (likeStatus == true) {
        const res = await deleteLikes(postId);
        if (res?.success) setLikeStatus(!likeStatus);
      } else {
        const res = await addLikes(postId);
        if (res?.success) setLikeStatus(!likeStatus);
      }
    } else {
      alert('로그인이 필요합니다.');
      navigate('/login');
    }
  };

  async function fetchLikeStatus() {
    try {
      const res = await checkLikes(postId);
      if (res) {
        console.log(res.isLiked);
        setLikeStatus(res.isLiked);
      }
    } catch (error) {
      console.error('좋아요 상태정보를 가져오는데 실패했습니다.', error);
    }
    // 사용자 위치 정보가 유효한 경우에만 fetchDistrict 함수 호출
  }
  return (
    <Container>
      <button onClick={handleLike}>
        {likeStatus ? (
          <HeartFilledIcon width={24} height={24} />
        ) : (
          <HeartEmptyIcon width={22} height={19} />
        )}
      </button>
    </Container>
  );
}

export default Like;
const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-right: 10px;
  padding: 10px;
  box-sizing: border-box;

  height: 45px;

  border: 1px solid #b8b8b8;
  border-radius: 10px;
`;
