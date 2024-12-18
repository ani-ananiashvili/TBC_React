"use client";

import React, { useState } from "react";
import { createCheckoutSession } from "../actions/stripe";

export default function CheckoutForm(): JSX.Element {
  const [loading, setLoading] = useState(false);

  const handleCheckout = async (): Promise<void> => {
    setLoading(true);

    const data = new FormData();
    data.append("uiMode", "hosted");
    data.append("customDonation", "5000");

    const { url } = await createCheckoutSession(data);

    if (url) {
      window.location.assign(url);
    } else {
      setLoading(false);
    }
  };

  return (
    <div>
      <button
        className="checkout-btn"
        onClick={handleCheckout}
        disabled={loading}
      >
        {loading ? "Processing..." : `Subscribe for $50`}
      </button>
    </div>
  );
}
