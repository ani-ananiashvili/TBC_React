"use client";

import { useState, useEffect } from "react";
import { createClient } from "../../../utils/supabase/client";
import Spinner from "../../../components/Spinner/Spinner";
import useAuth from "../../../hooks/useAuth";
import { useLanguageContext } from "../../../context/LanguageContext";

export default function Profile() {
  const { user, isLoading, isAuthenticated } = useAuth();
  const [isError, setIsError] = useState<string | null>(null);
  const supabase = createClient();
  const { language } = useLanguageContext();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userResponse = await supabase.auth.getUser();
        const userId = userResponse.data.user?.id;
        if (!userId) {
          setIsError("User not authenticated");
          return;
        }
      } catch (error) {
        setIsError("An error occurred while fetching user data.");
      }
    };

    if (isAuthenticated) {
      fetchUserData();
    }
  }, [isAuthenticated, supabase]);

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
        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
          {language === "ka"
            ? "გთხოვთ, გაიარეთ ავტორიზაცია რომ შეძლოთ თქვენი პროფილის ნახვა"
            : "Please log in to view your profile"}
        </h2>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <h2 className="text-lg font-semibold text-red-500">{isError}</h2>
      </div>
    );
  }

  const userName =
    user?.user_metadata?.name || (language === "ka" ? "მომხმარებელი" : "User");
  const avatarUrl =
    user?.user_metadata?.avatar_url ||
    "https://cdn-icons-png.flaticon.com/512/8188/8188359.png";
  const email =
    user?.email ||
    (language === "ka" ? "ელ.ფოსტა მიუწვდომელია" : "No email available");

  return (
    <div className="flex items-center justify-center pt-40 pb-24 bg-light-gradient dark:bg-dark-gradient">
      <div className="bg-white dark:bg-dark-gradient p-12 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold text-center text-gray-600 dark:text-gray-200 mb-4">
          {userName}
        </h1>
        <div className="flex items-center justify-center">
          <img
            src={avatarUrl}
            alt={userName}
            className="h-24 w-24 rounded-full border-2 border-gray-300 dark:border-gray-500 shadow-md"
          />
        </div>
        <div className="mt-6">
          <p className="text-gray-600 dark:text-gray-300 mt-2 text-center">
            {language === "ka" ? "ელ.ფოსტა:" : "Email:"} {email}
          </p>
        </div>
      </div>
    </div>
  );
}
