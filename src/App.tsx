import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { GlobalStyle } from './styles/global-style';
import { LocationProvider } from './contexts/LocationContext'; // Import the LocationProvider

import Main from './pages/Main';
import Login from './pages/Login';
import Signup from './pages/Signup';
import SeoulTrails from './pages/SeoulTrails';
import Community from './pages/Community';
import UserTrailEditor from './pages/UserTrailEditor';
import SeoulTrailsDetail from './pages/SeoulTrailsDetail';
import RedirectPage from './components/Login/RedirectPage';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { onSilentRefresh } from './apis/user';
import { Cookies } from 'react-cookie';
import MyPage from './pages/MyPage';
import { useAuth } from './contexts/AuthContext';
import { Navigate, Outlet } from 'react-router-dom';

function App() {
  const cookie = new Cookies();
  const { isLoggedIn, login } = useAuth();
  useEffect(() => {
    const refreshToken = cookie.get('refreshToken');
    if (refreshToken && refreshToken.length > 0) {
      onSilentRefresh().then(() => {
        login();
      });
    }
    // 의존성 배열을 비워 컴포넌트가 마운트될 때만 실행되도록 설정
  }, []);

  //로그인한 회원은 들어갈 수 없는 페이지
  const PublicRoute = () => {
    return isLoggedIn ? <Navigate to="/" /> : <Outlet />;
  };

  //로그인한 회원만 들어갈 수 있는 페이지
  const PrivateRoute = () => {
    return isLoggedIn ? <Outlet /> : <Navigate to="/" />;
  };

  return (
    <>
      <GlobalStyle />

      <BrowserRouter>
        <LocationProvider>
          {' '}
          {/* Wrap the Routes component with LocationProvider */}
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/seoul-trails" element={<SeoulTrails />} />
            <Route path="/trail-detail" element={<SeoulTrailsDetail />} />
            <Route path="/community" element={<Community />} />
            <Route element={<PrivateRoute />}>
              <Route path="/user-trail-editor" element={<UserTrailEditor />} />
              <Route path="/mypage" element={<MyPage />} />
            </Route>
            <Route element={<PublicRoute />}>
              <Route path="/login" element={<Login />} />
              <Route path="/sign-up" element={<Signup />} />
            </Route>

            <Route path="/redirect" element={<RedirectPage />} />

            {/* <Route
              path="/user-trail-details-form"
              element={<UserTrailDetailsForm />}
            /> */}
          </Routes>
        </LocationProvider>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={true} />
    </>
  );
}

export default App;
