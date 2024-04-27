import React from 'react';
import styled from 'styled-components';
import DefaultProfileImg from '../../assets/image/default-profile.png';
function Review() {
  return (
    <ReviewLayout>
      <AddReviewButton>리뷰 작성하기</AddReviewButton>
      <ReviewItem>
        <div className="profile-rating-box">
          <img src={DefaultProfileImg} className="profile-img" alt="profile" />
          <span className="name">응자</span>
        </div>
        <span className="review-text">가볍게 산책하기 좋아요</span>
        <span className="review-text">2024.04.17</span>
      </ReviewItem>
      <ReviewItem>
        <div className="profile-rating-box">
          <img src={DefaultProfileImg} className="profile-img" alt="profile" />
          <span className="name">응자</span>
        </div>
        <span className="review-text">가볍게 산책하기 좋아요</span>
        <span className="review-text">2024.04.17</span>
      </ReviewItem>
    </ReviewLayout>
  );
}

export default Review;
const ReviewLayout = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 15px 20px;
  cursor: default;
`;

const AddReviewButton = styled.button`
  width: 300px;
  height: 40px;

  background: #f9c758;
  border-radius: 10px;
  ${(props) => props.theme.fonts.text_md};
  color: #ffffff;
`;

const ReviewItem = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;

  .profile-rating-box {
    display: flex;
    flex-direction: row;
    align-items: center;

    .profile-img {
      width: 26px;
      height: 26px;
      border-radius: 50%;
    }

    .name {
      ${(props) => props.theme.fonts.text_sm};
      color: ${(props) => props.theme.colors.gray600};
      margin-left: 6px;
    }
  }
  .review-text {
    margin-top: 5px;
    ${(props) => props.theme.fonts.text_sm};
    color: ${(props) => props.theme.colors.gray400};
  }
`;
