import React from 'react';
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom';
import Home from '../Home-Page/home-page';
import Language from '../Home-Page/Language/userLanguage';
import Sign_in from '../Login/sign-in';
import Sign_up from '../Login/sign-up';
import PrivateRoute from './privateRouting';

const AppRouting: React.FC = () => {
  const isAuthenticated = true;
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Sign_in />} />
        <Route path="/Sign_up" element={<Sign_up />} />
        <Route
          path="/Home"
          element={<PrivateRoute isAuthenticated={isAuthenticated} />}
        >
          <Route path="Language" element={<Language />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouting;
