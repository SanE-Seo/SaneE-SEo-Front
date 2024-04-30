import React from 'react';
import * as T from '../../styles/trailcard.style';
import postDefaultImage from '../../assets/image/post-default-image.png';
import SeoulLogo from '../../assets/image/seoul-logo.png';
import DefaultProfile from '../../assets/image/default-profile.png';
import TimeIcon from '../../assets/icons/time-icon';
import HeartIcon from '../../assets/icons/heart-icon';
import LengthIcon from '../../assets/icons/length-icon';
import LevelIcon from '../../assets/icons/level-icon';

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
          <TimeIcon width={20} height={20} />
          <span className="description-text">1시간</span>
          <HeartIcon width={20} height={20} />
          <span className="description-text">15</span>
          <LengthIcon width={11} height={17} />
          <span className="description-text">2.51km</span>
          <LevelIcon width={15} height={15} />
          <span className="description-text">초급</span>
        </T.Description>
      </T.CardBack>
    </T.Main>
  );
}

export default TrailCard;
