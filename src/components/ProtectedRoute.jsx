import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// allowedRoles optional, if omitted just requires any logged in user
const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading...</div>;

  if (!user) return <Navigate to="/login" replace />;

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />; // logged in but wrong role, send home not to login
  }

  return children;
};

export default ProtectedRoute;