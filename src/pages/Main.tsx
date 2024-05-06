import React, { useState, useEffect } from 'react';
import DefaultLayout from '../components/DefaultLayout';
import * as M from '../styles/main.style';
import Weather from '../components/Main/Weather';
import TrailCard from '../components/Main/TrailCard';
import { ReactComponent as ArrowIcon } from '../assets/icons/arrow-icon.svg';
import { getDistrict } from '../apis/kakao_api';
import { useCurrentLocation } from '../contexts/LocationContext';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import { getSortedCustomPosts, getSortedPosts } from '../apis/post';
import useKakaoLoader from '../components/useKakaoLoader';
function Main() {
  useKakaoLoader();
  const navigate = useNavigate();
  const { latitude, longitude } = useCurrentLocation();
  // 선택된 자치구 상태를 관리하기 위한 useState
  const [selectedDistrict, setSelectedDistrict] = useState<string>('강남구');

  // 서울 두드림길 데이터 불러오기
  const { isLoading: isSeoulLoading, data: seoulData } = useQuery({
    queryKey: ['getSeoulTrails'],
    queryFn: () => getSortedPosts(0),
  });
  //걸음나눔터 데이터 불러오기
  const { isLoading: isCustomLoading, data: customData } = useQuery({
    queryKey: ['getCustomTrails', selectedDistrict],
    queryFn: () => getSortedCustomPosts(selectedDistrict),
    enabled: Boolean(selectedDistrict),
  });

  useEffect(() => {
    //현 위치에서 구 데이터 가져오기
    if (latitude && longitude) {
      fetchDistrict();
    } else {
      //위치 데이터가 없으면,
      setSelectedDistrict('강남구');
    }
  }, [latitude, longitude]);

  async function fetchDistrict() {
    try {
      const district = (await getDistrict(latitude, longitude)) as string;
      console.log(district);
      setSelectedDistrict(district);
    } catch (error) {
      setSelectedDistrict('강남구');
      console.error('자치구 정보를 가져오는데 실패했습니다.', error);
    }
    // 사용자 위치 정보가 유효한 경우에만 fetchDistrict 함수 호출
  }

  return (
    <>
      <DefaultLayout>
        <M.MainLayout>
          <M.WeatherWrapper>
            <M.Title>
              우리 동네 <M.Title title_color="#94C020">날씨정보</M.Title>
            </M.Title>
            {selectedDistrict && (
              <Weather
                selectedDistrict={selectedDistrict}
                setSelectedDistrict={setSelectedDistrict}
                fetchDistrict={fetchDistrict}
              />
            )}
          </M.WeatherWrapper>
          <M.SeoulWrapper>
            <M.Title>
              현재 가장 인기있는{' '}
              <M.Title title_color="#645023">서울 두드림길</M.Title>
            </M.Title>

            <M.Container>
              <span className="content-span">
                {' '}
                서울 두드림길은 자연의 느림과 여유를 만끽할 수 있는
                걷기코스입니다
              </span>
              <div
                className="row-container"
                onClick={() => {
                  navigate('/seoul-trails');
                }}
              >
                <span className="text-md">두드림길 둘러보기</span>
                <ArrowIcon className="icon-wrapper" />
              </div>
            </M.Container>
            <M.CardList>
              {!isSeoulLoading && seoulData && seoulData.length > 0 ? (
                <>
                  {seoulData.map((item, index) => (
                    <TrailCard type="seoul" data={item} key={index} />
                  ))}
                </>
              ) : (
                <div> 데이터가 없습니다.</div>
              )}
            </M.CardList>
          </M.SeoulWrapper>
          <M.TownWrapper>
            <M.Title>
              현재 가장 인기있는{' '}
              <M.Title title_color="#F9C758">우리동네 산책로</M.Title>
            </M.Title>
            <M.Container>
              <span className="content-span">
                동네 주민들이 추천한 인기있는 산책로 코스 정보 입니다.
              </span>
              <div
                className="row-container"
                onClick={() => {
                  navigate('/community');
                }}
              >
                <span className="text-md">걸음나눔터 둘러보기</span>
                <ArrowIcon className="icon-wrapper" />
              </div>
            </M.Container>
            <M.CardList>
              {!isCustomLoading && customData && customData?.length > 0 ? (
                <>
                  {customData.map((item, index) => (
                    <TrailCard type="town" data={item} key={index} />
                  ))}
                </>
              ) : (
                <div> 데이터가 없습니다.</div>
              )}
            </M.CardList>
          </M.TownWrapper>
        </M.MainLayout>
      </DefaultLayout>
    </>
  );
}

export default Main;
