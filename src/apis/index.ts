import axios from 'axios';
import { AxiosRequestConfig, AxiosResponse } from 'axios';
import { CommonResponse } from '../@types/api';
import { onSilentRefresh } from './user';
export const axiosInstance = axios.create({
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; //재시도 플래그 설정
      return onSilentRefresh().then(() => {
        return axiosInstance(originalRequest);
      });
    }
    return Promise.reject(error);
  },
);

export const Get = async <T>(
  url: string,
  config?: AxiosRequestConfig,
): Promise<AxiosResponse<CommonResponse<T>>> => {
  const response = await axiosInstance.get(url, config);
  return response;
};

export const Post = async <T>(
  url: string,
  data?: any,
  config?: AxiosRequestConfig,
): Promise<AxiosResponse<CommonResponse<T>>> => {
  const response = await axiosInstance.post(url, data, config);
  return response;
};
