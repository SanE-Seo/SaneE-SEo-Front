import React, { useState, useRef, useEffect } from 'react';
import { Map, DrawingManager, Polyline } from 'react-kakao-maps-sdk';
import { HiOutlinePencil } from 'react-icons/hi';
import { MdOutlineEdit, MdMyLocation } from 'react-icons/md';
import useKakaoLoader from '../useKakaoLoader';
import {
  useCurrentLocation,
  useGeolocation,
} from '../../contexts/LocationContext';
import colors from '../../styles/theme';
import { ToastContainer, toast } from 'react-toastify';
import * as E from '../../styles/user-trail-editor.style';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import ProgressStepper from './ProgressStepper';
import { PolylineData, UserTrail } from '../../@types/custom';
import * as C from '../../styles/community.style';
import { ReactComponent as SearchIcon } from '../../assets/icons/search-icon.svg';
import PlaceSearchModal from '../Community/PlaceSearchModal';

type DrawTrailProps = {
  handlePrevStep: () => void;
  currentStep: number;
  isAnimatingForward: boolean;
  handleNextStep: () => void;
  setTrailData: (value: PolylineData) => void;
  setDistance: (value: string) => void;
};
function DrawTrail({
  handlePrevStep,
  currentStep,
  isAnimatingForward,
  handleNextStep,
  setTrailData,
  setDistance,
}: DrawTrailProps) {
  // convertDrawingPolylineToPolyline에 쓰이는 인터페이스
  interface DrawingPolylineData {
    points: { x: number; y: number }[];
  }

  useKakaoLoader();
  const [mapKey, setMapKey] = useState(0);
  const { latitude, longitude } = useGeolocation();

  const [placeInput, setPlaceInput] = useState<string>('');
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const [lat, setLat] = useState<number>(latitude);
  const [lng, setLng] = useState<number>(longitude);
  const mapRef = useRef<kakao.maps.Map | null>(null);
  const managerRef =
    useRef<
      kakao.maps.drawing.DrawingManager<kakao.maps.drawing.OverlayType.POLYLINE>
    >(null);
  const [polylines, setPolylines] = useState<
    kakao.maps.drawing.DrawingPolylineData[]
  >([]);
  const [distanceData, setDistanceData] = useState<number[]>([]);

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

  // polyline의 길이를 구하는 함수
  const getDistance = (drawingData: DrawingPolylineData): string => {
    const path = drawingData.points.map(
      (point) => new kakao.maps.LatLng(point.y, point.x),
    );

    const mapInstance = mapRef.current || undefined;
    const polylineOptions: kakao.maps.PolylineOptions = {
      path: path,
      map: mapInstance, // Assign the map instance or undefined
    };

    const polyline = new kakao.maps.Polyline(polylineOptions);
    const distance = Math.floor(polyline.getLength());

    const distanceInKm = (distance / 1000).toFixed(2) + 'Km'; // m를 km로 변환하고 문자열 형태로 포맷팅
    return distanceInKm; // '1.4km' 등의 형식으로 반환
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
        // 경로의 거리를 구함.
        const distance = getDistance(data.polyline[0]);
        setDistance(distance);
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
        {/* <E.AddButton
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
        </E.AddButton> */}
        <C.SearchContainer>
          <SearchIcon />
          <input
            name="text"
            placeholder="지역을 검색하세요"
            value={placeInput}
            onChange={(e) => {
              setPlaceInput(e.target.value);
              setIsOpen(true);
            }}
          ></input>
        </C.SearchContainer>

        <div
          style={{
            position: 'fixed',
            top: '16%', // 상단에서 50% 위치에
            left: '50%', // 좌측에서 50% 위치에
            transform: 'translate(-50%, -50%)', // 자신의 크기만큼 반대 방향으로 이동
          }}
        >
          <ProgressStepper
            currentStep={currentStep}
            isAnimatingForward={isAnimatingForward}
          />
        </div>

        <E.AddButton onClick={handleSubmit}>
          <span style={{ width: 25 }}></span>
          <span style={{ flex: 1, textAlign: 'center' }}>내용작성</span>
          <span className="button_icon-wrapper">
            <IoIosArrowForward width={15} height={15} />
          </span>
        </E.AddButton>
      </E.HeaderLayout>
      {isOpen && (
        <PlaceSearchModal
          placeInput={placeInput}
          setPlaceInput={setPlaceInput}
          setIsOpen={setIsOpen}
          setLat={setLat}
          setLng={setLng}
        />
      )}
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
          center={{ lat: lat, lng: lng }}
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
