import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import Home from '../Home-Page/home-page';

interface PrivateRouteProps {
  isAuthenticated: boolean;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ isAuthenticated }) => {
  console.log(isAuthenticated, 'isAuthenticated');

  return isAuthenticated ? <Home /> : <Navigate to="/" replace={true} />;
};


export default PrivateRoute;
