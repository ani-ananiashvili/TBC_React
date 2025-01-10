"use client";

import { useState, useEffect } from "react";
import { createClient } from "../../../utils/supabase/client";
import Spinner from "../../../components/Spinner/Spinner";
import useAuth from "../../../hooks/useAuth";
import "./profile.css";

export default function Profile() {
  const { user, isLoading, isAuthenticated } = useAuth();
  const [subscriptionStatus, setSubscriptionStatus] = useState<string | null>(null);
  const [isError, setIsError] = useState<string | null>(null);

  const supabase = createClient();

  useEffect(() => {
    const fetchSubscriptionStatus = async () => {
      if (user) {
        const { data, error } = await supabase
          .from("subscriptions")
          .select("status")
          .eq("user_id", user.id)
          .single();
        if (error) {
          setIsError(error.message);
        } else {
          setSubscriptionStatus(data?.status || "free");
        }
      }
    };

    if (user) {
      fetchSubscriptionStatus();
    }
  }, [user]);

  if (isLoading) {
    return (
      <div className="loading">
        <Spinner />
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="error">
        <h2>Please log in to view your profile.</h2>
      </div>
    );
  }

  const userName = user?.user_metadata?.name || "User";
  const avatarUrl = user?.user_metadata?.avatar_url || "/default-user.png";
  const email = user?.email || "No email available";
  const subscription = subscriptionStatus === "premium" ? "Premium" : "Free";

  return (
    <div className="profile-container">
      <h1 className="profile-title">Welcome, {userName}!</h1>
      <img src={avatarUrl} alt={userName} className="profile-image" />
      <div className="profile-details">
        <h2 className="profile-name">{userName}</h2>
        <p className="profile-email">Email: {email}</p>
        <p className="profile-subscription">Subscription Status: {subscription}</p>
        {subscriptionStatus === "premium" && (
          <div className="premium-features">
            <h3>Premium Features:</h3>
            <ul>
              <li>500+ Furniture Designs</li>
              <li>Advanced Customization</li>
              <li>Priority Support</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
