import { Navigate } from 'react-router-dom';
import { useAuthContext } from '../../context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { user } = useAuthContext();

  // If user isn't authenticated, navigate to the signup page.
  // if (!user) {
  //   return <Navigate to="/signup" replace />;
  // }

  // If authenticated, simply render the children components.
  return children;
}

export default ProtectedRoute;
