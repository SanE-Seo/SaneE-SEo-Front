import { useKakaoLoader as useKakaoLoaderOrigin } from 'react-kakao-maps-sdk';

const KAKAO_API_KEY: string = process.env.REACT_APP_KAKAO_MAP_API_KEY as string;

export default function useKakaoLoader() {
  useKakaoLoaderOrigin({
    appkey: KAKAO_API_KEY,
    libraries: ['clusterer', 'drawing', 'services'],
  });
}
