import React from 'react';
import * as L from '../styles/login.style';
import { ReactComponent as Logo } from '../assets/icons/logo.svg';
import KakaoLogin from '../components/Login/KakaoLogin';
import { useForm, SubmitHandler } from 'react-hook-form';
import { emailRegex, passwordRegex } from '../utils/regex';
function Login() {
  //폼으로 입력받을 데이터 정의
  interface FormValue {
    email: string;
    password: string;
  }

  //useForm 사용하기
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValue>({
    mode: 'onSubmit',
    defaultValues: {
      email: '',
      password: '',
    },
  });
  //서버 api 요청 코드 추가
  const onSubmitHandler: SubmitHandler<FormValue> = (data) => {
    console.log(data);
  };
  return (
    <>
      <L.LoginWrapper>
        <L.LoginLayout>
          <div className="header-container">
            <Logo />
            <div className="logo-container">
              <L.LogoText logotextcolor="#94C020">산책</L.LogoText>
              <L.LogoText logotextcolor="#F9C758">이음</L.LogoText>
              <L.LogoText logotextcolor="#645023">서울</L.LogoText>
            </div>
            <span className="header-text">
              서울의 매력적인 길을 함께 걸으며,
            </span>
            <span className="header-text">
              나만의 산책 코스를 발견하고 공유하는 여정에 동참하세요
            </span>
          </div>

          <form className="login-form" onSubmit={handleSubmit(onSubmitHandler)}>
            <input
              className="input-container"
              type="email"
              placeholder="이메일"
              {...register('email', {
                required: '이메일을 입력하세요',
                pattern: {
                  value: emailRegex,
                  message: '이메일 형식을 확인해주세요',
                },
              })}
            />
            {errors.email && (
              <span className="error">{errors.email.message}</span>
            )}
            <input
              className="input-container"
              type="password"
              placeholder="비밀번호"
              {...register('password', {
                required: '비밀번호를 입력하세요',
                minLength: 8,
                pattern: {
                  value: passwordRegex,
                  message: '비밀번호 형식을 확인해주세요',
                },
              })}
            />
            {errors.password && (
              <span className="error">{errors.password.message}</span>
            )}
            <button type="submit" className="submit-button">
              이메일 로그인
            </button>
          </form>
          <L.LineContainer>
            <hr />
            <span>or</span>
            <hr />
          </L.LineContainer>
          <KakaoLogin />

          <p className="bottom-text">
            아직 회원이 아닌가요? <a href="/sign-up">회원가입 하러가기</a>
          </p>
        </L.LoginLayout>
      </L.LoginWrapper>
    </>
  );
}

export default Login;
