"use client";

import { useState, useEffect } from "react";
import { createClient } from "../../../utils/supabase/client";

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const supabase = createClient();

    const fetchSession = async () => {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();

      if (error) {
        console.error("Error fetching session:", error.message);
      } else if (session) {
        setIsAuthenticated(true);
      }

      setIsLoading(false);
    };

    fetchSession();
  }, []);

  const login = async (email: string, password: string) => {
    const { error } = await createClient().auth.signInWithPassword({
      email,
      password,
    });
    if (!error) {
      setIsAuthenticated(true);
    } else {
      console.error(error.message);
    }
  };

  const logout = async () => {
    await createClient().auth.signOut();
    setIsAuthenticated(false);
  };

  return { isAuthenticated, isLoading, login, logout };
};

export default useAuth;
