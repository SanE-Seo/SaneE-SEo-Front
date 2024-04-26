import axios from 'axios';

// 닉네임 중복 확인을 위한 API 응답 타입을 정의합니다.
type AxiosResponse = {
  success: boolean;
  message: string;
  data: any;
};
export const CheckNicknameDuplicate = async (nickname: string) => {
  try {
    const res = await axios.get<AxiosResponse>(
      `/api/member/duplicate?username=${nickname}`,
    );
    console.log(res);
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const RegisterUser = async (
  email: string,
  password: string,
  nickname: string,
) => {
  try {
    const res = await axios.post<AxiosResponse>('/api/auth/register', {
      name: nickname,
      password: password,
      email: email,
    });
    return res;
  } catch (error) {
    console.log(error);
  }
};
