// src/pages/EditUserCourse.tsx
import React, { useState, useRef } from 'react';
import DefaultLayout from '../components/DefaultLayout';
import { Map, Circle, Polyline, CustomOverlayMap } from 'react-kakao-maps-sdk';
import useKakaoLoader from '../components/useKakaoLoader';
import { useLocation } from '../contexts/LocationContext';

type CircleData = {
  center: { lat: number; lng: number };
  radius: number;
};

function EditUserCourse() {
  useKakaoLoader();
  const { latitude, longitude } = useLocation();
  const [isDrawing, setIsDrawing] = useState(false);
  const [drawingCircleData, setDrawingCircleData] = useState<CircleData | null>(
    null,
  );
  const drawingLineRef = useRef<kakao.maps.Polyline>(null);
  const [circles, setCircles] = useState([]);
  const [mousePosition, setMousePosition] = useState({
    lat: 0,
    lng: 0,
  });

  const handleClick = (_prev: any, mouseEvent: any): void => {
    if (!isDrawing) {
      setDrawingCircleData({
        center: {
          lat: mouseEvent.latLng.getLat(),
          lng: mouseEvent.latLng.getLng(),
        },
        radius: 0,
      });
      setIsDrawing(true);
    }
  };

  const handleMouseMove = (_prev: any, mouseEvent: any) => {
    setMousePosition({
      lat: mouseEvent.latLng.getLat(),
      lng: mouseEvent.latLng.getLng(),
    });

    if (isDrawing) {
      const drawingLine = drawingLineRef.current;
      // drawingLine이 undefined가 아닐 때만 로직을 실행합니다.
      if (drawingLine) {
        setDrawingCircleData((prev) => {
          // prev가 undefined일 수 있다는 것을 체크합니다.
          if (!prev) return prev; // 또는 적절한 기본값을 반환할 수 있습니다.

          const newRadius = drawingLine.getLength(); // 예시에서 drawingLine.getLength()의 반환 타입은 number라고 가정합니다.
          return {
            ...prev,
            radius: newRadius,
            // center는 이미 prev에 정의되어 있으므로, 여기서는 변경하지 않습니다.
          };
        });
      }
    }
  };

  const handleRightClick = (mouseEvent: any) => {
    if (isDrawing) {
      setIsDrawing(false);
      setCircles((prev) => {
        // prev가 undefined일 수 있다는 것을 체크합니다.
        if (!prev) return prev; // 또는 적절한 기본값을 반환할 수 있습니다.
        return {
          ...prev,
          ...drawingCircleData,
          mousePosition,
        };
      });
    }
  };

  return (
    <DefaultLayout>
      <div>
        <Map
          id="map"
          center={{ lat: latitude, lng: longitude }}
          style={{ width: '100%', height: '400px' }}
          level={3}
          onClick={handleClick}
          onRightClick={handleRightClick}
          onMouseMove={handleMouseMove}
        >
          {isDrawing && (
            <>
              <Circle
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                center={drawingCircleData!.center}
                radius={drawingCircleData!.radius}
                strokeWeight={1} // 선의 두께입니다
                strokeColor={'#00a0e9'} // 선의 색깔입니다
                strokeOpacity={0.1} // 선의 불투명도입니다 0에서 1 사이값이며 0에 가까울수록 투명합니다
                strokeStyle={'solid'} // 선의 스타일입니다
                fillColor={'#00a0e9'} // 채우기 색깔입니다
                fillOpacity={0.2} // 채우기 불투명도입니다
              />
              <Polyline
                path={[drawingCircleData!.center, mousePosition]}
                ref={drawingLineRef}
                strokeWeight={3} // 선의 두께 입니다
                strokeColor={'#00a0e9'} // 선의 색깔입니다
                strokeOpacity={1} // 선의 불투명도입니다 0에서 1 사이값이며 0에 가까울수록 투명합니다
                strokeStyle={'solid'} // 선의 스타일입니다
              />
              <CustomOverlayMap
                position={mousePosition}
                xAnchor={0}
                yAnchor={0}
                zIndex={1}
              >
                <div className="info">
                  반경{' '}
                  <span className="number">
                    {Math.floor(drawingCircleData!.radius)}
                  </span>
                  m
                </div>
              </CustomOverlayMap>
            </>
          )}
        </Map>
      </div>
    </DefaultLayout>
  );
}

export default EditUserCourse;
