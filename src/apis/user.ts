import { Get, Post, Patch, axiosInstance } from './index';
import axios from 'axios';
import { CommonError } from '../@types/api';
import { Cookies } from 'react-cookie';
import { CardData } from '../@types/card';
import { PostInfoBox } from '../styles/drawer.style';
import { userProps } from '../@types/user';

export const checkNicknameDuplicate = async (nickname: string) => {
  try {
    const res = await Get(`/api/member/duplicate?username=${nickname}`);
    console.log(res);
    return res;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      const statusCode = error.response.status;
      const statusText = error.response.statusText;
      const message = error.response.data.message;
      console.log(`${statusCode} - ${statusText} : ${message}`);
      switch (statusCode) {
        case 400:
          console.log(message);
          alert(message);
      }
    }
  }
};

export const registerUser = async (
  email: string,
  password: string,
  nickname: string,
) => {
  try {
    const res = await Post('/api/member', {
      name: nickname,
      password: password,
      email: email,
    });
    return res;
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

type AuthResponseData = {
  accessToken: string;
  refreshToken: string;
};

export const authKaKaoUser = async (code: string) => {
  try {
    const res = await Get<AuthResponseData[]>(`/api/oauth/kakao?code=${code}`);

    if (res.status == 200) {
      const { accessToken, refreshToken } = res.data.data[0];
      console.log(accessToken, refreshToken);
      onLogInSuccess(accessToken, refreshToken);

      return res.data;
    }
  } catch (error) {
    console.log(error);
    if (axios.isAxiosError<CommonError>(error) && error.response) {
      const errorCode = error.response.data.errorCode;
      const message = error.response.data.message;
      console.log(`${errorCode}: ${message}`);
    }
  }
};

export const loginUser = async (email: string, password: string) => {
  try {
    const res = await Post<AuthResponseData[]>('/api/auth/login', {
      email: email,
      password: password,
    });
    if (res.status == 200) {
      const { accessToken, refreshToken } = res.data.data[0];
      console.log(accessToken, refreshToken);
      onLogInSuccess(accessToken, refreshToken);
    }

    return res;
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

const onLogInSuccess = (accessToken: string, refreshToken: string) => {
  //accessToken 헤더에 설정
  axiosInstance.defaults.headers.common['Authorization'] =
    `Bearer ${accessToken}`;
  // refreshToken을 쿠키에 저장
  document.cookie = `refreshToken=${refreshToken}; path=/; `;
};

type refreshData = {
  accessToken: string;
};
export const onSilentRefresh = async () => {
  const cookies = new Cookies();
  const refreshToken = cookies.get('refreshToken');
  if (refreshToken && refreshToken.length > 0) {
    try {
      const res = await Post<refreshData[]>('/api/auth/token/refresh', {
        refreshToken: refreshToken,
      });
      if (res.status == 200) {
        const { accessToken } = res.data.data[0];
        onLogInSuccess(accessToken, refreshToken); //토큰 갱신
        console.log(res);
      }
    } catch (error) {
      console.log(error);
      if (axios.isAxiosError<CommonError>(error) && error.response) {
        const errorCode = error.response.data.errorCode;
        const message = error.response.data.message;
        console.log(`${errorCode}: ${message}`);
        //로그인 페이지 리다이렉트
        alert('로그인이 필요합니다.');
        window.location.href = '/login';
      }
    }
  } else {
    //로그인 페이지 리다이렉트
    alert('로그인이 필요합니다.');
    window.location.href = '/login';
  }
};

export const getUser = async () => {
  try {
    const res = await Get<userProps[]>('/api/member');
    return res.data.data[0]; // 유저 정보 반환 예시: {name: '홍길동', email: 'gildong@gmail.com', profile: null}
  } catch (error) {
    console.log(error);
    if (axios.isAxiosError<CommonError>(error) && error.response) {
      const errorCode = error.response.data.errorCode;
      const message = error.response.data.message;
      console.log(`${errorCode}: ${message}`);
    }
  }
};

export const logoutUser = async () => {
  try {
    const res = await Post('/api/auth/logout');
    return res.data;
  } catch (error) {
    console.log(error);
    if (axios.isAxiosError<CommonError>(error) && error.response) {
      const errorCode = error.response.data.errorCode;
      const message = error.response.data.message;
      console.log(`${errorCode}: ${message}`);
    }
  }
};

export const updateUserProfile = async (
  name: string,
  email: string,
  imageFile: File | null,
) => {
  try {
    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    if (imageFile) formData.append('profile', imageFile);

    const response = await Patch(`/api/member`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data;
  } catch (error) {
    console.error('Update failed:', error);
  }
};

export const getUserActivities = async (num: number) => {
  const url =
    num === 0
      ? `/api/member/my-posts` // num이 0이면 사용자의 게시글
      : `/api/member/liked-posts/${num - 1}`; // num이 1이면 사용자가 좋아요한 두드림길 -> 0, 2이면 사용자가 좋아요한 사용자들의 게시글 -> 1
  try {
    const response = await Get<CardData[]>(url);
    return response.data;
  } catch (error) {
    console.log(error);
    if (axios.isAxiosError<CommonError>(error) && error.response) {
      const errorCode = error.response.data.errorCode;
      const message = error.response.data.message;
      console.log(`${errorCode}: ${message}`);
    }
  }
};
