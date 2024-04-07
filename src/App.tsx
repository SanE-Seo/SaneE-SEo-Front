import React from 'react';
import Main from './pages/Main';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import SeoulTrails from './pages/SeoulTrails';
import Community from './pages/Community';
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/login" element={<Login />} />
          <Route path="/sign-up" element={<Signup />} />
          <Route path="/seoul-trails" element={<SeoulTrails />} />
          <Route path="/community" element={<Community />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
