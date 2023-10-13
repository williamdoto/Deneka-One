import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route } from "react-router-dom";
import SignupPage from './views/SignUpPage/SignupPage';
import SigninPage from './views/SignInPage/SigninPage';
import EmailInputPage from './views/SignInPage/EmailInputPage'; // Import the new page
import OtpInputPage from './views/SignInPage/OtpInputPage';       // Import the new page
import HomePage from './views/HomePage';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import ForgotpasswordPage from './components/ForgotPasswordPage';
import NotFoundPage from './views/Error/NotFoundPage';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/signin" element={<SigninPage />} />
      <Route path="/emailinput" element={<EmailInputPage />} /> {/* Add the new route */}
      <Route path="/otpinput" element={<OtpInputPage />} />     {/* Add the new route */}
      <Route path="/forgotpassword" element={<ForgotpasswordPage />} />
      <Route path="/" element={
        <ProtectedRoute>
          <HomePage />
        </ProtectedRoute>
      } />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default AppRoutes;
