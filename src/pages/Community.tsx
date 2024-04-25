import React, { useState } from 'react';
import DefaultLayout from '../components/DefaultLayout';
import * as C from '../styles/community.style';
import RightArrowIcon from '../assets/icons/right-arrow';
import { ReactComponent as SearchIcon } from '../assets/icons/search-icon.svg';
import MapItem from '../components/Community/MapItem';
import { useNavigate } from 'react-router-dom';
function Community() {
  const [placeInput, setPlaceInput] = useState<string>('');

  const navigate = useNavigate();
  return (
    <>
      <DefaultLayout />
      <C.HeaderLayout>
        <C.SearchContainer>
          <SearchIcon />
          <input name="text" placeholder="지역을 검색하세요"></input>
        </C.SearchContainer>
        <C.AddButton onClick={() => navigate('/edit-user-course')}>
          <span className="button_icon-wrapper">
            <RightArrowIcon width={15} height={15} color="#645023" />
            <RightArrowIcon width={15} height={15} color="#645023" />
          </span>
          <span>내 코스 추가하기</span>
        </C.AddButton>
      </C.HeaderLayout>
      <MapItem />
    </>
  );
}

export default Community;
