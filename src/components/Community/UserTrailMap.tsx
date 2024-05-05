import React, { useState } from 'react';
import useKakaoLoader from '../useKakaoLoader';
import {
  Map,
  CustomOverlayMap,
  Polyline,
  MapMarker,
} from 'react-kakao-maps-sdk';
import { ReactComponent as CustomMarker } from '../../assets/image/custom-marker.svg';
import customMarker from '../../assets/image/foundation_marker.png';
import * as U from '../../styles/user-trail-map.style';
import Drawer from './Drawer';
import { CardData } from '../../@types/card';
import { getPostDetails } from '../../apis/post';
import { PolylineData, UserTrail } from '../../@types/custom';
import { PostData } from '../../@types/post';
type MapProps = {
  lat: number;
  lng: number;
  trailData?: CardData[];
};
function UserTrailMap({ lat, lng, trailData }: MapProps) {
  useKakaoLoader();
  const [isOpenDrawer, setIsOpenDrawer] = useState<boolean>(false);

  const [detail, setDetail] = useState<PostData>();
  // if (trailData) {
  //   trailData.map((data, index) => console.log(data));
  // }

  const handleClickMarker = async (postId: number) => {
    const res = await getPostDetails(`${postId}`);

    if (res) {
      setIsOpenDrawer(!isOpenDrawer);
      setDetail(res);
      console.log('click!');
    }
  };
  return (
    <>
      <U.MapLayout>
        {isOpenDrawer && detail != undefined && (
          <Drawer
            isOpenDrawer={isOpenDrawer}
            setIsOpenDrawer={setIsOpenDrawer}
            detail={detail}
          />
        )}

        <Map
          id="map"
          center={{ lat: lat, lng: lng }}
          className="map-style"
          level={3}
        >
          {trailData &&
            trailData.map((data, index) => (
              <>
                <MapMarker
                  key={index}
                  position={{ lat: data.lat, lng: data.lng }} // 마커를 표시할 위치
                  image={{
                    src: customMarker, // 마커이미지의 주소입니다
                    size: {
                      width: 80,
                      height: 85,
                    },
                  }}
                  onClick={() => handleClickMarker(data.postId)}
                />
                {isOpenDrawer && detail && (
                  <Polyline
                    path={detail.geometry.coordinates}
                    strokeWeight={3} // 선의 두께 입니다
                    strokeColor={'#FF6450'} // 선의 색깔입니다
                    strokeOpacity={0.8} // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
                    strokeStyle={'solid'} // 선의 스타일입니다>
                  />
                )}
                ;
              </>
            ))}
        </Map>
      </U.MapLayout>
    </>
  );
}

export default UserTrailMap;
