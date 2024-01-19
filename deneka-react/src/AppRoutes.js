import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import SignupPage from './views/SignUpPage/SignupPage';
import Questionnaire from './views/SignUpPage/Questionnaire';
import CompanySignupPage from './views/SignUpPage/CompanySignupPage';
import SigninPage from './views/SignInPage/SigninPage';
import EmailInputPage from './views/SignInPage/EmailInputPage';
import OtpInputPage from './views/SignInPage/OtpInputPage';
import SetupTOTPPage from './views/SignInPage/SetupTOTPPage';
import TOTPInputPage from './views/SignInPage/TOTPInputPage';
import PwdEmailInputPage from './views/ResetPasswordPage/EmailInputPage';
import PasswordResetPage from './views/ResetPasswordPage/PasswordResetPage';
import HomePage from './views/HomePage';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import ForgotpasswordPage from './components/ForgotPasswordPage';
import NotFoundPage from './views/Error/NotFoundPage';
import ServiceManager from './views/CRMPage/ServiceManager';
import { Routes, Route, Navigate } from 'react-router-dom';
import React from 'react';

import { useSelector } from 'react-redux';


const AppRoutes = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return (
    <Routes>
      {/* Protected routes */}
      <Route path="/dashboard" element={isAuthenticated ? <HomePage /> : <Navigate to="/signin" />} />
      <Route path="/services" element={isAuthenticated ? <ServiceManager /> : <Navigate to="/signin" />} />

      {/* Public routes */}
      <Route path="/signup" element={!isAuthenticated ? <SignupPage /> : <Navigate to="/dashboard" />} />
      <Route path="/signin" element={!isAuthenticated ? <SigninPage /> : <Navigate to="/dashboard" />} />
      <Route path="/emailinput" element={!isAuthenticated ? <EmailInputPage /> : <Navigate to="/dashboard" />} />
      <Route path="/otpinput" element={!isAuthenticated ? <OtpInputPage /> : <Navigate to="/dashboard" />} />
      <Route path="/PwdEmailInputPage" element={!isAuthenticated ? <PwdEmailInputPage /> : <Navigate to="/dashboard" />} />
      <Route path="/PasswordResetPage/:token" element={<PasswordResetPage />} />
      <Route path="/setup-totp" element={!isAuthenticated ? <SetupTOTPPage /> : <Navigate to="/dashboard" />} />
      <Route path="/totpinput" element={!isAuthenticated ? <TOTPInputPage /> : <Navigate to="/dashboard" />} />
      <Route path="/questionnaire" element={!isAuthenticated ? <Questionnaire /> : <Navigate to="/dashboard" />} />

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};


export default AppRoutes;
