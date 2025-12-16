// src/components/PublicRoute.jsx
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const PublicRoute = ({ children }) => {
  // 1. Get user state from Redux
  const user = useSelector((state) => state.auth.user); 
  
  // 2. Conditional return (The crucial part)
  if (user) {
    // If logged in, immediately return the Navigate component
    return <Navigate to="/products" replace />;
  }

  // If not logged in, render the child component (Login/Signup)
  return children;
};

export default PublicRoute;