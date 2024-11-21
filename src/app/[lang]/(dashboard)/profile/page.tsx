"use client";

import { useUser } from "@auth0/nextjs-auth0/client";
import { useState } from "react";
import "./profile.css";
import Spinner from "../../../components/Spinner/Spinner";

export default function Profile() {
  const { user, error, isLoading } = useUser();
  const [isError, setIsError] = useState<string | null>(null);

  if (isLoading) {
    return (
      <div className="loading">
        <Spinner />
      </div>
    );
  }

  if (error || isError) {
    return (
      <div className="error">
        <h2>Error loading profile</h2>
        <p>{error?.message || isError}</p>
        <button className="retry-button" onClick={() => setIsError(null)}>
          Retry
        </button>
      </div>
    );
  }

  return (
    user && (
      <div className="profile-container">
        <h1 className="profile-title">Welcome, {user.name || "User"}!</h1>
        <img
          src={user.picture || "/default-user.png"}
          alt={user.name || "User Profile"}
          className="profile-image"
        />
        <div className="profile-details">
          <h2 className="profile-name">{user.name || "Unknown User"}</h2>
          <p className="profile-email">Email: {user.email}</p>
        </div>
      </div>
    )
  );
}
