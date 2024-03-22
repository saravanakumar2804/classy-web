import React from 'react';
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom';
import Home from '../Home-page/home-page';
import Language from '../Home-page/Language/language';
import Login from '../login/login';
import Steps from '../Home-page/Steps/steps';
import Users from '../Home-page/Users/users';

const AppRouting: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Home" element={<Home />}>
          <Route path="/Home/Language" element={<Language />} />
          <Route path="/Home/Steps" element={<Steps />} />
          <Route path="/Home/Users" element={<Users />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouting;
