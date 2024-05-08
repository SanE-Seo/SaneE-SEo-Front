export type CardData = {
  title: string;
  subTitle: string;
  time: string;
  likes: number;
  distance: string;
  level: string;
  postId: number;
  postImages: PostImage[];
  authorId: number;
  authorName: string;
  authorProfile: string;
  lat: number;
  lng: number;
  category: number;
};

export type PostImage = {
  imageUrl: string;
};
