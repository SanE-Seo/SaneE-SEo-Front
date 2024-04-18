import React from 'react';
import DefaultLayout from '../components/DefaultLayout';
import * as M from '../styles/main.style';
import Weather from '../components/Main/Weather';

function Main() {
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
            <M.ContentSpan>
              서울 두드림길은 자연의 느림과 여유를 만끽할 수 있는 걷기코스입니다
            </M.ContentSpan>
          </M.SeoulWrapper>
          <M.TownWraaper>
            <M.Title>
              현재 가장 인기있는{' '}
              <M.Title title_color="#F9C758">우리동네 산책로</M.Title>
            </M.Title>
            <M.ContentSpan>
              동네 주민들이 추천한 인기있는 산책로 코스 정보 입니다.
            </M.ContentSpan>
          </M.TownWraaper>
        </M.MainLayout>
      </DefaultLayout>
    </>
  );
}

export default Main;
