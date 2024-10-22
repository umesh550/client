import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext"; // Update import path as needed

interface ProtectedRouteProps {
  children: ReactNode; // Expecting any React node(s) as children
  roles?: string[]; // Optional array of strings for roles
}

function ProtectedRoute({ children, roles }: ProtectedRouteProps) {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (roles && !roles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <>{children}</>; // Wrap children in a fragment
}

export default ProtectedRoute;
