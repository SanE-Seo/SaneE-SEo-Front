export type PostData = {
  title: string;
  subTitle: string;
  time: string;
  distance: string;
  level: string;
  postId: number;
  description: string;
  courseDetail: string;
  transportation: string;
  coordinate: {
    lat: number;
    lng: number;
    type: string;
    coordinates: number[][];
  };
  districtName: string[];
  images: {
    id: number;
    imageUrl: string;
  };
};
