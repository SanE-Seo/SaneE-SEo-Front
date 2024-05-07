import React, { useEffect, useState } from 'react';
import DefaultLayout from '../components/DefaultLayout';
import * as U from '../styles/user-trail-detail.style';
import TimeIcon from '../assets/icons/time-icon';
import HeartIcon from '../assets/icons/heart-icon';
import LengthIcon from '../assets/icons/length-icon';
import LevelIcon from '../assets/icons/level-icon';

import useKakaoLoader from '../components/useKakaoLoader';
import { Map, Polyline } from 'react-kakao-maps-sdk';
import { useParams } from 'react-router-dom';
import { getPostDetails } from '../apis/post';
import { useQuery } from '@tanstack/react-query';
import Spinner from '../components/Spinner';
import { getLikes } from '../apis/like';
import Like from '../components/Like';

import ConfirmModal from '../components/ConfirmModal';

function UserTrailDetail() {
  useKakaoLoader();
  const { postId } = useParams() as { postId: string };
  const [likeStatus, setLikeStatus] = useState<boolean>(false);
  const [ConfirmModalIsOpen, setConfirmModalIsOpen] = useState<boolean>(false);

  const { isLoading, data } = useQuery({
    queryKey: ['getPostDetails'],
    queryFn: () => getPostDetails(postId),
  });

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
    queryFn: () => getLikes(postId),
  });

  const openConfirmModal = () => {
    setConfirmModalIsOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeConfirmModal = async () => {
    setConfirmModalIsOpen(false);
    document.body.style.overflow = 'unset';
  };

  return (
    <>
      <DefaultLayout>
        <U.ScreenLayout>
          {!isLoading && isSuccessLikes && data ? (
            <>
              <div className="title-container">
                <span className="title-text">{data.title}</span>
                <button
                  className="button"
                  onClick={() => {
                    openConfirmModal();
                  }}
                >
                  삭제하기
                </button>
              </div>
              <span className="sub-title">{data.subTitle}</span>
              <div className="div-row">
                <Like
                  postId={postId}
                  likeStatus={likeStatus}
                  setLikeStatus={setLikeStatus}
                />
                <U.TagContainer>
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
                </U.TagContainer>
              </div>

              <span className="content-title">세부 설명</span>
              <p className="content-md">{data.description}</p>
              <span className="content-title">세부코스</span>
              <Map
                id="map"
                center={{
                  lat: data.geometry.coordinates[
                    Math.floor(data.geometry.coordinates.length / 2)
                  ].lat,
                  lng: data.geometry.coordinates[
                    Math.floor(data.geometry.coordinates.length / 2)
                  ].lng,
                }}
                style={{ width: '100%', height: '500px', margin: '20px 0' }}
                level={6}
              >
                <Polyline
                  path={data.geometry.coordinates}
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
        </U.ScreenLayout>
      </DefaultLayout>
      {ConfirmModalIsOpen && (
        <ConfirmModal closeConfirmModal={() => closeConfirmModal()} />
      )}
    </>
  );
}

export default UserTrailDetail;
