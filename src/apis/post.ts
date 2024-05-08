import axios from 'axios';
import { Get, Delete } from '.';
import { CommonError } from '../@types/api';
import { CardData } from '../@types/card';
import { PostData } from '../@types/post';

export const getAllPosts = async (page: number) => {
  try {
    const res = await Get<CardData[]>(
      `/api/districts/posts?page=${page}&size=16&category=0`,
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

export const getPostDetails = async (postId: string) => {
  try {
    const res = await Get<PostData[]>(`/api/posts/${postId}`);
    return res.data.data[0];
  } catch (error) {
    if (axios.isAxiosError<CommonError>(error) && error.response) {
      const errorCode = error.response.data.errorCode;
      const message = error.response.data.message;
      console.log(`${errorCode}: ${message}`);
    }
  }
};

export const getSortedPosts = async (category: number) => {
  try {
    const res = await Get<CardData[]>(`/api/districts/posts/0/sorted-by-likes`);
    return res.data.data;
  } catch (error) {
    if (axios.isAxiosError<CommonError>(error) && error.response) {
      const errorCode = error.response.data.errorCode;
      const message = error.response.data.message;
      console.log(`${errorCode}: ${message}`);
    }
  }
};

export const getSortedCustomPosts = async (district: string) => {
  console.log(district);
  try {
    const res = await Get<CardData[]>(
      `/api/districts/posts/1/sorted-by-likes?districtPrefix=${district}`,
    );
    return res.data.data;
  } catch (error) {
    if (axios.isAxiosError<CommonError>(error) && error.response) {
      const errorCode = error.response.data.errorCode;
      const message = error.response.data.message;
      console.log(`${errorCode}: ${message}`);
    }
  }
};

export const deletePost = async (postId: number) => {
  try {
    const res = await Delete(`/api/posts/${postId}`);
    return res;
  } catch (error) {
    if (axios.isAxiosError<CommonError>(error) && error.response) {
      const errorCode = error.response.data.errorCode;
      const message = error.response.data.message;
      console.log(`${errorCode}: ${message}`);
    }
  }
};
