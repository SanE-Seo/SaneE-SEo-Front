import React from 'react';
import * as T from '../../styles/trailcard.style';
import postDefaultImage from '../../assets/post-default-image.png';
import SeoulLogo from '../../assets/seoul-logo.png';
import DefaultProfile from '../../assets/icons/default-profile.png';
import { ReactComponent as TimeIcon } from '../../assets/icons/time-icon.svg';
import { ReactComponent as HeartIcon } from '../../assets/icons/heart-icon.svg';
import { ReactComponent as PointIcon } from '../../assets/icons/point-icon.svg';

//Props 타입 정의
interface TrailCardProps {
  type: 'seoul' | 'town';
}
function TrailCard({ type }: TrailCardProps) {
  // type에 따라 프로필 이미지 결정
  const logoImage = type === 'seoul' ? SeoulLogo : DefaultProfile;
  return (
    <T.Main>
      <T.Card src={postDefaultImage} alt="Trail Image" />
      <T.Data>
        <img src={logoImage} className="profile-icon" alt="seoul" />
        <div className="data-container">
          <span className="title-md">낙산구간</span>
          <span className="category-sm">한양도성길</span>
        </div>
      </T.Data>
      <T.CardBack>
        <T.Description>
          <TimeIcon className="icon-container" />
          <span className="description-text">1시간</span>
          <HeartIcon className="icon-container" />
          <span className="description-text">15</span>
          <PointIcon className="icon-container" />
          <span className="description-text">2.51km</span>
        </T.Description>
      </T.CardBack>
    </T.Main>
  );
}

export default TrailCard;
