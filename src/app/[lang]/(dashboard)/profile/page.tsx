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
  const [subscriptionStatus, setSubscriptionStatus] = useState<string | null>(
    null
  );

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
          const { data } = await supabase
            .from("subscriptions")
            .select("status")
            .eq("user_id", user.id)
            .single();
          setSubscriptionStatus(data?.status || "free");
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
        <p className="profile-subscription">
          Subscription Status: {subscription}
        </p>
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
