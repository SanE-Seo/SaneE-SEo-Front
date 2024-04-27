import React, { useState } from 'react';
import * as D from '../../styles/drawer.style';
import TimeIcon from '../../assets/icons/time-icon';
import HeartIcon from '../../assets/icons/heart-icon';
import LengthIcon from '../../assets/icons/length-icon';
import LevelIcon from '../../assets/icons/level-icon';
import DefaultProfileImg from '../../assets/image/default-profile.png';
import CourseDetail from './CourseDetail';
import Review from './Review';
type DrawerProps = {
  isOpenDrawer: boolean;
  setIsOpenDrawer: (value: boolean) => void;
};
function Drawer({ isOpenDrawer, setIsOpenDrawer }: DrawerProps) {
  const [selectedMenu, setSelectedMenu] = useState<string>('상세정보');
  return (
    <D.DrawerLayout
    // style={{
    //   transform: isOpenDrawer ? 'translateX(0)' : 'translateX(-100%)',
    // }}
    >
      <D.PostInfoBox>
        <span className="title-sm">노원구 최애 산책길</span>
        <span className="address-info">서울특별시 노원구</span>
        <div className="description-box">
          <TimeIcon width={20} height={20} />
          <span className="description-text">1시간</span>
          <HeartIcon width={20} height={20} />
          <span className="description-text">15</span>
          <LengthIcon width={11} height={17} />
          <span className="description-text">2.51km</span>
          <LevelIcon width={15} height={15} />
          <span className="description-text">초급</span>
        </div>
        <div className="profile-box">
          <img src={DefaultProfileImg} alt="profile" className="profile-img" />
          <span className="name">응자 </span>
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
      {selectedMenu == '상세정보' ? <CourseDetail /> : <Review />}
    </D.DrawerLayout>
  );
}

export default Drawer;
