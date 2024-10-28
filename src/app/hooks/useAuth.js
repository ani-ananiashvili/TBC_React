import { useState, useEffect } from "react";
import Cookies from "js-cookie";

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(!!Cookies.get("token"));

  useEffect(() => {
    const token = Cookies.get("token");
    setIsAuthenticated(!!token); 
  }, []);

  const login = async (username, password) => {
    if (username === "emilys" && password === "emilyspass") {
      const token = "dummyToken";
      Cookies.set("token", token, { expires: 1 }); 
      setIsAuthenticated(true);
      return true;
    } else {
      alert("Invalid username or password.");
      return false;
    }
  };

  const logout = () => {
    Cookies.remove("token");
    setIsAuthenticated(false);
  };

  return { isAuthenticated, login, logout };
};

export default useAuth;
