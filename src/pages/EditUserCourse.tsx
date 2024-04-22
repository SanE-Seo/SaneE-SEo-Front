// src/pages/EditUserCourse.tsx
import React, { useState, useRef } from 'react';
import DefaultLayout from '../components/DefaultLayout';
import { Map, Polyline, CustomOverlayMap } from 'react-kakao-maps-sdk';
import useKakaoLoader from '../components/useKakaoLoader';
import { useLocation } from '../contexts/LocationContext';

type CircleData = {
  center: { lat: number; lng: number };
  radius: number;
};

declare global {
  interface Window {
    kakao: any;
  }
}

function EditUserCourse() {
  useKakaoLoader();
  const { latitude, longitude } = useLocation();
  const [isDrawing, setIsDrawing] = useState(false);
  const drawingLineRef = useRef<kakao.maps.Polyline>(null);
  const [mousePosition, setMousePosition] = useState({
    lat: 0,
    lng: 0,
  });
  const [clickLine, setClickLine] = useState<kakao.maps.Polyline>();
  const [paths, setPaths] = useState([
    {
      lat: 0,
      lng: 0,
    },
  ]);
  const [distances, setDistances] = useState([]);
  const [moveLine, setMoveLine] = useState<kakao.maps.Polyline>();

  const handleClick = (_map: any, mouseEvent: kakao.maps.event.MouseEvent) => {
    if (!isDrawing) {
      setDistances([]);
      setPaths([]);
    }
    setPaths((prev) => [
      ...prev,
      {
        lat: mouseEvent.latLng.getLat(),
        lng: mouseEvent.latLng.getLng(),
      },
    ]);
    setDistances((prev) => {
      if (!prev) return prev; // 또는 적절한 기본값을 반환할 수 있습니다.

      setIsDrawing(true);
      return {
        ...prev,
        distance: Math.round(clickLine!.getLength() + moveLine!.getLength()),
      };
    });
  };

  const handleMouseMove = (
    _map: any,
    mouseEvent: kakao.maps.event.MouseEvent,
  ) => {
    setMousePosition({
      lat: mouseEvent.latLng.getLat(),
      lng: mouseEvent.latLng.getLng(),
    });

    console.log(mousePosition);
  };

  const handleRightClick = (_mouseEvent: any) => {
    setIsDrawing(false);
  };

  return (
    <DefaultLayout>
      <div>
        <Map
          id="map"
          center={{ lat: latitude, lng: longitude }}
          style={{ width: '100%', height: '89.2vh' }}
          level={2}
          onClick={handleClick}
          onRightClick={handleRightClick}
          onMouseMove={handleMouseMove}
        >
          <Polyline
            path={paths}
            strokeWeight={3} // 선의 두께입니다
            strokeColor={'#db4040'} // 선의 색깔입니다
            strokeOpacity={1} // 선의 불투명도입니다 0에서 1 사이값이며 0에 가까울수록 투명합니다
            strokeStyle={'solid'} // 선의 스타일입니다
            onCreate={setClickLine}
          />
          {paths.map((path) => (
            <CustomOverlayMap
              key={`dot-${path.lat},${path.lng}`}
              position={path}
              zIndex={1}
            >
              <span className="dot"></span>
            </CustomOverlayMap>
          ))}

          <Polyline
            path={isDrawing ? [paths[paths.length - 1], mousePosition] : []}
            strokeWeight={3} // 선의 두께입니다
            strokeColor={'#db4040'} // 선의 색깔입니다
            strokeOpacity={0.5} // 선의 불투명도입니다 0에서 1 사이값이며 0에 가까울수록 투명합니다
            strokeStyle={'solid'} // 선의 스타일입니다
            onCreate={setMoveLine}
          />
          {isDrawing && (
            <CustomOverlayMap position={mousePosition} yAnchor={1} zIndex={2}>
              <div className="dotOverlay distanceInfo">
                총거리{' '}
                <span className="number">
                  {Math.round(clickLine!.getLength() + moveLine!.getLength())}
                </span>
                m
              </div>
            </CustomOverlayMap>
          )}
        </Map>
      </div>
    </DefaultLayout>
  );
}

export default EditUserCourse;
