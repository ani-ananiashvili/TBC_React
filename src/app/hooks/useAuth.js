import { useState, useEffect } from "react";
import Cookies from "js-cookie";

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(!!Cookies.get("token"));
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = Cookies.get("token");
    setIsAuthenticated(!!token);
  }, []);

  const login = async (username, password) => {
    setLoading(true);
    try {
      if (username === 'emilys' && password === 'emilyspass') {
        const token = 'dummyToken'; 
        Cookies.set("token", token, { expires: 30 / 1440 }); 
        setIsAuthenticated(true);
        return true;
      } else {
        alert("Invalid username or password.");
        return false;
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("An error occurred. Please try again.");
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    Cookies.remove("token"); 
    setIsAuthenticated(false);
  };

  return { isAuthenticated, loading, login, logout };
};

export default useAuth;
