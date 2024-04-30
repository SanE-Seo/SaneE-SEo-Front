import React, { useEffect, useState } from 'react';
import DefaultLayout from '../components/DefaultLayout';
import * as S from '../styles/seoultrails-detail.style';
import TimeIcon from '../assets/icons/time-icon';
import HeartIcon from '../assets/icons/heart-icon';
import LengthIcon from '../assets/icons/length-icon';
import LevelIcon from '../assets/icons/level-icon';
import HeartEmptyIcon from '../assets/icons/heart-empty-icon';
import HeartFilledIcon from '../assets/icons/heart-filled-icon';
import useKakaoLoader from '../components/useKakaoLoader';
import { Map, Polyline } from 'react-kakao-maps-sdk';
import { useParams } from 'react-router-dom';
import { getPostDetails } from '../apis/post';
import { useQuery } from '@tanstack/react-query';
import Spinner from '../components/Spinner';
import { getLikes } from '../apis/like';
function SeoulTrailsDetail() {
  useKakaoLoader();
  const { postId } = useParams() as { postId: string };
  const [likeStatus, setLikeStatus] = useState<boolean>(false);

  const { isLoading, data } = useQuery({
    queryKey: ['getPostDetails'],
    queryFn: () => getPostDetails(postId),
  });

  const {
    isLoading: isLoadingLikes,
    isSuccess: isSuccessLikes,
    data: likeData,
  } = useQuery({
    queryKey: ['getLikes'],
    queryFn: () => getLikes(postId),
  });
  if (likeData) {
    console.log(likeData.likeCnt);
  }

  //좌표를 카카오맵에 띄울 수 있도록 형식 변환
  const transformedCoordinates: { lat: number; lng: number }[][] = [
    data?.coordinate.coordinates
      ? data.coordinate.coordinates.map(([lat, lng]) => ({ lat, lng }))
      : [],
  ];

  return (
    <DefaultLayout>
      <S.ScreenLayout>
        {!isLoading && isSuccessLikes && data ? (
          <>
            <span className="title-text">{data.title}</span>
            <span className="sub-title">{data.subTitle}</span>
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
                <span className="description">{data.time}</span>
                <HeartIcon width={28} height={28} />
                <span className="description">
                  {likeData?.likeCnt == 0 ? '0' : likeData?.likeCnt}
                </span>
                <LengthIcon width={18} height={26} />
                <span className="description">{data.distance}</span>
                <LevelIcon width={22} height={22} />
                <span className="description">{data.level}</span>
              </S.TagContainer>
            </div>

            <span className="content-title">세부 설명</span>
            <p className="content-md">{data.description}</p>
            <span className="content-title">교통편</span>
            <p className="content-md">{data.transportation}</p>
            <span className="content-title">세부코스</span>
            <p className="content-md">{data.courseDetail}</p>
            <Map
              id="map"
              center={{ lat: data.coordinate.lat, lng: data.coordinate.lng }}
              style={{ width: '100%', height: '500px', margin: '20px 0' }}
              level={4}
            >
              <Polyline
                path={transformedCoordinates}
                strokeWeight={3} // 선의 두께 입니다
                strokeColor={'#FF6450'} // 선의 색깔입니다
                strokeOpacity={0.8} // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
                strokeStyle={'solid'} // 선의 스타일입니다>
              />
            </Map>
          </>
        ) : (
          <>
            <Spinner />
          </>
        )}
      </S.ScreenLayout>
    </DefaultLayout>
  );
}

export default SeoulTrailsDetail;
