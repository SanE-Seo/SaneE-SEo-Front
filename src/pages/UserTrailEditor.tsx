// src/pages/UserTrailEditor.tsx
import React, { useState } from 'react';
import DefaultLayout from '../components/DefaultLayout';

import DetailsForm from '../components/UserTrailEditor/DetailsForm';
//import Modal from '../components/UserTrailEditor/Modal';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DrawTrail from '../components/UserTrailEditor/DrawTrail';
import { PolylineData } from '../@types/custom';

interface APIImage {
  imageUrl: string;
}

interface APICoordinate {
  name: string;
  lat: number;
  lng: number;
  shape: string; // Assuming 'shape' is a required string describing the geometry
}

interface APIPostData {
  title: string;
  subTitle: string;
  description: string;
  level: string;
  time: string;
  distance: string;
  courseDetail: string;
  transportation: string;
  coordinate: APICoordinate;
  images: APIImage[];
  districtIds: number[];
}

// Convert local UserTrail format to the required API format

interface OverlayData {
  polyline: kakao.maps.drawing.DrawingPolylineData[];
}

function UserTrailEditor() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isAnimatingForward, setIsAnimatingForward] = useState(true);

  const [trailData, setTrailData] = useState<PolylineData>();

  const [distance, setDistance] = useState('');

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

  const stepContents = [
    {
      title: '코스 작성',
      render: (
        <DrawTrail
          currentStep={currentStep}
          handlePrevStep={handlePrevStep}
          handleNextStep={handleNextStep}
          isAnimatingForward={isAnimatingForward}
          setTrailData={setTrailData}
          setDistance={setDistance}
        />
      ),
    },
    {
      title: '작성 완료',
      render: (
        <DetailsForm
          currentStep={currentStep}
          handlePrevStep={handlePrevStep}
          handleNextStep={handleNextStep}
          isAnimatingForward={isAnimatingForward}
          trailData={trailData!}
          distance={distance}
        />
      ),
    },
  ];

  return (
    <>
      <DefaultLayout />
      {currentStep < stepContents.length && (
        <>{stepContents[currentStep].render}</>
      )}
      <ToastContainer />
    </>
  );
}

export default UserTrailEditor;
