import React from 'react';
import Main from './pages/Main';
import { GlobalStyle } from './styles/global-style';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import SeoulTrails from './pages/SeoulTrails';
import Community from './pages/Community';
import EditUserCourse from './pages/EditUserCourse';

import SeoulTrailsDetail from './pages/SeoulTrailsDetail';
function App() {
  return (
    <>
      <GlobalStyle />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/login" element={<Login />} />
          <Route path="/sign-up" element={<Signup />} />
          <Route path="/seoul-trails" element={<SeoulTrails />} />
          <Route path="/trail-detail" element={<SeoulTrailsDetail />} />
          <Route path="/community" element={<Community />} />
          <Route path="/edit-user-course" element={<EditUserCourse />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
