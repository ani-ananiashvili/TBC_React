"use client";

import { useState, useEffect } from "react";
import { createClient } from "../../../utils/supabase/client";

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<any>(null);

  const supabase = createClient();

  useEffect(() => {
    const fetchSession = async () => {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();

      if (error) {
        console.error("Error fetching session:", error.message);
      } else if (session) {
        setIsAuthenticated(true);
        setUser(session.user);
      }

      setIsLoading(false);
    };

    fetchSession();
  }, []);

  const login = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
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
    await supabase.auth.signOut();
    setIsAuthenticated(false);
    setUser(null);
  };

  const loginWithGitHub = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "github",
    });
    if (error) {
      console.error(error.message);
    }
  };

  return { isAuthenticated, isLoading, login, logout, loginWithGitHub, user };
};

export default useAuth;
