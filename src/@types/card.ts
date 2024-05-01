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
};

type PostImage = {
  imageUrl: string;
};
