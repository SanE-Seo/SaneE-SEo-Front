// src/pages/UserTrailEditor.tsx
import React, { useState, useRef, useEffect } from 'react';
import DefaultLayout from '../components/DefaultLayout';

import DetailsForm from '../components/UserTrailEditor/DetailsForm';
//import Modal from '../components/UserTrailEditor/Modal';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DrawTrail from '../components/UserTrailEditor/DrawTrail';
import { PolylineData, UserTrail } from '../@types/custom_trail';

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

  // const [userTrail, setUserTrail] = useState<UserTrail>(
  //   //   {
  //   //   author: '',
  //   //   title: '',
  //   //   region: '',
  //   //   distance: '',
  //   //   duration: '',
  //   //   difficulty: '',
  //   //   photos: [],
  //   //   introduction: '',
  //   //   polyline: {
  //   //     coordinate: '',
  //   //     points: [],
  //   //   },
  //   // }
  //   {
  //     // author: string;
  //     category: 1,
  //     title: '새로운 트레킹 코스',
  //     subTitle: '서울 중심부를 걷는 코스',
  //     description:
  //       '이 코스는 서울 중심부의 아름다운 경관을 볼 수 있는 트레킹 코스입니다.',
  //     level: '초급',
  //     time: '2시간 30분',
  //     distance: '5.5',
  //     courseDetail: '코스 상세',
  //     transportation: '교통편 정보',
  //     images: [],
  //     districtId: '1',
  //     geometry: {
  //       name: '',
  //       type: '',
  //       coordinates: [], // 폴리라인을 구성하는 점들의 배열
  //     },
  //   },
  // );

  const [trailData, setTrailData] = useState<PolylineData>();
  /*
  const mutation = useMutation<ApiResponse, Error, UserTrail, unknown>({
    mutationFn: async (newTrail) => {
      
      const formattedTrail = convertToAPIFormat(newTrail);
      const response: AxiosResponse<CommonResponse<unknown>> = await Post(
        '/api/posts', // Change the URL here
        formattedTrail,
      );
      return { message: response.data.message };
    },
  });
  */

  // function showToast(message: string) {
  //   alert(message);
  // }

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
