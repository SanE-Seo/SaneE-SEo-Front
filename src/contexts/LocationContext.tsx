// src/contexts/LocationContext.tsx
import React, { createContext, useState, useContext, useEffect } from 'react';

// 위치 정보와 함수를 포함한 타입 정의
interface LocationState {
  latitude: number;
  longitude: number;
  fetchLocation: () => void; // 위치 정보를 갱신하는 함수를 포함
}

// 초기 상태 정의 (함수 포함)
const initialLocationState: LocationState = {
  latitude: 33.450701,
  longitude: 126.570667,
  fetchLocation: () => {
    // Placeholder function for fetching location.
    // Implement the actual logic here.
  },
};

// 컨텍스트 생성 (초기 상태 포함)
const LocationContext = createContext<LocationState>(initialLocationState);

type LocationProviderProps = {
  children: React.ReactNode;
};

const getIp = async () =>
  await fetch('https://geolocation-db.com/json/')
    .then((res) => res.json())
    .then((res) => res['IPv4']);

export const useGeolocation = () => {
  const [geo, setGeo] = useState({
    latitude: 37.5642135,
    longitude: 127.0016985,
  });
  const getLocation = async () => {
    const nowIp = await getIp();
    const geoData = await fetch(`http://ip-api.com/json/${nowIp}`)
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        return res;
      });
    const latitude = geoData.lat;
    const longitude = geoData.lon;
    setGeo({ latitude: latitude, longitude: longitude });
  };
  useEffect(() => {
    getLocation();
  }, []);

  return geo;
};
// // 컨텍스트 제공자 생성
// export const LocationProvider: React.FC<LocationProviderProps> = ({
//   children,
// }) => {
//   const [location, setLocation] = useState<LocationState>({
//     ...initialLocationState,
//     fetchLocation: () => {
//       if (navigator.geolocation) {
//         navigator.geolocation.getCurrentPosition(
//           (position) => {
//             setLocation((prevState) => ({
//               ...prevState,
//               latitude: position.coords.latitude,
//               longitude: position.coords.longitude,
//             }));
//           },
//           (error) => {
//             console.error('Geolocation error:', error);
//           },
//         );
//       }
//     },
//   });

//   useEffect(() => {
//     location.fetchLocation();
//   }, [location]);

//   return (
//     <LocationContext.Provider value={location}>
//       {children}
//     </LocationContext.Provider>
//   );
// };

export const useCurrentLocation = () => {
  const context = useContext(LocationContext);
  if (context === undefined) {
    throw new Error('useLocation must be used within a LocationProvider');
  }
  return context;
};
