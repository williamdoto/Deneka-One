import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route } from "react-router-dom";
import SignupPage from './views/SignUpPage/SignupPage';
import SigninPage from './views/SignInPage/SigninPage';
import HomePage from './views/HomePage';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import ForgotpasswordPage from './components/ForgotPasswordPage';
import NotFoundPage from './views/Error/NotFoundPage';


const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/signin" element={<SigninPage />} />
      <Route path="/forgotpassword" element={<ForgotpasswordPage />} />
      <Route path="/" element={
        <ProtectedRoute>
          <HomePage />
        </ProtectedRoute>
      } />
      <Route path="*" element={<NotFoundPage />} />
      
      {/* Add more protected routes as needed */}
    </Routes>
  );
};

export default AppRoutes;
