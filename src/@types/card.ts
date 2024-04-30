export type CardData = {
  title: string;
  subTitle: string;
  time: string;
  likes: number;
  distance: string;
  level: string;
  postId: number;
  postImages: PostImage[];
};

type PostImage = {
  imageUrl: string;
};
