import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import SignupPage from './views/SignUpPage/SignupPage';
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




const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/signin" element={<SigninPage />} />
      <Route path="/emailinput" element={<EmailInputPage />} />
      <Route path="/otpinput" element={<OtpInputPage />} />
      <Route path="/PwdEmailInputPage" element={<PwdEmailInputPage />} />
      <Route path="/PasswordResetPage/:token" element={<PasswordResetPage />} />
      <Route path="/setup-totp" element={<SetupTOTPPage />} />
      <Route path="/totpinput" element={<TOTPInputPage />} />
      {/* <Route path="/dashboard" element={<ProtectedRoute element={<HomePage />} />} /> */}
      <Route path="/dashboard" element={<HomePage />} />
      <Route path="/services" element={<ServiceManager />} />

      {/* <Route path="/dashboard" element={<HomePage />} /> */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};


export default AppRoutes;
