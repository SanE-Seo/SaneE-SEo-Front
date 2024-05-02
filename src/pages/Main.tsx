import React from 'react';
import DefaultLayout from '../components/DefaultLayout';
import * as M from '../styles/main.style';
import Weather from '../components/Main/Weather';
import TrailCard from '../components/Main/TrailCard';
import { ReactComponent as ArrowIcon } from '../assets/icons/arrow-icon.svg';

import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getSortedPosts } from '../apis/post';
function Main() {
  const navigate = useNavigate();

  // 서울 두드림길 데이터 불러오기
  const { isLoading: isSeoulLoading, data: seoulData } = useQuery({
    queryKey: ['getSeoulTrails'],
    queryFn: () => getSortedPosts(0),
  });
  const { isLoading: isCustomLoading, data: customData } = useQuery({
    queryKey: ['getCustomTrails'],
    queryFn: () => getSortedPosts(1),
  });

  if (seoulData) {
    console.log(seoulData.length);
  }
  return (
    <>
      <DefaultLayout>
        <M.MainLayout>
          <M.WeatherWrapper>
            <M.Title>
              우리 동네 <M.Title title_color="#94C020">날씨정보</M.Title>
            </M.Title>
            <Weather />
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
