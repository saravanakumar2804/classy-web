import React from 'react';
import {BrowserRouter, Route, Router, Routes} from 'react-router-dom';
import Home from '../Home-page/home-page';
import Language from '../Home-page/Language/language';
import Login from '../login/login';


const AppRouting: React.FC = () => {
    console.log("Hey buddy1");

    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Home" element = {<Home />}>
            <Route path="/Home/Language" element = {<Language />}/>
          </Route>
          </Routes>
    </BrowserRouter>
  );
};

export default AppRouting;