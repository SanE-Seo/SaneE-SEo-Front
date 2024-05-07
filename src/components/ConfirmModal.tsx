import React, { useState, useEffect } from 'react';
import * as M from '../styles/confirm-modal.style';
import themes from '../styles/theme';
import { useQuery } from '@tanstack/react-query';
import PropTypes from 'prop-types';

interface propsType {
  closeConfirmModal: () => void; // onClose 함수 타입으로 지정
}

function ConfirmModal({ closeConfirmModal }: propsType) {
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
          <div className="confirm-button">확인</div>
        </div>
      </M.ConfirmModal>
    </>
  );
}

ConfirmModal.propTypes = {
  closeConfirmModal: PropTypes.func.isRequired, // onClose prop의 타입을 함수로 검증
};

export default ConfirmModal;
