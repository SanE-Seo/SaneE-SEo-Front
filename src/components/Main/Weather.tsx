import React, { useState } from 'react';
import * as W from '../../styles/weather.style';
import { SeoulDistricts } from '../../assets/seoul_districts';
import MyPlace from '../../assets/icons/target-point.png';

import { ReactComponent as WaterIcon } from '../../assets/icons/water-icon.svg';
import { ReactComponent as RainIcon } from '../../assets/icons/rain-icon.svg';
import { ReactComponent as FineDustIcon } from '../../assets/icons/fine-dust.svg';
import { ReactComponent as UltraFineDustIcon } from '../../assets/icons/ultra-fine-dust.svg';
import { ReactComponent as OzoneIcon } from '../../assets/icons/ozone-icon.svg';
import TemperatureIcon from '../../assets/icons/temparature-icon.png';
function Weather() {
  // 선택된 자치구 상태를 관리하기 위한 useState
  const [selectedDistrict, setSelectedDistrict] = useState<string>('');

  // 드롭다운에서 자치구가 선택될 때 실행될 핸들러 함수
  //api 요청 코드 추가
  const handleDistrictChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setSelectedDistrict(event.target.value);
  };
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
        <div className="my-place-wrapper">
          <img src={MyPlace} alt="내 위치" height={17} />
          <span className="my-place-label">내 위치</span>
        </div>
      </W.PlaceForm>
      <W.WeatherLayout>
        <label className="weather-label">기상정보</label>
        <W.InfoBox>
          <div className="row-container">
            <img src={TemperatureIcon} className="icon-style" height={28} />
            <span className="label-text">온도</span>
          </div>
          <div className="temp-column-container">
            <span className="value-caption">현재</span>
            <span className="value-caption">최저/최고</span>
          </div>
        </W.InfoBox>
        <W.InfoBox>
          <div className="row-container">
            <WaterIcon className="icon-style" />
            <span className="label-text">습도</span>
          </div>
          <span className="value-md">65%</span>
        </W.InfoBox>
        <W.InfoBox>
          <div className="row-container">
            <RainIcon className="icon-style" />
            <span className="label-text">강수량</span>
          </div>
          <span className="value-md">강수없음</span>
        </W.InfoBox>
        <label className="weather-label">대기오염정보 </label>
        <W.InfoBox>
          <div className="row-container">
            <FineDustIcon className="icon-style" />
            <span className="label-text">미세먼지</span>
          </div>
          <span className="value-md">보통</span>
        </W.InfoBox>
        <W.InfoBox>
          <div className="row-container">
            <UltraFineDustIcon className="icon-style" />
            <span className="label-text">초미세먼지</span>
          </div>
          <span className="value-md">좋음 </span>
        </W.InfoBox>
        <W.InfoBox>
          <div className="row-container">
            <OzoneIcon className="icon-style" />
            <span className="label-text">오존</span>
          </div>
          <span className="value-md">보통</span>
        </W.InfoBox>
      </W.WeatherLayout>
    </>
  );
}

export default Weather;
