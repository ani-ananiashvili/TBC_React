"use client";

import React, { useState, useEffect } from "react";
import { createCheckoutSession } from "../../actions/stripe";
import { useLanguageContext } from "../../context/LanguageContext";

export default function CheckoutForm(): JSX.Element {
  const [loading, setLoading] = useState(false);
  const [subscribed, setSubscribed] = useState<boolean>(false);
  const { language } = useLanguageContext();

  useEffect(() => {
    const isSubscribed = sessionStorage.getItem("isSubscribed") === "true";
    setSubscribed(isSubscribed);
  }, []);

  const handleCheckout = async (): Promise<void> => {
    setLoading(true);

    const data = new FormData();
    data.append("uiMode", "hosted");
    data.append("customDonation", "5000");

    const { url } = await createCheckoutSession(data);

    if (url) {
      sessionStorage.setItem("isSubscribed", "true");
      setSubscribed(true);
      window.location.assign(url);
    } else {
      setLoading(false);
    }
  };

  const handleUnsubscribe = (): void => {
    sessionStorage.removeItem("isSubscribed");
    setSubscribed(false);
  };

  return (
    <div>
      {subscribed ? (
        <div>
          <button
            className="checkout-btn"
            onClick={handleUnsubscribe}
            disabled={loading}
          >
            {loading
              ? language === "ka"
                ? "მიმდინარეობს გადახდის პროცესი..."
                : "Processing..."
              : language === "ka"
              ? "გამოწერის გაუქმება"
              : "Unsubscribe from Pro Plan"}
          </button>
        </div>
      ) : (
        <div>
          <button
            className="checkout-btn"
            onClick={handleCheckout}
            disabled={loading}
          >
            {loading
              ? language === "ka"
                ? "მიმდინარეობს გადახდის პროცესი..."
                : "Processing..."
              : language === "ka"
              ? "გადახდა $50"
              : "Subscribe for $50"}
          </button>
        </div>
      )}
    </div>
  );
}
