export type UserTrail<T> = {
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
  geometry: T;
};

export type trailData = {
  name: string;
  type: string;
  coordinates: number[][];
};

export type PolylineData = {
  name: string;
  type: string;
  coordinates: { lat: number; lng: number }[]; // 폴리라인을 구성하는 점들의 배열
};
