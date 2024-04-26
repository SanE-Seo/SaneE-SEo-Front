import React, { useEffect } from 'react';
import axios from 'axios';
function RedirectPage() {
  const code = new URL(document.location.toString()).searchParams.get('code');
  useEffect(() => {
    axios.get(`/api/oauth/kakao?code=${code}`).then((r) => {
      console.log(r.data); // 토큰과 함께 오는 정보들을 출력해보자
    });
  }, []);
  return <div></div>;
}

export default RedirectPage;
