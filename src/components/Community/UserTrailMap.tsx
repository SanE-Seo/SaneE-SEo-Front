import React, { useState } from 'react';
import useKakaoLoader from '../useKakaoLoader';
import { Map, CustomOverlayMap } from 'react-kakao-maps-sdk';
import { ReactComponent as CustomMarker } from '../../assets/image/custom-marker.svg';
import * as U from '../../styles/user-trail-map.style';
import Drawer from './Drawer';
type MapProps = {
  lat: number;
  lng: number;
};
function UserTrailMap({ lat, lng }: MapProps) {
  // useKakaoLoader();
  const [isOpenDrawer, setIsOpenDrawer] = useState<boolean>(false);

  return (
    <>
      {isOpenDrawer && <Drawer />}
      <U.MapLayout>
        <Map
          id="map"
          center={{ lat: lat, lng: lng }}
          className="map-style"
          level={2}
        >
          <CustomOverlayMap position={{ lat: lat, lng: lng }}>
            <CustomMarker
              onClick={() => {
                setIsOpenDrawer(!isOpenDrawer);
                console.log('click!');
              }}
            />
          </CustomOverlayMap>
        </Map>
      </U.MapLayout>
    </>
  );
}

export default UserTrailMap;
