import React, { useEffect } from 'react';
import { authKaKaoUser } from '../../apis/user';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { isLoggedInState } from '../../contexts/UserState';
function RedirectPage() {
  const code = new URL(document.location.toString()).searchParams.get('code');
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(isLoggedInState);
  const navigate = useNavigate();
  useEffect(() => {
    // 즉시 실행 함수(IIFE)를 이용하여 비동기 로직 구현
    (async () => {
      if (code && code.length > 0) {
        try {
          const res = await authKaKaoUser(code);
          if (res?.success) {
            setIsLoggedIn(true);
            navigate('/');
          }
        } catch (error) {
          console.error('Authentication failed:', error);
          // 인증 실패 시, 에러 처리 로직 추가
          // 예: navigate('/error');
        }
      }
    })();
  }, [code]);
  return <div></div>;
}

export default RedirectPage;
