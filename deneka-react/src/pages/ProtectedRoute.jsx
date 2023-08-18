import { Route, Navigate } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';

export const ProtectedRoute = (props) => {
  const { user } = useAuthContext();

  if (!user) {
    return <Navigate to="/signup" replace />;
  }

  return <Route {...props} />;
}
