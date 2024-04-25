// src/pages/UserTrailEditor.tsx
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DefaultLayout from '../components/DefaultLayout';
import { Map, DrawingManager } from 'react-kakao-maps-sdk';
import useKakaoLoader from '../components/useKakaoLoader';
import { useLocation } from '../contexts/LocationContext';
import ProgressStepper from '../components/ProgressStepper';
import * as E from '../styles/user-trail-editor.style';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';

function UserTrailEditor() {
  useKakaoLoader();
  const navigate = useNavigate();

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

  const [currentStep, setCurrentStep] = useState(0);
  const [isAnimatingForward, setIsAnimatingForward] = useState(true);
  const [formData, setFormData] = useState({
    trailName: '',
    description: '',
  });

  const handleNextStep = () => {
    if (currentStep < 2) {
      setCurrentStep((prevStep) => prevStep + 1);
      setIsAnimatingForward(true);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 0) {
      setCurrentStep((prevStep) => prevStep - 1);
      setIsAnimatingForward(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (currentStep === 2) {
      // 3단계에 해당하는 step 인덱스가 2라고 가정
      setTimeout(() => {
        navigate('/community');
      }, 1000); // 2초 후에 Community 페이지로 이동
    }
  }, [currentStep, navigate]); // Dependencies는 currentStep과 navigate 함수를 포함

  const stepContents = [
    {
      title: '상세 정보 입력',
      render: (
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={() => selectOverlay(kakao.maps.drawing.OverlayType.MARKER)}
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
      ),
    },
    {
      title: '작성 완료',
      render: (
        <form>
          <label>
            Trail Name:
            <input
              type="text"
              name="trailName"
              value={formData.trailName}
              onChange={handleInputChange}
              placeholder="Enter trail name"
            />
          </label>
          <label>
            Description:
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Describe the trail"
            />
          </label>
          <button
            type="submit"
            onClick={(e) => {
              e.preventDefault();
              handleNextStep();
            }}
          >
            Submit
          </button>
        </form>
      ),
    },
  ];

  return (
    <>
      <DefaultLayout />
      <E.HeaderLayout>
        <E.AddButton onClick={handlePrevStep}>
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
        <E.AddButton onClick={handleNextStep}>
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
            drawingMode={['marker', 'polyline']}
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
