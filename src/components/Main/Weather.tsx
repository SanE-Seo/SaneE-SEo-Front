import React, { useEffect, useState } from 'react';
import * as W from '../../styles/weather.style';
import { SeoulDistricts } from '../../assets/seoul_districts';
import MyPlace from '../../assets/icons/target-point.png';

import { ReactComponent as WaterIcon } from '../../assets/icons/water-icon.svg';
import { ReactComponent as RainIcon } from '../../assets/icons/rain-icon.svg';
import { ReactComponent as FineDustIcon } from '../../assets/icons/fine-dust.svg';
import { ReactComponent as UltraFineDustIcon } from '../../assets/icons/ultra-fine-dust.svg';
import { ReactComponent as OzoneIcon } from '../../assets/icons/ozone-icon.svg';
import TemperatureIcon from '../../assets/icons/temparature-icon.png';
import { getDistrict } from '../../apis/kakao_api';
import { useLocation } from '../../contexts/LocationContext';
import { useQuery } from '@tanstack/react-query';
import { getWeather } from '../../apis/weather';
import Spinner from '../Spinner';
function Weather() {
  // 선택된 자치구 상태를 관리하기 위한 useState
  const [selectedDistrict, setSelectedDistrict] = useState<string | null>(null);
  const { latitude, longitude } = useLocation();

  useEffect(() => {
    if (latitude && longitude) {
      console.log('실행');
      fetchDistrict();
    }
    // fetchDistrict();
  }, [latitude, longitude]);

  const { isLoading, isSuccess, data } = useQuery({
    queryKey: ['getWeather', selectedDistrict],
    queryFn: () => getWeather(SeoulDistricts.indexOf(selectedDistrict!) + 1),
    enabled: Boolean(selectedDistrict),
  });

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

  // 드롭다운에서 자치구가 선택될 때 실행될 핸들러 함수
  const handleDistrictChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setSelectedDistrict(event.target.value);
  };

  const transformFineDust = (microDust: number) => {
    if (microDust >= 0 && microDust <= 30) {
      return '좋음';
    } else if (microDust >= 31 && microDust <= 80) {
      return '보통';
    } else if (microDust >= 81 && microDust <= 150) {
      return '나쁨';
    } else {
      return '매우나쁨';
    }
  };
  const transformUltraMicroDust = (microDust: number) => {
    if (microDust >= 0 && microDust <= 15) {
      return '좋음';
    } else if (microDust >= 16 && microDust <= 35) {
      return '보통';
    } else if (microDust >= 36 && microDust <= 75) {
      return '나쁨';
    } else {
      return '매우나쁨';
    }
  };

  const transformOzone = (ozone: number) => {
    if (ozone >= 0 && ozone <= 0.03) {
      return '좋음';
    } else if (ozone >= 0.031 && ozone <= 0.09) {
      return '보통';
    } else if (ozone >= 0.091 && ozone <= 0.15) {
      return '나쁨';
    } else {
      return '매우나쁨';
    }
  };

  if (selectedDistrict) {
    return (
      <>
        <W.PlaceForm>
          <label className="select-label">지역선택</label>
          <select
            className="select-place"
            value={selectedDistrict}
            onChange={handleDistrictChange}
          >
            {SeoulDistricts.map((district, index) => (
              <option key={index} value={district}>
                {district}
              </option>
            ))}
          </select>
          <div className="my-place-wrapper" onClick={() => fetchDistrict()}>
            <img src={MyPlace} alt="내 위치" height={17} />
            <span className="my-place-label">내 위치</span>
          </div>
        </W.PlaceForm>
        {isSuccess && data ? (
          <W.WeatherLayout>
            <label className="weather-label">기상정보</label>
            <W.InfoBox>
              <div className="row-container">
                <img src={TemperatureIcon} className="icon-style" height={28} />
                <span className="label-text">온도</span>
              </div>
              <div className="temp-column-container">
                <span className="value-caption">현재 {data.temperature}°C</span>
                <span className="value-caption">
                  최저/최고{data.temperatureMin}°C/{data.temperatureMax}°C
                </span>
              </div>
            </W.InfoBox>
            <W.InfoBox>
              <div className="row-container">
                <WaterIcon className="icon-style" />
                <span className="label-text">습도</span>
              </div>
              <span className="value-md">{data.humidity}%</span>
            </W.InfoBox>
            <W.InfoBox>
              <div className="row-container">
                <RainIcon className="icon-style" />
                <span className="label-text">강수량</span>
              </div>
              <span className="value-md">{data.precipitation}</span>
            </W.InfoBox>
            <label className="weather-label">대기오염정보 </label>
            <W.InfoBox>
              <div className="row-container">
                <FineDustIcon className="icon-style" />
                <span className="label-text">미세먼지</span>
              </div>
              <span className="value-md">
                {transformFineDust(data.microDust)}
              </span>
            </W.InfoBox>
            <W.InfoBox>
              <div className="row-container">
                <UltraFineDustIcon className="icon-style" />
                <span className="label-text">초미세먼지</span>
              </div>
              <span className="value-md">
                {transformUltraMicroDust(data.ultraMicroDust)}
              </span>
            </W.InfoBox>
            <W.InfoBox>
              <div className="row-container">
                <OzoneIcon className="icon-style" />
                <span className="label-text">오존</span>
              </div>
              <span className="value-md">{transformOzone(data.ozone)}</span>
            </W.InfoBox>
          </W.WeatherLayout>
        ) : (
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              margin: 'auto',
            }}
          >
            <Spinner />
          </div>
        )}
      </>
    );
  } else {
    return <></>;
  }
}

export default Weather;
