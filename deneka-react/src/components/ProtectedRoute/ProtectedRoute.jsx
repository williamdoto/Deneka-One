import { Navigate } from 'react-router-dom';
import { useAuthContext } from '../../context/AuthContext';

const ProtectedRoute = ({ element, ...rest }) => {
  const { user } = useAuthContext();

  // If user isn't authenticated, navigate to the signin page.
  if (!user.isAuthenticated) {
    return <Navigate to="/signin" />;
  }

  // If authenticated, render the specified component.
  return element;
}
export default ProtectedRoute;
