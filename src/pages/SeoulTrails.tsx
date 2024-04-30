import React, { useState, useCallback } from 'react';
import DefaultLayout from '../components/DefaultLayout';
import BackgroundImage from '../assets/image/background-image.png';
import * as S from '../styles/seoultrails.style';
import PrevIcon from '../assets/icons/prev-icon';
import NextIcon from '../assets/icons/next-icon';
import { SeoulDistricts } from '../assets/seoul_districts';
import { ReactComponent as Yellow } from '../assets/image/background-yellow.svg';
import { ReactComponent as Brown } from '../assets/image/background-brown.svg';
import { ReactComponent as Green } from '../assets/image/background-green.svg';
import CardItem from '../components/SeoulTrails.tsx/CardItem';
import { useQuery } from '@tanstack/react-query';
import { getAllPosts, getDistrictPosts } from '../apis/post';
import Spinner from '../components/Spinner';

function SeoulTrails() {
  const [offset, setOffset] = useState<number>(0);
  const [selectedDistrict, setSelectedDistrict] = useState<string>('전체');

  // 전체 데이터 불러오기
  const { isLoading, data } = useQuery({
    queryKey: ['getSeoulTrails', selectedDistrict],
    queryFn: () => {
      return selectedDistrict == '전체'
        ? getAllPosts()
        : getDistrictPosts(SeoulDistricts.indexOf(selectedDistrict) + 1);
    },
  });

  if (data) {
    console.log(data);
  }

  const handlePrevClick = useCallback(() => {
    if (offset < 0) setOffset(offset + 1000);
  }, [offset]);

  const handleNextClick = useCallback(() => {
    if (offset > -2000) setOffset(offset - 1000);
  }, [offset]);

  const onDistrictClick = (district: string) => {
    setSelectedDistrict(district);
    console.log(district);
  };

  return (
    <>
      <DefaultLayout>
        <S.Background>
          <Yellow className="yellow-image" />
          <Brown className="brown-image" />
          <Green className="green-image" />
          <S.ScreenWrapper>
            <S.HeaderLayout>
              <img src={BackgroundImage} alt="background-image" height={110} />
              <div className="content-layout">
                <S.Title title_color="#F9C758">
                  서울{' '}
                  <S.Title title_color="#94C020">
                    두드림길{' '}
                    <S.SubTitle className="text-lg">어디가지?</S.SubTitle>
                  </S.Title>
                </S.Title>
                <span className="text-md">
                  아름다운 생태와 풍부한 역사, 다채로운 문화가 어우러진
                  서울두드림길에서 도심 속 여유와 자연의 느림을 체험해 보세요
                </span>
              </div>
            </S.HeaderLayout>

            <S.DistrictBox>
              <button
                className="slide-button"
                onClick={handlePrevClick}
                disabled={offset >= 0}
              >
                <PrevIcon color={offset >= 0 ? '#B8B8B8' : '#717171'} />
              </button>
              <ul className="slide-item-wrapper">
                {['전체', ...SeoulDistricts].map((d, index) => (
                  <S.SlideItem
                    key={index}
                    className="slide-item"
                    offset={offset}
                    active={selectedDistrict == d}
                  >
                    <button onClick={() => onDistrictClick(d)}>{d}</button>
                  </S.SlideItem>
                ))}
              </ul>
              <button
                className="slide-button"
                onClick={handleNextClick}
                disabled={offset <= -2000}
              >
                <NextIcon color={offset <= -2000 ? '#B8B8B8' : '#717171'} />
              </button>
            </S.DistrictBox>
            {!isLoading ? (
              data && data.length > 0 ? (
                <S.CardItemBox>
                  {data.map((item, index) => (
                    <CardItem key={index} data={item} />
                  ))}
                </S.CardItemBox>
              ) : (
                <div>{selectedDistrict}에 해당되는 산책로가 없습니다.</div>
              )
            ) : (
              <div>
                <Spinner />
              </div>
            )}
          </S.ScreenWrapper>
        </S.Background>
      </DefaultLayout>
    </>
  );
}

export default SeoulTrails;
