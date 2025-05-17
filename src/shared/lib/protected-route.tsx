import { useAuthData } from "@/entities/auth/store/use-auth.store";
import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({ children }: { children: any }) => {
  const { token } = useAuthData();

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
};
