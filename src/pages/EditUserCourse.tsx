import React from 'react';
import DefaultLayout from '../components/DefaultLayout';

import { Map } from 'react-kakao-maps-sdk';
import useKakaoLoader from '../components/useKakaoLoader';

function EditUserCourse() {
  useKakaoLoader();

  return (
    <div>
      <>
        <DefaultLayout>
          <Map
            id="map" // 이 id는 고유해야 합니다. 다른 HTML 요소와 중복되지 않도록 주의해주세요.
            center={{
              // 지도의 중심좌표, 필요에 따라 조정할 수 있습니다.
              lat: 33.450701,
              lng: 126.570667,
            }}
            style={{
              // 지도의 크기, 필요에 따라 조정할 수 있습니다.
              width: '100%', // 또는 특정 크기
              height: '400px', // 여기서는 높이를 조금 더 늘렸습니다.
            }}
            level={3} // 지도의 확대 레벨, 필요에 따라 조정할 수 있습니다.
          />
        </DefaultLayout>
      </>
    </div>
  );
}

export default EditUserCourse;
