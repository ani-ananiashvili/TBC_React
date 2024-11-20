"use client";

import { useUser } from "@auth0/nextjs-auth0/client";
import { useState } from "react";
import "./Profile.css";
import Spinner from "../../../components/Spinner/Spinner";

interface User {
  name: string;
  email: string;
  picture: string;
}

export default function Profile() {
  const { user, error, isLoading } = useUser();
  const [isError, setIsError] = useState<string | null>(null);

  if (isLoading) {
    return (
      <div className="loading">
        <Spinner></Spinner>
      </div>
    );
  }

  if (error || isError) {
    return (
      <div className="error">
        <h2>Error loading profile</h2>
        <p>{error?.message || isError}</p>
        <button onClick={() => setIsError(null)}>Retry</button>
      </div>
    );
  }

  return (
    user && (
      <div className="profile-container">
        <h1 className="profile-title">User Profile</h1>
        <img
          src={user.picture || "User Picture"}
          alt={user.name || "User Profile"}
          className="profile-image"
        />
        <h2 className="profile-name">{user.name || "Unknown User"}</h2>
        <p className="profile-email">{user.email}</p>
      </div>
    )
  );
}
