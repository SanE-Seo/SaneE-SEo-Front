import React, { useState } from 'react';
import * as R from '../../styles/review-modal';
import { ReactComponent as CloseIcon } from '../../assets/icons/close-icon.svg';
import { sendReview } from '../../apis/review';
type modalProps = {
  isOpenModal: boolean;
  setIsOpenModal: (value: boolean) => void;
  title: string;
  postId: number;
};
function ReviewModal({
  isOpenModal,
  setIsOpenModal,
  title,
  postId,
}: modalProps) {
  const [reviewText, setReviewText] = useState(''); // 리뷰 텍스트 상태를 관리합니다.

  // 리뷰 텍스트의 유효성을 검사하는 함수입니다.
  const handleReviewChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setReviewText(event.target.value);
  };

  const isReviewValid = reviewText.trim().length > 0; // 리뷰 텍스트가 비어있지 않은지 확인합니다.

  const submitReview = async () => {
    const res = await sendReview(postId, reviewText);
    if (res?.success) {
      setIsOpenModal(!isOpenModal);
    }
  };
  return (
    <R.ModalBackdrop isOpen={isOpenModal}>
      <R.ModalLayout>
        <button className="close-button">
          <CloseIcon onClick={() => setIsOpenModal(!isOpenModal)} />
        </button>
        <R.ContentBox>
          <span className="trail-name">
            {title}
            <span className="text-sm"> 어떠셨나요?</span>
          </span>
          <span className="caption">
            좋았던 점, 아쉬웠던 점 모두 들려주세요.
          </span>

          <R.StyledTextArea
            id="description"
            placeholder="리뷰를 작성해주세요."
            onChange={handleReviewChange} // 사용자의 입력을 처리합니다.
            value={reviewText} // 텍스트 입력 상태를 바인딩합니다.
          ></R.StyledTextArea>
          <R.SubmitButton
            disabled={!isReviewValid} // isReviewValid 값에 따라 버튼의 disabled 상태를 결정합니다.
            button_color={isReviewValid ? '#F9C758' : '#B8B8B8'} // isReviewValid 값에 따라 버튼 색상을 변경합니다.
            onClick={submitReview}
          >
            작성완료
          </R.SubmitButton>
        </R.ContentBox>
      </R.ModalLayout>
    </R.ModalBackdrop>
  );
}

export default ReviewModal;
