export type PostData = {
  title: string;
  subTitle: string;
  time: string;
  distance: string;
  level: string;
  id: number;
  description: string;
  courseDetail: string;
  transportation: string;
  authorId: number;
  authorName: string;
  authorProfile: string;
  geometry: {
    type: string;
    coordinates: latlng[];
  };

  districtName: string[];
  images: imageProps[];
};
export type latlng = {
  lat: number;
  lng: number;
};

type imageProps = {
  id: number;
  imageUrl: string;
};
