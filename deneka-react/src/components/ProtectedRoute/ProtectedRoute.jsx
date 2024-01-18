import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element, ...rest }) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return isAuthenticated ? React.cloneElement(element, rest) : <Navigate to="/signin" />;
};

export default ProtectedRoute;
