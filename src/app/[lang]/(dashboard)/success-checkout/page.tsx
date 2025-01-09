"use client";

export default function SuccessCheckout() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold text-green-600 mb-4">
        Payment Successful!
      </h1>
      <p className="text-lg text-gray-700">
        Your payment has been successfully processed. Thank you for your purchase!
      </p>
      <a
        href="/"
        className="mt-6 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"
      >
        Go to Home
      </a>
    </div>
  );
}
