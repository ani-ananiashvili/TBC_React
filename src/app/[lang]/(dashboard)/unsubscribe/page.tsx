"use client";

import { useState } from "react";
import Link from "next/link";

export default function UnsubscribePage() {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<string | null>(null);

  const handleUnsubscribe = async () => {
    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setStatus("You have successfully unsubscribed from the Premium Plan.");
    } catch (error) {
      setStatus("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="unsubscribe-page bg-gray-50 min-h-screen flex flex-col items-center justify-center py-12 px-6">
      <div className="max-w-3xl w-full bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">
          Unsubscribe
        </h1>
        <p className="text-lg text-center text-gray-600 mb-6">
          If you want to cancel your premium subscription, click the button
          below.
        </p>

        <div className="text-center mb-6">
          <button
            onClick={handleUnsubscribe}
            className={`${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-red-500 hover:bg-red-600"
            } text-white py-3 px-8 rounded-md transition duration-200 ease-in-out`}
            disabled={loading}
          >
            {loading ? "Processing..." : "Unsubscribe"}
          </button>
        </div>

        {status && (
          <div
            className={`mt-6 text-center text-lg ${
              status.includes("error") ? "text-red-600" : "text-green-600"
            }`}
          >
            <p>{status}</p>
          </div>
        )}

        {status && !status.includes("error") && (
          <div className="text-center mt-6">
            <Link
              href="/pricing"
              className="text-blue-500 hover:text-blue-700 text-lg"
            >
              Back to Pricing
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
