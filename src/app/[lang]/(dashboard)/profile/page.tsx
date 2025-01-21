"use client";

import { useState, useEffect } from "react";
import { createClient } from "../../../utils/supabase/client";
import Spinner from "../../../components/Spinner/Spinner";
import useAuth from "../../../hooks/useAuth";

export default function Profile() {
  const { user, isLoading, isAuthenticated } = useAuth();
  const [isError, setIsError] = useState<string | null>(null);

  const supabase = createClient();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Spinner />
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <h2 className="text-lg font-semibold text-gray-800">
          Please log in to view your profile.
        </h2>
      </div>
    );
  }

  const userName = user?.user_metadata?.name || "User";
  const avatarUrl =
    user?.user_metadata?.avatar_url ||
    "https://cdn-icons-png.flaticon.com/256/8017/8017294.png";
  const email = user?.email || "No email available";

  return (
    <div className="flex items-center justify-center m-20">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold text-center text-gray-600 mb-4">
          {userName}
        </h1>
        <div className="flex items-center justify-center">
          <img
            src={avatarUrl}
            alt={userName}
            className="h-24 w-24 rounded-full border-2 border-gray-300 shadow-md"
          />
        </div>
        <div className="mt-6">
          {/* <p className="text-xl font-semibold text-gray-800">{userName}</p> */}
          <p className="text-gray-600 mt-2">Email: {email}</p>
        </div>
      </div>
    </div>
  );
}
