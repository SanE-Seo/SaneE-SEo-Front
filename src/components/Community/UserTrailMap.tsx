import React, { useEffect, useState } from 'react';
import useKakaoLoader from '../useKakaoLoader';
import { Map, Polyline, MapMarker } from 'react-kakao-maps-sdk';
import customMarker from '../../assets/image/foundation_marker.png';
import * as U from '../../styles/user-trail-map.style';
import Drawer from './Drawer';
import { CardData, PostImage } from '../../@types/card';
import { getPostDetails } from '../../apis/post';
import { PostData } from '../../@types/post';
import { useQuery } from '@tanstack/react-query';
import { getAllCustomPosts } from '../../apis/community';
type MapProps = {
  lat: number;
  lng: number;
  selectedDistrict: string;
  clickItem?: CardData;
};
function UserTrailMap({ lat, lng, selectedDistrict, clickItem }: MapProps) {
  useKakaoLoader();
  const [isOpenDrawer, setIsOpenDrawer] = useState<boolean>(false);

  const [detail, setDetail] = useState<PostData>();
  const [postImages, setPostImages] = useState<PostImage[]>();

  const {
    isLoading,
    isSuccess,
    data: trailData,
  } = useQuery({
    queryKey: ['getUserTrails', selectedDistrict],
    queryFn: () => getAllCustomPosts(selectedDistrict),
  });

  useEffect(() => {
    //만약 카드를 클릭해서 넘어온 경우, 해당 아이템 마커를 클릭한것처럼 이벤트 처리
    if (clickItem) {
      handleClickMarker(clickItem.postImages, clickItem.postId);
    }
  }, [clickItem]);

  const handleClickMarker = async (images: PostImage[], postId: number) => {
    const res = await getPostDetails(`${postId}`);

    if (res) {
      setIsOpenDrawer(!isOpenDrawer);
      setDetail(res);
      setPostImages(images);
      console.log('click!');
    }
  };
  return (
    <>
      <U.MapLayout>
        {isOpenDrawer && detail != undefined && (
          <Drawer
            key={detail.id}
            isOpenDrawer={isOpenDrawer}
            setIsOpenDrawer={setIsOpenDrawer}
            detail={detail}
            {...(postImages && { postImages: postImages })}
          />
        )}

        <Map
          id="map"
          center={{ lat: lat, lng: lng }}
          className="map-style"
          level={3}
        >
          {isSuccess &&
            trailData &&
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
                  onClick={() =>
                    handleClickMarker(data.postImages, data.postId)
                  }
                />
              </>
            ))}
          {isOpenDrawer && detail && (
            <Polyline
              path={detail.geometry.coordinates}
              strokeWeight={3} // 선의 두께 입니다
              strokeColor={'#FF6450'} // 선의 색깔입니다
              strokeOpacity={0.8} // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
              strokeStyle={'solid'} // 선의 스타일입니다>
            />
          )}
        </Map>
      </U.MapLayout>
    </>
  );
}

export default UserTrailMap;
