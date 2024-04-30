import React from 'react';
import styled from 'styled-components';
import { ReactComponent as CloseIcon } from '../../assets/icons/close-icon.svg';
type modalProps = {
  isOpenModal: boolean;
  setIsOpenModal: (value: boolean) => void;
};
function ReviewModal({ isOpenModal, setIsOpenModal }: modalProps) {
  return (
    <ModalBackdrop isOpen={isOpenModal}>
      <ModalLayout>
        <button className="close-button">
          <CloseIcon />
        </button>
        <ContentBox>
          <span className="trail-name">
            노원구 최애 산책길 <span className="text-sm">어떠셨나요?</span>
          </span>
          <span className="caption">
            좋았던 점, 아쉬웠던 점 모두 들려주세요.
          </span>
        </ContentBox>
      </ModalLayout>
    </ModalBackdrop>
  );
}

export default ReviewModal;

type styleProps = {
  isOpen: boolean;
};
const ModalBackdrop = styled.div<styleProps>`
  display: ${(props) => (props.isOpen ? 'flex' : 'none')};
  position: absolute;
  top: -140px;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;
const ModalLayout = styled.div`
  position: relative;
  width: 400px;
  height: 400px;
  margin: auto;

  background: #ffffff;

  border: 1px solid #b8b8b8;
  border-radius: 20px;

  .close-button {
    margin-left: 355px;
    margin-top: 25px;
  }
`;
const ContentBox = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px 50px;

  .trail-name {
    ${(props) => props.theme.fonts.title_md};
    color: ${(props) => props.theme.colors.deepBrown};
  }
  .text-sm {
    ${(props) => props.theme.fonts.text_md};
    color: ${(props) => props.theme.colors.gray700};
  }
  .caption {
    margin-top: 10px;
    ${(props) => props.theme.fonts.text_sm};
    color: ${(props) => props.theme.colors.gray500};
  }
`;
