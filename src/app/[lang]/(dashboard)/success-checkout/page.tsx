"use client";

import { useEffect, useState } from "react";
import Head from "next/head";

export default function SuccessCheckout() {
  const [orderDetails, setOrderDetails] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const sessionId = new URLSearchParams(window.location.search).get(
      "session_id"
    );

    if (!sessionId) {
      setError("No session ID found.");
      setLoading(false);
      return;
    }

    const fetchOrderDetails = async () => {
      try {
        const response = await fetch(
          `/api/get-order-details?session_id=${sessionId}`
        );
        const data = await response.json();

        if (response.ok) {
          setOrderDetails(data.order.reverse());
        } else {
          throw new Error(data.message || "Failed to fetch order details");
        }
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center">
        <p className="text-xl font-semibold text-gray-700">
          Loading your order details...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center">
        <p className="text-xl font-semibold text-red-500">Error: {error}</p>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Order #{orderDetails?.[0]?.id} - Success</title>
        <meta
          name="description"
          content={`Order ${orderDetails?.[0]?.id} details - Thank you for your purchase!`}
        />
      </Head>

      <div className="m-10 flex flex-col items-center justify-center bg-gray-50 p-6 rounded-lg shadow-lg">
        <h1 className="text-4xl font-extrabold text-green-600 mb-6">
          Payment Successful!
        </h1>
        <p className="text-lg text-gray-700 mb-4">
          Your payment has been successfully processed.
        </p>

        <div className="w-full bg-white p-6 rounded-lg shadow-md mt-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
            Order Details
          </h2>
          <ul className="space-y-4">
            {orderDetails?.map((order: any) => (
              <li
                key={order.id}
                className="border-b pb-4 mb-4 flex justify-between items-center"
              >
                <div>
                  <p className="text-lg font-medium text-gray-800">
                    Product: {order.name}
                  </p>
                  <p className="text-gray-600">
                    Price: <span className="font-semibold">${order.price}</span>
                  </p>
                  <p className="text-gray-600">
                    Quantity:{" "}
                    <span className="font-semibold">{order.quantity}</span>
                  </p>
                </div>
                <p className="text-gray-600 text-right">
                  Date:{" "}
                  <span className="font-semibold">
                    {new Date(order.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
