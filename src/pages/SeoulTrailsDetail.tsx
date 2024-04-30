import React, { useState } from 'react';
import DefaultLayout from '../components/DefaultLayout';
import * as S from '../styles/seoultrails-detail.style';
import TimeIcon from '../assets/icons/time-icon';
import HeartIcon from '../assets/icons/heart-icon';
import LengthIcon from '../assets/icons/length-icon';
import LevelIcon from '../assets/icons/level-icon';
import HeartEmptyIcon from '../assets/icons/heart-empty-icon';
import HeartFilledIcon from '../assets/icons/heart-filled-icon';
import useKakaoLoader from '../components/useKakaoLoader';
import { Map } from 'react-kakao-maps-sdk';
import { useLocation } from '../contexts/LocationContext';
import { useParams } from 'react-router-dom';
function SeoulTrailsDetail() {
  useKakaoLoader();
  const postId = useParams().postId;
  const [likeStatus, setLikeStatus] = useState<boolean>(false);
  const { latitude, longitude } = useLocation();
  return (
    <DefaultLayout>
      <S.ScreenLayout>
        <span className="title-text">구로 지양산 숲 나들길</span>
        <span className="sub-title">생태문화길</span>
        <div className="div-row">
          <S.TagContainer>
            <button onClick={() => setLikeStatus(!likeStatus)}>
              {likeStatus ? (
                <HeartEmptyIcon width={22} height={19} />
              ) : (
                <HeartFilledIcon width={24} height={24} />
              )}
            </button>
          </S.TagContainer>
          <S.TagContainer>
            <TimeIcon width={28} height={28} />
            <span className="description">1시간 30분</span>
            <HeartIcon width={28} height={28} />
            <span className="description">15</span>
            <LengthIcon width={18} height={26} />
            <span className="description">2.51km</span>
            <LevelIcon width={22} height={22} />
            <span className="description">초급</span>
          </S.TagContainer>
        </div>

        <span className="content-title">세부 설명</span>
        <p className="content-md">
          위성사진을 통해 본 지양산 일대는 서울 남서쪽에 동동 떠 있는 커다란
          섬이다. 삭막한 도시 속의 오아시스 같은 지양산은 낮고도 넓게 뻗어
          수많은 오솔길을 품었다. 많은 산보객들이 발끝으로 반질반질하게 닦아
          놓은 청정 숲길은 인근의 매봉산과 원미산으로까지 영토를 넓혔다. 그래서
          그 깊은 속살을 다 들여다보려면 몇날 며칠이 필요할 지 가늠하기 어렵다.
        </p>
        <span className="content-title">교통편</span>
        <span className="content-title">세부코스</span>
        <Map
          id="map"
          center={{ lat: latitude, lng: longitude }}
          style={{ width: '100%', height: '500px', margin: '20px 0' }}
          level={2}
        ></Map>
      </S.ScreenLayout>
    </DefaultLayout>
  );
}

export default SeoulTrailsDetail;
