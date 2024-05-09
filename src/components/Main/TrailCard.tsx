import React from 'react';
import * as T from '../../styles/trailcard.style';
import postDefaultImage from '../../assets/image/post-default-image.png';
import SeoulLogo from '../../assets/image/seoul-logo.png';
import DefaultProfile from '../../assets/image/default-profile.png';
import TimeIcon from '../../assets/icons/time-icon';
import HeartIcon from '../../assets/icons/heart-icon';
import LengthIcon from '../../assets/icons/length-icon';
import LevelIcon from '../../assets/icons/level-icon';
import { CardData } from '../../@types/card';
import { useNavigate } from 'react-router-dom';
type CardProps = {
  data: CardData;
  type: 'seoul' | 'town';
};
function TrailCard({ type, data }: CardProps) {
  // type에 따라 프로필 이미지 결정
  const logoImage = type === 'seoul' ? SeoulLogo : DefaultProfile;
  const navigate = useNavigate();

  const handleNavigatePost = () => {
    if (type === 'seoul') {
      navigate(`/trail-detail/${data.postId}`);
    } else {
      navigate('/community', { state: data });
    }
  };
  return (
    <T.Main onClick={handleNavigatePost}>
      <T.Card
        src={
          data.postImages[0] != undefined && data.postImages[0].imageUrl != null
            ? data.postImages[0].imageUrl
            : postDefaultImage
        }
        alt="Trail Image"
      />
      <T.Data>
        <img
          src={
            type == 'seoul'
              ? SeoulLogo
              : data.authorProfileImageUrl ?? DefaultProfile
          }
          className="profile-icon"
          alt="seoul"
        />
        <div className="data-container">
          <span className="title-md">{data.title}</span>
          <span className="category-sm">{data.subTitle}</span>
        </div>
      </T.Data>
      <T.CardBack>
        <T.Description>
          <TimeIcon width={20} height={20} />
          <span className="description-text">{data.time}</span>
          <HeartIcon width={20} height={20} />
          <span className="description-text">{data.likes}</span>
          <LengthIcon width={11} height={17} />
          <span className="description-text">{data.distance}</span>
          <LevelIcon width={15} height={15} />
          <span className="description-text">{data.level}</span>
        </T.Description>
      </T.CardBack>
    </T.Main>
  );
}

export default TrailCard;
