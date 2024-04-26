import React from 'react';
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

function App() {
  return (
    <>
      <GlobalStyle />
      <BrowserRouter>
        <LocationProvider>
          {' '}
          {/* Wrap the Routes component with LocationProvider */}
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/login" element={<Login />} />
            <Route path="/sign-up" element={<Signup />} />
            <Route path="/seoul-trails" element={<SeoulTrails />} />
            <Route path="/trail-detail" element={<SeoulTrailsDetail />} />
            <Route path="/community" element={<Community />} />
            <Route path="/user-trail-editor" element={<UserTrailEditor />} />
            <Route path="/redirect" element={<RedirectPage />} />
            {/* <Route
              path="/user-trail-details-form"
              element={<UserTrailDetailsForm />}
            /> */}
          </Routes>
        </LocationProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
