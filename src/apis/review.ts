import axios from 'axios';
import { Delete, Get, Post } from '.';
import { ReviewData } from '../@types/review';

export const sendReview = async (postId: number, content: string) => {
  try {
    const res = await Post(`/api/posts/${postId}/reviews`, {
      content: content,
    });
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      const statusCode = error.response.status;
      const statusText = error.response.statusText;
      const message = error.response.data.message;
      console.log(`${statusCode} - ${statusText} : ${message}`);
      switch (statusCode) {
        case 400:
          alert(message);
      }
    }
  }
};

export const getReviews = async (postId: number) => {
  try {
    const res = await Get<ReviewData[]>(`/api/posts/${postId}/reviews`);
    return res.data.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      const statusCode = error.response.status;
      const statusText = error.response.statusText;
      const message = error.response.data.message;
      console.log(`${statusCode} - ${statusText} : ${message}`);
      switch (statusCode) {
        case 400:
          alert(message);
      }
    }
  }
};

export const deleteReview = async (postId: number, reviewId: number) => {
  try {
    const res = await Delete(`/api/posts/${postId}/reviews/${reviewId}`);
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      const statusCode = error.response.status;
      const statusText = error.response.statusText;
      const message = error.response.data.message;
      console.log(`${statusCode} - ${statusText} : ${message}`);
      switch (statusCode) {
        case 400:
          alert(message);
      }
    }
  }
};
