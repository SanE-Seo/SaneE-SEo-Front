import React, { useState } from 'react';
import styled from 'styled-components';
import DefaultProfileImg from '../../assets/image/default-profile.png';
import ReviewModal from './ReviewModal';
import { PostData } from '../../@types/post';
import { deleteReview, getReviews } from '../../apis/review';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Spinner from '../Spinner';
import { CiMenuKebab } from 'react-icons/ci';
import { isLoggedInState, memberIdState } from '../../contexts/UserState';
import { useRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';
type ReviewProps = {
  detail: PostData;
};
function Review({ detail }: ReviewProps) {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [showDelete, setShowDelete] = useState<boolean>(false);
  const [memberId, setMemberId] = useRecoilState(memberIdState);
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(isLoggedInState);
  const navigate = useNavigate();

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
  type reviewProps = {
    postId: number;
    reviewId: number;
  };
  const queryClient = useQueryClient();

  const { mutate: postReviewMutate } = useMutation({
    mutationFn: ({ postId, reviewId }: reviewProps) =>
      deleteReview(postId, reviewId),
    onSuccess: () => {
      // 리뷰 작성 성공 후 getReview 쿼리를 다시 불러옴
      queryClient.invalidateQueries({ queryKey: ['getReview'] });
      setShowDelete(!showDelete);
    },
  });

  const handleDelete = async (postId: number, reviewId: number) => {
    console.log('삭제');
    postReviewMutate({ postId, reviewId });
  };

  return (
    <>
      <ReviewLayout>
        <AddReviewButton
          onClick={() => {
            if (!isLoggedIn) {
              alert('로그인이 필요합니다.');
              navigate('/login');
            } else {
              setIsOpenModal(true);
            }
          }}
        >
          리뷰 작성하기
        </AddReviewButton>
        <ReviewBox>
          {isSuccess && data ? (
            data.length > 0 ? (
              data.map((item, index) => (
                <ReviewItem key={index}>
                  <div className="profile-rating-box">
                    <div className="wrapper">
                      <img
                        src={DefaultProfileImg}
                        className="profile-img"
                        alt="profile"
                      />
                      <span className="name">{item.authorName}</span>
                    </div>

                    {memberId && item.authorId == memberId && (
                      <>
                        <button
                          onClick={() => {
                            console.log('click');
                            setShowDelete(!showDelete);
                          }}
                        >
                          <CiMenuKebab className="icon-style" />
                        </button>

                        <DeleteModal isOpen={showDelete}>
                          <button
                            onClick={() =>
                              handleDelete(item.postId, item.reviewId)
                            }
                          >
                            삭제하기
                          </button>
                        </DeleteModal>
                      </>
                    )}
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
  width: 290px;

  .profile-rating-box {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    .wrapper {
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

    .icon-style {
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

type modalProps = {
  isOpen: boolean;
};

const DeleteModal = styled.div<modalProps>`
  width: 71px;
  height: 47px;
  position: absolute;
  // display: flex;
  display: ${(props) => (props.isOpen === true ? 'flex' : 'none')};
  right: 10px;
  margin-top: 65px;
  // bottom: 10px;
  button {
    background-color: #ffe0dc;
    border: 1px solid ${(props) => props.theme.colors.red500};
    color: ${(props) => props.theme.colors.red500};
    margin: 0;
    width: inherit;
    height: 23px;
    cursor: pointer;
    ${(props) => props.theme.fonts.text_sm};
  }
`;
