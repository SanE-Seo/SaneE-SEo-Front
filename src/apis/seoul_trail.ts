import axios from 'axios';
import { Get } from '.';
import { CommonError } from '../@types/api';
import { CardData } from '../@types/card';

export const getAllPosts = async () => {
  try {
    const res = await Get<CardData[]>('/api/districts/posts/1');

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

export const getDistrictPosts = async (districtId: number) => {
  try {
    const res = await Get<CardData[]>(`/api/districts/${districtId}/posts`);
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
