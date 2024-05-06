import axios from 'axios';
import { Get } from '.';
import { CommonError } from '../@types/api';
import { WeatherData } from '../@types/weather';

export const getWeather = async (districtId: number) => {
  try {
    const res = await Get<WeatherData[]>(
      `/api/weather?districtId=${districtId}`,
    );

    return res.data.data[0];
  } catch (error) {
    if (axios.isAxiosError<CommonError>(error) && error.response) {
      const errorCode = error.response.data.errorCode;
      const message = error.response.data.message;
      console.log(`${errorCode}: ${message}`);
    }
  }
};
