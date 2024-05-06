import React, { useState } from 'react';
import styled from 'styled-components';
import DefaultProfileImg from '../../assets/image/default-profile.png';
import ReviewModal from './ReviewModal';
import { PostData } from '../../@types/post';
import { getReviews } from '../../apis/review';
import { useQuery } from '@tanstack/react-query';
import Spinner from '../Spinner';
import { CiMenuKebab } from 'react-icons/ci';
type ReviewProps = {
  detail: PostData;
};
function Review({ detail }: ReviewProps) {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);

  const { isLoading, isSuccess, data } = useQuery({
    queryKey: ['getReview'],
    queryFn: () => getReviews(detail.id),
  });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);

    const year = date.getFullYear();
    // getMonth()는 0부터 시작하기 때문에 1을 더해줍니다.
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);

    return `${year}.${month}.${day}`;
  };

  return (
    <>
      <ReviewLayout>
        <AddReviewButton onClick={() => setIsOpenModal(!isOpenModal)}>
          리뷰 작성하기
        </AddReviewButton>
        <ReviewBox>
          {isSuccess && data ? (
            data.length > 0 ? (
              data.map((item, index) => (
                <ReviewItem key={index}>
                  <div className="profile-rating-box">
                    <div className="profile-rating-box">
                      <img
                        src={DefaultProfileImg}
                        className="profile-img"
                        alt="profile"
                      />
                      <span className="name">{item.authorName}</span>
                    </div>
                    <CiMenuKebab className="icon-style" />
                  </div>
                  <span className="review-text">{item.content}</span>
                  <span className="review-date">
                    {formatDate(item.createAt)}
                  </span>{' '}
                </ReviewItem>
              ))
            ) : (
              <span className="no-review">아직 작성된 리뷰가 없습니다.</span>
            )
          ) : (
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center', // 중앙 정렬을 위해 추가
              }}
            >
              <Spinner />
            </div>
          )}
        </ReviewBox>
      </ReviewLayout>
      {isOpenModal && (
        <ReviewModal
          isOpenModal={isOpenModal}
          setIsOpenModal={setIsOpenModal}
          title={detail.title}
          postId={detail.id}
        />
      )}
    </>
  );
}

export default Review;
const ReviewLayout = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 15px 20px;
  cursor: default;
  align-items: center;
`;

const AddReviewButton = styled.button`
  width: 300px;
  height: 40px;

  background: #f9c758;
  border-radius: 10px;
  ${(props) => props.theme.fonts.text_md};
  color: #ffffff;
`;

const ReviewBox = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  max-height: calc(100vh - 435px);

  .no-review {
    ${(props) => props.theme.fonts.text_md};
    color: ${(props) => props.theme.colors.gray600};
    margin-top: 50px;
  }

  &::-webkit-scrollbar {
    width: 4px;
  }
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
    .icon-style {
      margin-left: 220px;
      color: ${(props) => props.theme.colors.gray600};
    }
  }
  .review-text {
    margin-top: 5px;
    ${(props) => props.theme.fonts.text_sm};
    color: ${(props) => props.theme.colors.gray400};
  }
  .review-date {
    margin-top: 5px;
    ${(props) => props.theme.fonts.text_sm};
    color: ${(props) => props.theme.colors.gray400};
  }
`;
