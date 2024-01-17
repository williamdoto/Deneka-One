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
      <Route path="/dashboard" element={<ProtectedRoute element={<HomePage />} />} />
      <Route path="/services" element={<ProtectedRoute element={<ServiceManager />} />} />
      <Route path="/company-signup" element={isAuthenticated ? <Navigate to="/dashboard" /> : <CompanySignupPage />} />


      {/* Public routes */}
      <Route path="/signup" element={isAuthenticated ? <Navigate to="/dashboard" /> : <SignupPage />} />
      <Route path="/signin" element={isAuthenticated ? <Navigate to="/dashboard" /> : <SigninPage />} />

      <Route path="/emailinput" element={isAuthenticated ? <Navigate to="/dashboard" /> : <EmailInputPage />} />
      <Route path="/otpinput" element={isAuthenticated ? <Navigate to="/dashboard" /> : <OtpInputPage />} />
      <Route path="/PwdEmailInputPage" element={isAuthenticated ? <Navigate to="/dashboard" /> : <PwdEmailInputPage />} />
      <Route path="/PasswordResetPage/:token" element={<PasswordResetPage />} />
      <Route path="/setup-totp" element={isAuthenticated ? <Navigate to="/dashboard" /> : <SetupTOTPPage />} />
      <Route path="/totpinput" element={isAuthenticated ? <Navigate to="/dashboard" /> : <TOTPInputPage />} />
      <Route path="/questionnaire" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Questionnaire />} />
      {/* <Route path="/dashboard" element={<HomePage />} /> */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};


export default AppRoutes;
