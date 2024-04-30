import React from 'react';
import * as C from '../../styles/card-item.style';
import postDefaultImage from '../../assets/image/post-default-image.png';
import SeoulLogo from '../../assets/image/seoul-logo.png';
import TimeIcon from '../../assets/icons/time-icon';
import HeartIcon from '../../assets/icons/heart-icon';
import LengthIcon from '../../assets/icons/length-icon';
import LevelIcon from '../../assets/icons/level-icon';
import { useNavigate } from 'react-router-dom';
import { CardData } from '../../@types/card';

type CardProps = {
  key: number;
  data: CardData;
};
function CardItem({ key, data }: CardProps) {
  const navigate = useNavigate();
  return (
    <C.CardLayout onClick={() => navigate(`/trail-detail/${data.postId}`)}>
      <img className="card-image" src={postDefaultImage} alt="post-image" />
      <C.Data>
        <img src={SeoulLogo} className="profile-icon" alt="seoul" />
        <div className="data-container">
          <span className="title-md">{data.title}</span>
          <span className="category-sm">{data.subTitle}</span>
        </div>
      </C.Data>
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

export default CardItem;
