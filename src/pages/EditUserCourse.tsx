// src/pages/EditUserCourse.tsx
import React, { useRef } from 'react';
import DefaultLayout from '../components/DefaultLayout';
import { Map, DrawingManager } from 'react-kakao-maps-sdk';
import useKakaoLoader from '../components/useKakaoLoader';
import { useLocation } from '../contexts/LocationContext';

function EditUserCourse() {
  useKakaoLoader();

  const { latitude, longitude } = useLocation();

  const managerRef =
    useRef<
      kakao.maps.drawing.DrawingManager<
        | kakao.maps.drawing.OverlayType.MARKER
        | kakao.maps.drawing.OverlayType.POLYLINE
      >
    >(null);

  function selectOverlay(
    type:
      | kakao.maps.drawing.OverlayType.MARKER
      | kakao.maps.drawing.OverlayType.POLYLINE,
  ) {
    const manager = managerRef.current;
    if (manager) {
      manager.cancel();
      manager.select(type);
    }
  }

  return (
    <>
      <DefaultLayout>
        <div>
          <Map
            center={{ lat: latitude, lng: longitude }}
            style={{ width: '100%', height: '80vh' }}
            level={3}
          >
            <DrawingManager
              ref={managerRef}
              drawingMode={['marker', 'polyline']}
              guideTooltip={['draw', 'drag', 'edit']}
              markerOptions={{
                draggable: true,
                removable: true,
              }}
              polylineOptions={{
                draggable: true,
                removable: true,
                editable: true,
                strokeWeight: 2,
                strokeColor: '#39f',
                hintStrokeStyle: 'dash',
                hintStrokeOpacity: 0.5,
              }}
            />
          </Map>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              onClick={() =>
                selectOverlay(kakao.maps.drawing.OverlayType.MARKER)
              }
            >
              Marker
            </button>
            <button
              onClick={() =>
                selectOverlay(kakao.maps.drawing.OverlayType.POLYLINE)
              }
            >
              Polyline
            </button>
          </div>
        </div>
      </DefaultLayout>
    </>
  );
}

export default EditUserCourse;
