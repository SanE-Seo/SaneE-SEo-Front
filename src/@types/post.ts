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
  geometry: {
    type: string;
    coordinates: latlng[];
  };

  districtName: string[];
  images: {
    id: number;
    imageUrl: string;
  };
};
export type latlng = {
  lat: number;
  lng: number;
};
