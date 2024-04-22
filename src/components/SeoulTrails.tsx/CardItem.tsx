import React from 'react';
import * as C from '../../styles/card-item.style';
import postDefaultImage from '../../assets/image/post-default-image.png';
import SeoulLogo from '../../assets/image/seoul-logo.png';
import { ReactComponent as TimeIcon } from '../../assets/icons/time-icon.svg';
import { ReactComponent as HeartIcon } from '../../assets/icons/heart-icon.svg';
import { ReactComponent as PointIcon } from '../../assets/icons/point-icon.svg';
import { ReactComponent as LevelIcon } from '../../assets/icons/level-icon.svg';
import { useNavigate } from 'react-router-dom';
function CardItem() {
  const navigate = useNavigate();
  return (
    <C.CardLayout onClick={() => navigate('/trail-detail')}>
      <img className="card-image" src={postDefaultImage} alt="post-image" />
      <C.Data>
        <img src={SeoulLogo} className="profile-icon" alt="seoul" />
        <div className="data-container">
          <span className="title-md">낙산구간</span>
          <span className="category-sm">한양도성길</span>
        </div>
      </C.Data>
      <C.Description>
        <TimeIcon className="icon-container" />
        <span className="description-text">1시간</span>
        <HeartIcon className="icon-container" />
        <span className="description-text">15</span>
        <PointIcon className="icon-container" />
        <span className="description-text">2.51km</span>
        <LevelIcon className="icon-container" />
        <span className="description-text">초급</span>
      </C.Description>
    </C.CardLayout>
  );
}

export default CardItem;
