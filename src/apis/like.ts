import axios from 'axios';
import { Get } from '.';
import { CommonError } from '../@types/api';
import { likeCountProps } from '../@types/like';

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

// export const checkLikes = async () => {
//     try {
//       const res = await Get<likeCountProps>(`/api/posts/`);

//       return res.data.data;
//     } catch (error) {
//       if (axios.isAxiosError<CommonError>(error) && error.response) {
//         const errorCode = error.response.data.errorCode;
//         const message = error.response.data.message;
//         console.log(`${errorCode}: ${message}`);
//       }
//     }
//   };
