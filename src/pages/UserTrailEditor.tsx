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
import { HiOutlinePencil } from 'react-icons/hi';
import { MdOutlineEdit, MdMyLocation } from 'react-icons/md';

import { useMutation } from '@tanstack/react-query';
import { Post } from '../apis/index';
import { AxiosResponse } from 'axios';
import colors from '../styles/theme';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
function convertToAPIFormat(userTrail: UserTrail): APIPostData {
  return {
    title: userTrail.title,
    subTitle: userTrail.subTitle,
    description: userTrail.description,
    level: userTrail.level,
    time: userTrail.time,
    distance: userTrail.distance,
    courseDetail: userTrail.courseDetail,
    transportation: userTrail.transportation,
    coordinate: {
      name: userTrail.geometry.name,
      lat: userTrail.geometry.coordinates[0].lat, // Assuming the first point is representative
      lng: userTrail.geometry.coordinates[0].lng,
      shape: 'Polyline', // This needs to be defined based on your actual usage
    },
    images: userTrail.images.map((image) => ({ imageUrl: image.name })), // Adjust according to how you manage image URLs
    districtIds: [parseInt(userTrail.districtId)], // Adjust based on actual logic
  };
}

interface ApiResponse {
  message: string;
}

interface CommonResponse<T> {
  data: T;
  message: string;
}

interface OverlayData {
  polyline: kakao.maps.drawing.DrawingPolylineData[];
}

export interface IFormData {
  title: string;
  subTitle: string;
  description: string;
  level: string;
  time: string;
  distance: string;
  courseDetail: string;
  transportation: string;
  images: File[];
  districtId: string;
}

interface UserTrail {
  // author: string;
  category: number;
  title: string;
  subTitle: string;
  description: string;
  level: string;
  time: string;
  distance: string;
  courseDetail: string;
  transportation: string;
  images: File[];
  districtId: string;
  geometry: PolylineData;
}

interface PolylineData {
  name: string;
  type: string;
  coordinates: { lat: number; lng: number }[]; // 폴리라인을 구성하는 점들의 배열
}

function UserTrailEditor() {
  useKakaoLoader();
  const navigate = useNavigate();
  const { latitude, longitude } = useLocation();
  const mapRef = useRef<kakao.maps.Map | null>(null);
  const managerRef =
    useRef<
      kakao.maps.drawing.DrawingManager<kakao.maps.drawing.OverlayType.POLYLINE>
    >(null);
  const [polylines, setPolylines] = useState<
    kakao.maps.drawing.DrawingPolylineData[]
  >([]);
  const [userTrail, setUserTrail] = useState<UserTrail>(
    //   {
    //   author: '',
    //   title: '',
    //   region: '',
    //   distance: '',
    //   duration: '',
    //   difficulty: '',
    //   photos: [],
    //   introduction: '',
    //   polyline: {
    //     coordinate: '',
    //     points: [],
    //   },
    // }
    {
      // author: string;
      category: 1,
      title: '새로운 트레킹 코스',
      subTitle: '서울 중심부를 걷는 코스',
      description:
        '이 코스는 서울 중심부의 아름다운 경관을 볼 수 있는 트레킹 코스입니다.',
      level: '초급',
      time: '2시간 30분',
      distance: '5.5',
      courseDetail: '코스 상세',
      transportation: '교통편 정보',
      images: [],
      districtId: '1',
      geometry: {
        name: '',
        type: '',
        coordinates: [], // 폴리라인을 구성하는 점들의 배열
      },
    },
  );
  const [currentStep, setCurrentStep] = useState(0);
  const [isAnimatingForward, setIsAnimatingForward] = useState(true);
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

  const [mapKey, setMapKey] = useState(0);

  // function showToast(message: string) {
  //   alert(message);
  // }

  function selectOverlay(type: kakao.maps.drawing.OverlayType.POLYLINE) {
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
  }

  function checkPolylineLength() {
    const manager = managerRef.current;
    if (manager) {
      const data = manager.getData();
      setPolylines(data.polyline);
      if (data.polyline.length === 0) {
        toast.error('경로를 그려주세요.', {
          position: 'top-center',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        return false; // No polyline present, show error
      } else if (data.polyline.length === 1) {
        return true; // One polyline present, valid to proceed
      } else {
        return false; // More than one polyline present, not expected in your case
      }
    }
    return false; // Default case to handle unexpected conditions
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
          geometry: {
            name: 'User Trail',
            type: 'Polyline',
            coordinates: data.polyline[0].points.map((point) => ({
              lat: point.y,
              lng: point.x,
            })),
            // coordinate: 'wgs84', // 예시, 실제 사용하는 좌표체계로 변경 필요
            // // points: data.polyline[0].points.map((point) => ({
            // //   lat: point.y, // 가정: point.y가 위도
            // //   lng: point.x, // 가정: point.x가 경도
            // // })),
          },
        }));
      }
    }
  }

  function moveToCurrentLocation() {
    if (mapRef.current) {
      const center = new kakao.maps.LatLng(latitude, longitude);
      mapRef.current.setCenter(center);
    }
  }

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
      images: formData.images,
      title: formData.title,
      subTitle: formData.subTitle,
      description: formData.description,
      level: formData.level,
      time: formData.time,
      distance: formData.distance,
      courseDetail: formData.courseDetail,
      transportation: formData.transportation,
      districtId: formData.districtId,
    }));
    console.log('User Trail updated with form data:', userTrail);
    handleNextStep(); // Move to the next step after state update
  };

  useEffect(() => {
    console.log('User Trail updated:', userTrail);
  }, [userTrail]); // This useEffect will run whenever userTrail changes.

  const stepContents = [
    {
      title: '코스 작성',
      render: (
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
      ),
    },
    {
      title: '작성 완료',
      render: <DetailsForm onSubmit={handleDetailsFormSubmit} />,
    },
  ];

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
            if (currentStep === 0) {
              if (checkPolylineLength()) {
                // Check if the polyline is present and correct
                getOverlayData();
                handleNextStep();
              } // The toast error is triggered inside the checkPolylineLength if needed
            } else if (currentStep === 1) {
              console.log('Sending data to server:', userTrail);
              // handleNextStep();
              /*
              mutation.mutate(userTrail, {
                onSuccess: () => {
                  console.log('Trail posted successfully');
                  navigate('/community');
                },
                onError: (error: any) => {
                  console.error('Error posting trail:', error);
                },
              });
              */
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
      {currentStep < stepContents.length && (
        <>{stepContents[currentStep].render}</>
      )}
      <ToastContainer />
    </>
  );
}

export default UserTrailEditor;
