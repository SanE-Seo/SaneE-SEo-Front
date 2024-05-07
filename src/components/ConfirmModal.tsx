import React, { useState, useEffect } from 'react';
import * as M from '../styles/confirm-modal.style';
import themes from '../styles/theme';
import { useMutation, useQuery } from '@tanstack/react-query';
import PropTypes from 'prop-types';
import { deletePost } from '../apis/post';
import { useAuth } from '../contexts/AuthContext';

interface propsType {
  closeConfirmModal: () => void; // onClose 함수 타입으로 지정
  postId: string;
}

function ConfirmModal({ closeConfirmModal, postId }: propsType) {
  const { isLoggedIn } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDeletePost = async () => {
    if (!isLoggedIn) {
      alert('You must be logged in to delete a post.');
      return;
    }
    setIsLoading(true);
    try {
      await deletePost(postId);
      closeConfirmModal(); // Assume you might want to close modal upon success as well
    } catch (error: any) {
      console.error('Error when deleting post:', error);
      setError('Failed to delete post.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <M.ModalBackground />
      <M.ConfirmModal>
        <div
          className="header-wrapper"
          style={{
            color: 'white',
            backgroundColor: themes.colors.red500,
          }}
        >
          경고
        </div>
        <div className="main-wrapper">이 게시물을 삭제하시겠습니까?</div>
        <div className="buttons-container">
          <div
            className="cancel-button"
            onClick={() => {
              closeConfirmModal();
            }}
          >
            취소
          </div>
          <div className="vertical-line"></div>
          <div className="confirm-button" onClick={() => handleDeletePost()}>
            확인
          </div>
        </div>
      </M.ConfirmModal>
    </>
  );
}

ConfirmModal.propTypes = {
  closeConfirmModal: PropTypes.func.isRequired, // onClose prop의 타입을 함수로 검증
  postId: PropTypes.string.isRequired,
};

export default ConfirmModal;
