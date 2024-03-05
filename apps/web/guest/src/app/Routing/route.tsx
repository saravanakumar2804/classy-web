import React from 'react';
import {BrowserRouter, Route, Router, Routes} from 'react-router-dom';
import Home from '../Home-Page/home-page';
import Language from '../Home-Page/Language/language';
import Sign_in from '../Login/sign-in';
import Sign_up from '../Login/sign-up';

const AppRouting: React.FC = () => {
    // console.log("Hey buddy1");

    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Sign_in />} />
          <Route path="/Sign_up" element={<Sign_up onFormSubmit={function (): void {
            throw new Error('Function not implemented.');
          } } />} />
          <Route path="/Home" element = {<Home />}>
            <Route path="/Home/Language" element = {<Language />}/>
            

          </Route>
          </Routes>
    </BrowserRouter>
  );
};

export default AppRouting;