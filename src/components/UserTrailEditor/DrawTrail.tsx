import React, { useState, useRef, useEffect } from 'react';
import { Map, DrawingManager } from 'react-kakao-maps-sdk';
import { HiOutlinePencil } from 'react-icons/hi';
import { MdOutlineEdit, MdMyLocation } from 'react-icons/md';
import useKakaoLoader from '../useKakaoLoader';
import { useLocation } from '../../contexts/LocationContext';
import colors from '../../styles/theme';
import { ToastContainer, toast } from 'react-toastify';
import * as E from '../../styles/user-trail-editor.style';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import ProgressStepper from './ProgressStepper';
import { PolylineData, UserTrail } from '../../@types/custom_trail';

type DrawTrailProps = {
  handlePrevStep: () => void;
  currentStep: number;
  isAnimatingForward: boolean;
  handleNextStep: () => void;
  setTrailData: (value: PolylineData) => void;
};
function DrawTrail({
  handlePrevStep,
  currentStep,
  isAnimatingForward,
  handleNextStep,
  setTrailData,
}: DrawTrailProps) {
  useKakaoLoader();
  const [mapKey, setMapKey] = useState(0);
  const { latitude, longitude } = useLocation();
  const mapRef = useRef<kakao.maps.Map | null>(null);
  const managerRef =
    useRef<
      kakao.maps.drawing.DrawingManager<kakao.maps.drawing.OverlayType.POLYLINE>
    >(null);
  const [polylines, setPolylines] = useState<
    kakao.maps.drawing.DrawingPolylineData[]
  >([]);

  //   useEffect(() => {
  //     console.log('User Trail updated:', userTrail);
  //   }, [userTrail]); // This useEffect will run whenever userTrail changes.

  const selectOverlay = (type: kakao.maps.drawing.OverlayType.POLYLINE) => {
    const manager = managerRef.current;
    if (manager) {
      const existingPolylines = manager.getData().polyline;
      if (existingPolylines.length >= 1) {
        toast.dismiss();
        toast.error('경로는 하나만 그릴 수 있어요.', {
          position: 'top-center',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else {
        manager.cancel(); // 기존 작업 취소
        manager.select(type);
      }
    }
  };

  const checkPolylineLength = () => {
    const manager = managerRef.current;
    if (manager) {
      const data = manager.getData();
      setPolylines(data.polyline);
      if (data.polyline.length === 0) {
        return false; // No polyline present, show error
      } else if (data.polyline.length === 1) {
        return true; // One polyline present, valid to proceed
      } else {
        return false; // More than one polyline present, not expected in your case
      }
    }
    return false; // Default case to handle unexpected conditions
  };

  // 지도 상에 그린 폴리라인 데이터를 가져오는 함수
  const getOverlayData = () => {
    const manager = managerRef.current;
    if (manager) {
      const data = manager.getData();
      setPolylines(data.polyline); // 상태 업데이트
      if (checkPolylineLength()) {
        console.log('Polyline Data:', data.polyline[0]);
        setTrailData({
          name: 'User Trail',
          type: 'Polyline',
          coordinates: data.polyline[0].points.map((point) => ({
            lat: point.y,
            lng: point.x,
          })),
        });
        // coordinate: 'wgs84', // 예시, 실제 사용하는 좌표체계로 변경 필요
        // // points: data.polyline[0].points.map((point) => ({
        // //   lat: point.y, // 가정: point.y가 위도
        // //   lng: point.x, // 가정: point.x가 경도
        // // })),
      }
    }
  };

  const moveToCurrentLocation = () => {
    if (mapRef.current) {
      const center = new kakao.maps.LatLng(latitude, longitude);
      mapRef.current.setCenter(center);
    }
  };

  const handleSubmit = () => {
    const valid = checkPolylineLength();
    if (valid) {
      // Check if the polyline is present and correct
      getOverlayData();
      handleNextStep();
    } else {
      toast.error('경로를 그려주세요.', {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  const navigate = useNavigate();
  return (
    <>
      <E.HeaderLayout>
        <E.AddButton
          onClick={() => {
            navigate('/community');
            handlePrevStep();
          }}
        >
          <span className="button_icon-wrapper">
            <IoIosArrowBack width={15} height={15} />
          </span>
          <span style={{ flex: 1, textAlign: 'center' }}>이전 단계</span>
          <span style={{ width: 25 }}></span>
        </E.AddButton>

        <ProgressStepper
          currentStep={currentStep}
          isAnimatingForward={isAnimatingForward}
        />

        <E.AddButton onClick={handleSubmit}>
          <span style={{ width: 25 }}></span>
          <span style={{ flex: 1, textAlign: 'center' }}>내용작성</span>
          <span className="button_icon-wrapper">
            <IoIosArrowForward width={15} height={15} />
          </span>
        </E.AddButton>
      </E.HeaderLayout>
      <div
        style={{
          position: 'relative',
          width: '100vw',
          minWidth: '1100px',
          height: 'calc(100vh - 140px)',
          overflow: 'hidden',
        }}
      >
        <Map
          key={mapKey} // Key to force re-render
          center={{ lat: latitude, lng: longitude }}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
          }}
          level={3}
          onCreate={(map) => (mapRef.current = map)} // This assigns the map instance once created
        >
          <DrawingManager
            ref={managerRef}
            drawingMode={['polyline']}
            guideTooltip={['draw', 'drag', 'edit']}
            markerOptions={{ draggable: true, removable: true }}
            polylineOptions={{
              draggable: true,
              removable: true,
              editable: true,
              strokeWeight: 2,
              strokeColor: '#FF6450',
              hintStrokeStyle: 'dash',
              hintStrokeOpacity: 0.5,
            }}
          />
        </Map>
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '10px',
            transform: 'translateY(-70%)',
            zIndex: 1000,
          }}
        >
          <button
            style={{
              marginBottom: '20px', // Adjust spacing between buttons
              width: '50px',
              height: '50px',
              borderRadius: '50%',
              backgroundColor: colors.colors.green600,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
            }}
            onClick={() =>
              selectOverlay(kakao.maps.drawing.OverlayType.POLYLINE)
            }
          >
            <div
              style={{
                backgroundColor: colors.colors.green600,
                borderRadius: '50%',
                padding: '8px',
              }}
            >
              <MdOutlineEdit color="#FFFFFF" size={20} />
            </div>
          </button>
          <button
            style={{
              width: '50px',
              height: '50px',
              borderRadius: '50%',
              backgroundColor: colors.colors.green600,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'background-color 0.3s ease',
            }}
            onClick={moveToCurrentLocation}
          >
            <MdMyLocation color="#FFFFFF" size={20} />
          </button>
        </div>
      </div>
    </>
  );
}

export default DrawTrail;
