import React, { useState, useEffect } from 'react';
import * as D from '../../styles/drawer.style';
import TimeIcon from '../../assets/icons/time-icon';
import HeartIcon from '../../assets/icons/heart-icon';
import LengthIcon from '../../assets/icons/length-icon';
import LevelIcon from '../../assets/icons/level-icon';
import DefaultProfileImg from '../../assets/image/default-profile.png';
import CourseDetail from './CourseDetail';
import Review from './Review';
import { PostData } from '../../@types/post';
import Like from '../Like';
import { useQuery } from '@tanstack/react-query';
import { getLikes } from '../../apis/like';
type DrawerProps = {
  isOpenDrawer: boolean;
  setIsOpenDrawer: (value: boolean) => void;
  detail: PostData;
};
function Drawer({ isOpenDrawer, setIsOpenDrawer, detail }: DrawerProps) {
  const [selectedMenu, setSelectedMenu] = useState<string>('상세정보');
  const [likeStatus, setLikeStatus] = useState<boolean>(false);

  useEffect(() => {
    refetch();
  }, [likeStatus]);

  const {
    isLoading: isLoadingLikes,
    isSuccess: isSuccessLikes,
    data: likeData,
    refetch,
  } = useQuery({
    queryKey: ['getLikes'],
    queryFn: () => getLikes(`${detail.id}`),
    enabled: Boolean(detail.id),
  });
  return (
    <D.DrawerLayout
    // style={{
    //   transform: isOpenDrawer ? 'translateX(0)' : 'translateX(-100%)',
    // }}
    >
      <D.PostInfoBox>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span className="title-sm">{detail.title}</span>
            <span className="address-info">{detail.subTitle}</span>
          </div>
          <Like
            postId={`${detail.id}`}
            likeStatus={likeStatus}
            setLikeStatus={setLikeStatus}
          />
        </div>
        <div className="description-box">
          <TimeIcon width={20} height={20} />
          <span className="description-text">{detail.time}</span>
          <HeartIcon width={20} height={20} />
          <span className="description-text">
            {likeData && likeData?.likeCnt != 0 ? likeData.likeCnt : '0'}
          </span>
          <LengthIcon width={11} height={17} />
          <span className="description-text">{detail.distance}</span>
          <LevelIcon width={15} height={15} />
          <span className="description-text">{detail.level}</span>
        </div>
        <div className="profile-box">
          <img
            src={
              detail.authorProfile == null
                ? DefaultProfileImg
                : detail.authorProfile
            }
            alt="profile"
            className="profile-img"
          />
          <span className="name">{detail.authorName}</span>
        </div>
      </D.PostInfoBox>
      <hr className="custom-line" />
      <D.MenuBox>
        <D.MenuItem active={selectedMenu === '상세정보'.toString()}>
          <button onClick={() => setSelectedMenu('상세정보')}> 상세정보</button>
        </D.MenuItem>
        <D.MenuItem active={selectedMenu === '리뷰'.toString()}>
          <button onClick={() => setSelectedMenu('리뷰')}>리뷰</button>
        </D.MenuItem>
      </D.MenuBox>
      {selectedMenu == '상세정보' ? (
        <CourseDetail detail={detail} />
      ) : (
        <Review detail={detail} />
      )}
    </D.DrawerLayout>
  );
}

export default Drawer;
