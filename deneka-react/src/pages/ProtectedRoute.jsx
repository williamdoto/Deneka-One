import { Route, Navigate } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';
import AppHeader from './Appheader/Appheader';
import './ProtectedRoute.css'

const ProtectedRoute = ({ children }) => {
  const { user } = useAuthContext();

  // if (!user) {
  //   return <Navigate to="/signup" replace />;
  // }

  return  (
    <div className="protected-layout d-flex align-items-stretch">
      <div className="navbar">
        <AppHeader />
      </div>
      <div id="content" className="p-4 p-md-5 main-content">
        {children}
      </div>
    </div>
  );;
}

export default ProtectedRoute;