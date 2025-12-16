// src/components/ProtectedRoute.jsx
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  // 1. Get user state from Redux
  const user = useSelector((state) => state.auth.user); 
  
  // 2. Conditional return (The crucial part)
  if (!user) {
    // If NOT logged in, immediately return the Navigate component
    // Note: The 'state' is optional but helps after successful login
    return <Navigate to="/login" replace state={{ from: location.pathname }} />; 
  }

  // If logged in, render the child component (Products, Cart, etc.)
  return children;
};

export default ProtectedRoute;