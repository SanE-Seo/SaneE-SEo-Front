import axios from 'axios';
import { Post } from '.';
import { PolylineData, trailData } from '../@types/custom_trail';
import { CommonError } from '../@types/api';

export const addPosts = async (
  title: string,
  subTitle: string,
  description: string,
  level: string,
  time: string,
  distance: string,
  images: File[],
  districtId: number,
  geometry: trailData,
) => {
  try {
    const res = await Post('/api/posts', {
      category: 1,
      title: title,
      subTitle: subTitle,
      description: description,
      level: level,
      time: time,
      distance: distance,
      images: images,
      districtId: districtId,
      geometry: geometry,
    });

    return res.data;
  } catch (error) {
    console.log(error);
    if (axios.isAxiosError<CommonError>(error) && error.response) {
      const errorCode = error.response.data.errorCode;
      const message = error.response.data.message;
      console.log(`${errorCode}: ${message}`);
      alert(message);
    }
  }
};
