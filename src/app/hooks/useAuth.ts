import { useState } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
import Spinner from "../components/Spinner/Spinner";

const useAuth = () => {
  const { user, error, isLoading } = useUser();
  const [isActionLoading, setActionLoading] = useState(false); 

  const login = () => {
    setActionLoading(true);  
    window.location.href = "/api/auth/login";
  };

  const logout = () => {
    setActionLoading(true);  
    window.location.href = "/api/auth/logout";
  };

  return {
    isAuthenticated: !!user,
    user,
    error,
    isLoading,
    isActionLoading, 
    login,
    logout,
  };
};

export default useAuth;
