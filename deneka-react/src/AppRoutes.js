import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignupPage from './pages/SignupPage';
import SigninPage from './pages/SigninPage';
import HomePage from './pages/HomePage';
import { ProtectedRoute } from './pages/ProtectedRoute';
import AuthProvider from './pages/AuthProvider/AuthProvider';
import React from "react";
import { Col, Layout, Row } from "antd";
import AppHeader from "./pages/Appheader/Appheader";
// import AppRoutes from "./Routes";
const { Header, Content } = Layout;

const AppRoutes = () => {
    return (
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
    );
  };
  
  export default AppRoutes;