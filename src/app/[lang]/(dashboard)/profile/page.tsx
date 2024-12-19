"use client";

import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import "./profile.css";
import Spinner from "../../../components/Spinner/Spinner";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function Profile() {
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const {
          data: { user },
          error,
        } = await supabase.auth.getUser();
        if (error) {
          setIsError(error.message);
        } else {
          setUser(user);
        }
      } catch (err) {
        setIsError("Failed to load user data.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (isLoading) {
    return (
      <div className="loading">
        <Spinner />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="error">
        <h2>Error loading profile</h2>
        <p>{isError}</p>
        <button className="retry-button" onClick={() => setIsError(null)}>
          Retry
        </button>
      </div>
    );
  }

  return (
    user && (
      <div className="profile-container">
        <h1 className="profile-title">
          Welcome, {user.user_metadata?.name || "User"}!
        </h1>
        <img
          src={user.user_metadata?.avatar_url || "/default-user.png"}
          alt={user.user_metadata?.name || "User Profile"}
          className="profile-image"
        />
        <div className="profile-details">
          <h2 className="profile-name">
            {user.user_metadata?.name || "Unknown User"}
          </h2>
          <p className="profile-email">Email: {user.email}</p>
        </div>
      </div>
    )
  );
}
