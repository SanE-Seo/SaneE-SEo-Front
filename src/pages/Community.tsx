import React, { useEffect, useState } from 'react';
import DefaultLayout from '../components/DefaultLayout';
import * as C from '../styles/community.style';
import RightArrowIcon from '../assets/icons/right-arrow';
import { ReactComponent as SearchIcon } from '../assets/icons/search-icon.svg';
import { useNavigate } from 'react-router-dom';
import UserTrailMap from '../components/Community/UserTrailMap';
import PlaceSearchModal from '../components/Community/PlaceSearchModal';
import {
  useCurrentLocation,
  useGeolocation,
} from '../contexts/LocationContext';
import { getAllCustomPosts } from '../apis/community';
import { useQuery } from '@tanstack/react-query';
import { useLocation } from 'react-router';
import { CardData } from '../@types/card';
import { getDistrict } from '../apis/kakao_api';
import SeoulCoordinates from '../seoul_districts_coordinates.json';
import { useAuth } from '../contexts/AuthContext';
import useKakaoLoader from '../components/useKakaoLoader';

type DistrictCoordinates = {
  [key: string]: { lat: number; lng: number };
};
function Community() {
  useKakaoLoader();
  const [placeInput, setPlaceInput] = useState<string>('');
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const { latitude, longitude } = useGeolocation();
  const [selectedDistrict, setSelectedDistrict] = useState<string>('강남구');

  const { state } = useLocation() as unknown as {
    state: CardData;
  };

  const [lat, setLat] = useState<number>(latitude);
  const [lng, setLng] = useState<number>(longitude);

  const coordinates: DistrictCoordinates = SeoulCoordinates;

  const { isLoggedIn } = useAuth(); //로그인 여부 확인
  useEffect(() => {
    //카드를 클릭해 넘어왔을 경우
    if (state) {
      setLat(state.lat);
      setLng(state.lng);
      setSelectedDistrict(state.subTitle);
    } else {
      //현 위치에서 구 데이터 가져오기
      if (latitude && longitude) {
        fetchDistrict();
      }
    }
  }, [latitude, longitude, state]);
  //커뮤니티 페이지 진입시 자치구 설정 함수
  async function fetchDistrict() {
    try {
      const district = (await getDistrict(latitude, longitude)) as string;
      console.log(district);
      setSelectedDistrict(district);
      setLat(coordinates[`${district} 전체`].lat);
      setLng(coordinates[`${district} 전체`].lng);
    } catch (error) {
      console.error('자치구 정보를 가져오는데 실패했습니다.', error);
    }
    // 사용자 위치 정보가 유효한 경우에만 fetchDistrict 함수 호출
  }

  // if (!isLoading && data) {
  //   console.log(data);
  // }

  const navigate = useNavigate();

  //코스 편집기 이동 함수
  const goToEditor = () => {
    if (!isLoggedIn) {
      alert('로그인이 필요합니다.');
      navigate('/login');
    } else {
      navigate('/user-trail-editor');
    }
  };

  return (
    <>
      <DefaultLayout />
      <C.HeaderLayout>
        <C.SearchContainer>
          <SearchIcon />
          <input
            name="text"
            placeholder="지역을 검색하세요"
            value={placeInput}
            onChange={(e) => {
              setPlaceInput(e.target.value);
              setIsOpen(true);
            }}
          ></input>
        </C.SearchContainer>
        <C.AddButton onClick={goToEditor}>
          <span className="button_icon-wrapper">
            <RightArrowIcon width={15} height={15} color="#645023" />
            <RightArrowIcon width={15} height={15} color="#645023" />
          </span>
          <span>내 코스 추가하기</span>
        </C.AddButton>
      </C.HeaderLayout>
      {isOpen && (
        <PlaceSearchModal
          placeInput={placeInput}
          setPlaceInput={setPlaceInput}
          setIsOpen={setIsOpen}
          setLat={setLat}
          setLng={setLng}
          setSelectedDistrict={setSelectedDistrict}
        />
      )}

      <UserTrailMap
        lat={lat}
        lng={lng}
        selectedDistrict={selectedDistrict}
        {...(state && { clickItem: state })}
      />
    </>
  );
}

export default Community;
