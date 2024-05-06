import axios from 'axios';
import { Delete, Get, Post } from '.';
import { CommonError } from '../@types/api';
import { likeCountProps, likeStatusProps } from '../@types/like';

export const getLikes = async (postId: string) => {
  try {
    const res = await Get<likeCountProps[]>(`/api/posts/${postId}/likes`);

    return res.data.data[0];
  } catch (error) {
    if (axios.isAxiosError<CommonError>(error) && error.response) {
      const errorCode = error.response.data.errorCode;
      const message = error.response.data.message;
      console.log(`${errorCode}: ${message}`);
    }
  }
};

export const checkLikes = async (postId: string) => {
  try {
    const res = await Get<likeStatusProps[]>(`/api/posts/${postId}/likes/me`);

    return res.data.data[0];
  } catch (error) {
    if (axios.isAxiosError<CommonError>(error) && error.response) {
      const errorCode = error.response.data.errorCode;
      const message = error.response.data.message;
      console.log(`${errorCode}: ${message}`);
    }
  }
};
export const addLikes = async (postId: string) => {
  try {
    const res = await Post(`/api/posts/${postId}/likes`);

    return res.data;
  } catch (error) {
    if (axios.isAxiosError<CommonError>(error) && error.response) {
      const errorCode = error.response.data.errorCode;
      const message = error.response.data.message;
      console.log(`${errorCode}: ${message}`);
    }
  }
};

export const deleteLikes = async (postId: string) => {
  try {
    const res = await Delete(`/api/posts/${postId}/likes`);

    return res.data;
  } catch (error) {
    if (axios.isAxiosError<CommonError>(error) && error.response) {
      const errorCode = error.response.data.errorCode;
      const message = error.response.data.message;
      console.log(`${errorCode}: ${message}`);
    }
  }
};
