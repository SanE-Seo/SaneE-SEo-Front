import React from 'react';
import * as S from '../styles/signup.style';
import { ReactComponent as Logo } from '../assets/icons/logo.svg';
import { useForm, SubmitHandler } from 'react-hook-form';
import { emailRegex, passwordRegex } from '../utils/regex';
import { checkNicknameDuplicate, registerUser } from '../apis/user';
import { useNavigate } from 'react-router-dom';
function Signup() {
  //폼으로 입력받을 데이터 정의
  type FormValue = {
    email: string;
    password: string;
    pw_confirm: string;
    nickname: string;
  };
  const navigate = useNavigate();
  //useForm 사용하기
  const {
    register,
    handleSubmit,
    watch,
    getValues,
    formState: { errors },
  } = useForm<FormValue>({
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
      pw_confirm: '',
      nickname: '',
    },
  });

  //비밀번호 값 추적
  const password_watch = watch('password');
  const nickname_watch = watch('nickname');

  const checkValues = () => {
    const { email, password, pw_confirm, nickname } = getValues();
    return email == '' || password == '' || pw_confirm == '' || nickname == '';
  };

  const handleCheckDuplicate = async () => {
    const { nickname } = getValues();
    const res = await checkNicknameDuplicate(nickname);
    if (res?.status == 200) {
      alert('사용가능한 닉네임 입니다.');
    }
  };

  //서버 api 요청 코드 추가
  const onSubmitHandler: SubmitHandler<FormValue> = async () => {
    const { email, password, pw_confirm, nickname } = getValues();
    console.log(email, password, pw_confirm, nickname);
    const res = await registerUser(email, password, nickname);
    if (res?.status == 200) {
      alert('회원가입 성공!');
      navigate('/login');
    }
  };
  return (
    <>
      <S.SignUpWrapper>
        <S.SignUpLayout>
          <div className="header-container">
            <Logo />
            <div className="logo-container">
              <S.LogoText logotextcolor="#645023">회원가입</S.LogoText>
            </div>
            <span className="header-text">
              서울의 매력적인 길을 함께 걸으며,
            </span>
            <span className="header-text">
              나만의 산책 코스를 발견하고 공유하는 여정에 동참하세요
            </span>
          </div>
          <form
            className="signup-form"
            onSubmit={handleSubmit(onSubmitHandler)}
          >
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
                minLength: {
                  value: 8,
                  message: '비밀번호는 8자리 이상이어야 합니다',
                },
                pattern: {
                  value: passwordRegex,
                  message: '비밀번호 형식을 확인해주세요',
                },
              })}
            />
            {errors.password && (
              <span className="error">{errors.password.message}</span>
            )}
            <input
              className="password-check"
              type="password"
              placeholder="비밀번호 재확인"
              {...register('pw_confirm', {
                required: '비밀번호를 한번 더 입력하세요',
                validate: (value) =>
                  value === password_watch || '비밀번호가 일치하지 않습니다.',
              })} //validate 함수를 통해 입력된 값이 watch를 통해 추적되는 비밀번호 값과 같은지 비교하고, 같지 않으면 에러 메시지를 반환하도록 함
            />
            {errors.pw_confirm && (
              <span className="error">{errors.pw_confirm.message}</span>
            )}

            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <input
                className="input-container"
                type="text"
                placeholder="닉네임"
                style={{ width: '207px' }}
                {...register('nickname', {
                  required: '닉네임을 입력하세요',
                })}
              />

              <S.DupliButton
                type="button"
                disabled={nickname_watch == ''}
                button_color={nickname_watch != '' ? '#94C020' : '#B8B8B8'}
                onClick={handleCheckDuplicate}
              >
                중복확인
              </S.DupliButton>
            </div>
            {errors.nickname && (
              <span className="error">{errors.nickname.message}</span>
            )}
            <S.SubmitButton
              type="submit"
              className="submit-button"
              disabled={checkValues()}
              button_color={checkValues() ? '#B8B8B8' : '#94C020'}
            >
              가입하기
            </S.SubmitButton>
          </form>
        </S.SignUpLayout>
      </S.SignUpWrapper>
    </>
  );
}

export default Signup;
