import React, { useState } from 'react';
import * as C from '../../styles/card-item.style';
import postDefaultImage from '../../assets/image/post-default-image.png';
import SeoulLogo from '../../assets/image/seoul-logo.png';
import TimeIcon from '../../assets/icons/time-icon';
import HeartIcon from '../../assets/icons/heart-icon';
import LengthIcon from '../../assets/icons/length-icon';
import LevelIcon from '../../assets/icons/level-icon';
import { useNavigate } from 'react-router-dom';
import { CardData } from '../../@types/card';
import { CiMenuKebab } from 'react-icons/ci';
import styled from 'styled-components';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deletePost } from '../../apis/post';
import { useRecoilState } from 'recoil';
import { memberIdState } from '../../contexts/UserState';

type CardProps = {
  data: CardData;
};
function UserTrailCardItem({ data }: CardProps) {
  const [memberId, setMemberId] = useRecoilState(memberIdState);
  const navigate = useNavigate();
  const [showDelete, setShowDelete] = useState<boolean>(false);

  const queryClient = useQueryClient();

  const { mutate: postMutate } = useMutation({
    mutationFn: (postId: number) => deletePost(postId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getUserActivities'] });
      setShowDelete(!showDelete);
    },
  });

  const handleDelete = async (postId: number) => {
    console.log('삭제');
    postMutate(postId);
  };

  return (
    <C.CardLayout onClick={() => navigate('/community', { state: data })}>
      <img
        className="card-image"
        src={
          data.postImages[0] != undefined && data.postImages[0].imageUrl != null
            ? data.postImages[0].imageUrl
            : postDefaultImage
        }
        alt="post-image"
      />
      <Data>
        <div className="row-container">
          <img src={SeoulLogo} className="profile-icon" alt="seoul" />
          <div className="data-container">
            <span className="title-md">{data.title}</span>
            <span className="category-sm">{data.subTitle}</span>
          </div>
        </div>
        {memberId == data.authorId && (
          <MenuButton
            onClick={(e) => {
              e.stopPropagation(); // 이벤트 버블링을 막기 위해 호출
              console.log('click');
              setShowDelete(!showDelete);
            }}
          >
            <CiMenuKebab />
          </MenuButton>
        )}
      </Data>
      <DeleteModal isOpen={showDelete}>
        <button onClick={() => handleDelete(data.postId)}>삭제하기</button>
      </DeleteModal>

      <C.Description>
        <TimeIcon width={20} height={20} />
        <span className="description-text">{data.time}</span>
        <HeartIcon width={20} height={20} />
        <span className="description-text">{data.likes}</span>
        <LengthIcon width={11} height={17} />
        <span className="description-text">{data.distance}</span>
        <LevelIcon width={15} height={15} />
        <span className="description-text">{data.level}</span>
      </C.Description>
    </C.CardLayout>
  );
}

export default UserTrailCardItem;

type modalProps = {
  isOpen: boolean;
};

const Data = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 10px;
  width: 240px;
  .row-container {
    display: flex;
    flex-direction: row;

    .profile-icon {
      width: 38px;
      height: 38px;
      border-radius: 50%;
    }

    .data-container {
      display: flex;
      flex-direction: column;
      margin-left: 5px;

      .title-md {
        ${(props) => props.theme.fonts.text_md};
        font-weight: 600;
        font-size: 16px;
        color: ${(props) => props.theme.colors.gray600};
      }
      .category-sm {
        ${(props) => props.theme.fonts.text_sm};
        color: ${(props) => props.theme.colors.gray400};
      }
    }
  }
`;
const MenuButton = styled.button`
  z-index: 2;
  width: 20px;
  height: 20ox;
  // margin-left: 90px;
`;
const DeleteModal = styled.div<modalProps>`
  width: 71px;
  height: 47px;
  position: absolute;
  // display: flex;
  display: ${(props) => (props.isOpen === true ? 'flex' : 'none')};
  right: 0px;
  margin-top: 215px;
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
