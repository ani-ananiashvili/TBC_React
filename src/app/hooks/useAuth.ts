import { useUser } from "@auth0/nextjs-auth0/client";

const useAuth = () => {
  const { user, error, isLoading } = useUser(); 

  const login = () => {
    window.location.href = "/api/auth/login";
  };

  const logout = () => {
    window.location.href = "/api/auth/logout";
  };

  return {
    isAuthenticated: !!user,
    user,
    error,
    isLoading,
    login,
    logout,
  };
};

export default useAuth;
