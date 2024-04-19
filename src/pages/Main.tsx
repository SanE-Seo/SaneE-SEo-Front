import React from 'react';
import DefaultLayout from '../components/DefaultLayout';
import * as M from '../styles/main.style';
import Weather from '../components/Main/Weather';
import TrailCard from '../components/Main/TrailCard';
import { ReactComponent as ArrowIcon } from '../assets/icons/arrow-icon.svg';

import { useNavigate } from 'react-router-dom';
function Main() {
  const navigate = useNavigate();
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
              <TrailCard type="seoul" />
              <TrailCard type="seoul" />
              <TrailCard type="seoul" />
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
              <TrailCard type="town" />
              <TrailCard type="town" />
              <TrailCard type="town" />
            </M.CardList>
          </M.TownWrapper>
        </M.MainLayout>
      </DefaultLayout>
    </>
  );
}

export default Main;
