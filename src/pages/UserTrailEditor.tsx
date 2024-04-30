// src/pages/UserTrailEditor.tsx
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DefaultLayout from '../components/DefaultLayout';
import { Map, DrawingManager } from 'react-kakao-maps-sdk';
import useKakaoLoader from '../components/useKakaoLoader';
import { useLocation } from '../contexts/LocationContext';
import ProgressStepper from '../components/UserTrailEditor/ProgressStepper';
import DetailsForm from '../components/UserTrailEditor/DetailsForm';
//import Modal from '../components/UserTrailEditor/Modal';
// import DraggableButton from '../components/UserTrailEditor/DraggableButton';
import * as E from '../styles/user-trail-editor.style';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';

interface OverlayData {
  polyline: kakao.maps.drawing.DrawingPolylineData[];
}

export interface IFormData {
  title: string;
  region: string;
  distance: number;
  duration: number;
  difficulty: string;
  photos: File[];
  introduction: string;
}

interface UserTrail {
  author: string;
  title: string;
  region: string;
  distance: number;
  duration: number;
  difficulty: string;
  photos: File[];
  introduction: string;
  polyline: PolylineData;
}

interface PolylineData {
  coordinate: string; // 좌표계 정보
  points: { lat: number; lng: number }[]; // 폴리라인을 구성하는 점들의 배열
}

function UserTrailEditor() {
  useKakaoLoader();
  const navigate = useNavigate();
  const { latitude, longitude } = useLocation();
  const managerRef =
    useRef<
      kakao.maps.drawing.DrawingManager<kakao.maps.drawing.OverlayType.POLYLINE>
    >(null);
  const [polylines, setPolylines] = useState<
    kakao.maps.drawing.DrawingPolylineData[]
  >([]);

  const [userTrail, setUserTrail] = useState<UserTrail>({
    author: '',
    title: '',
    region: '',
    distance: 0,
    duration: 0,
    difficulty: '',
    photos: [],
    introduction: '',
    polyline: {
      coordinate: '',
      points: [],
    },
  });

  function selectOverlay(type: kakao.maps.drawing.OverlayType.POLYLINE) {
    const manager = managerRef.current;
    if (manager) {
      manager.cancel();
      manager.select(type);
    }
  }

  function checkPolylineLength() {
    const manager = managerRef.current;
    if (manager) {
      const data = manager.getData();
      setPolylines(data.polyline);
      if (data.polyline.length === 1) {
        return true;
      } else if (data.polyline.length > 1) {
        return false;
      } else {
        return false;
      }
    }
  }
  // 지도 상에 그린 폴리라인 데이터를 가져오는 함수
  function getOverlayData() {
    const manager = managerRef.current;
    if (manager) {
      const data = manager.getData();
      setPolylines(data.polyline); // 상태 업데이트
      if (checkPolylineLength()) {
        console.log('Polyline Data:', data.polyline[0]);
        setUserTrail((prev) => ({
          ...prev,
          polyline: {
            coordinate: 'wgs84', // 예시, 실제 사용하는 좌표체계로 변경 필요
            points: data.polyline[0].points.map((point) => ({
              lat: point.y, // 가정: point.y가 위도
              lng: point.x, // 가정: point.x가 경도
            })),
          },
        }));
      }
    }
  }

  const [currentStep, setCurrentStep] = useState(0);
  const [isAnimatingForward, setIsAnimatingForward] = useState(true);

  function handleNextStep() {
    if (currentStep < 2) {
      setCurrentStep((prevStep) => prevStep + 1);
      setIsAnimatingForward(true);
    }
  }

  const handlePrevStep = () => {
    if (currentStep > 0) {
      setCurrentStep((prevStep) => prevStep - 1);
      setIsAnimatingForward(false);
    }
  };

  const handleDetailsFormSubmit = (formData: IFormData) => {
    setUserTrail((prevState) => ({
      ...prevState,
      ...formData,
      photos: formData.photos,
      introduction: formData.introduction,
    }));
    console.log('Submitting details form...');
    handleNextStep(); // Move to the next step after state update
  };

  const stepContents = [
    {
      title: '코스 작성',
      render: (
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={() =>
              selectOverlay(kakao.maps.drawing.OverlayType.POLYLINE)
            }
          >
            Polyline
          </button>
        </div>
      ),
    },
    {
      title: '작성 완료',
      render: <DetailsForm onSubmit={handleDetailsFormSubmit} />,
    },
  ];

  useEffect(() => {
    console.log('User Trail updated:', userTrail);
  }, [userTrail]); // This useEffect will run whenever userTrail changes.

  return (
    <>
      <DefaultLayout />
      <E.HeaderLayout>
        <E.AddButton
          onClick={() => {
            if (currentStep === 0) {
              navigate('/community');
              return;
            }
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
        <E.AddButton
          onClick={() => {
            if (currentStep === 0 && checkPolylineLength()) {
              getOverlayData();
              handleNextStep();
            } else if (currentStep === 1) {
              const form = document.getElementById(
                'detailsForm',
              ) as HTMLFormElement | null;
              if (form) {
                form.requestSubmit(); // 폼을 직접 제출합니다.
              }
              handleNextStep();
            } else if (currentStep === 2) {
              console.log('Navigating to community...');
              navigate('/community');
            }
          }}
        >
          <span style={{ width: 25 }}></span>
          <span style={{ flex: 1, textAlign: 'center' }}>
            {currentStep < stepContents.length - 1 ? '내용 작성' : '작성 완료'}
          </span>
          <span className="button_icon-wrapper">
            <IoIosArrowForward width={15} height={15} />
          </span>
        </E.AddButton>
      </E.HeaderLayout>
      {currentStep === 0 && (
        <Map
          center={{ lat: latitude, lng: longitude }}
          style={{ width: '100%', height: '80vh' }}
          level={3}
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
              strokeColor: '#39f',
              hintStrokeStyle: 'dash',
              hintStrokeOpacity: 0.5,
            }}
          />
        </Map>
      )}
      {currentStep < stepContents.length && stepContents[currentStep].render}
    </>
  );
}

export default UserTrailEditor;
