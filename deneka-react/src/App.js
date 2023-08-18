import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignupPage from './pages/SignupPage';
import SigninPage from './pages/SigninPage';
import HomePage from './pages/HomePage';
import { ProtectedRoute } from './pages/ProtectedRoute';
import AuthProvider from './pages/AuthProvider/AuthProvider';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/signin" element={<SigninPage />} />
          <Route path="/" element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          } />
          {/* Add more protected routes as needed */}
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;

