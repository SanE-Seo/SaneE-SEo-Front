import axios from 'axios';

type AxiosResponse = {
  success: boolean;
  message: string;
  data: any;
};

type CardData = {
  title: string;
  subTitle: string;
  time: string;
  likes: number;
  distance: string;
  level: string;
};
export const getAllPosts = async () => {
  try {
    const res = await axios.get<AxiosResponse>('/api/districts/posts');
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
