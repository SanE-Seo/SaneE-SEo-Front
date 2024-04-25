import React from 'react';
import useKakaoLoader from '../useKakaoLoader';
import { Map, Polyline, CustomOverlayMap } from 'react-kakao-maps-sdk';

import * as U from '../../styles/user-trail-map.style';
type MapProps = {
  lat: number;
  long: number;
};
function UserTrailMap({ lat, long }: MapProps) {
  useKakaoLoader();

  return (
    <U.MapLayout>
      <Map
        id="map"
        center={{ lat: lat, lng: long }}
        className="map-style"
        level={2}
      ></Map>
    </U.MapLayout>
  );
}

export default UserTrailMap;
