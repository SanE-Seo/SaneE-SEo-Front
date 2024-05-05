import axios from 'axios';
import { Get, Post } from '.';
import { PolylineData, UserTrail, trailData } from '../@types/custom';
import { CommonError } from '../@types/api';
import { CardData } from '../@types/card';

export const addPosts = async (
  title: string,
  subTitle: string,
  description: string,
  level: string,
  time: string,
  distance: string,
  districtId: number,
  geometry: trailData,
) => {
  try {
    const res = await Post<number>('/api/posts', {
      category: 1,
      title: title,
      subTitle: subTitle,
      description: description,
      level: level,
      time: time,
      distance: distance,
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
export const addImages = async (formData: FormData) => {
  try {
    const res = await Post('/api/images', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
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
export const getAllCustomPosts = async () => {
  try {
    const res = await Get<CardData[]>(
      `/api/districts/posts?page=0&size=20&category=1`,
    );

    if (res.status == 204) {
      return [];
    }
    return res.data.data;
  } catch (error) {
    if (axios.isAxiosError<CommonError>(error) && error.response) {
      const errorCode = error.response.data.errorCode;
      const message = error.response.data.message;
      console.log(`${errorCode}: ${message}`);
    }
  }
};
