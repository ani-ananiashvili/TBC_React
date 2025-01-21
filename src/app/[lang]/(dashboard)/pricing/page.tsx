"use client";

import CheckoutForm from "../../../components/Stripe/CheckoutForm";
import { useState } from "react";
export default function PricingPage(): JSX.Element {
  const [showModal, setShowModal] = useState(false);

  const handleUnsubscribeClick = () => {
    setShowModal(true);
  };

  const handleCancel = async () => {
    setShowModal(false);
    await new Promise((resolve) => setTimeout(resolve, 2000));
  };

  return (
    <div className="pricing-page bg-gray-50 min-h-screen flex flex-col items-center justify-center p-6">
      <div className="max-w-4xl w-full bg-white p-8 rounded-xl shadow-lg">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Our Plans</h1>
          <p className="text-lg text-gray-600">
            Choose between our free and premium plans to access the best
            furniture designs and features.
          </p>
        </header>

        <section className="pricing-options flex flex-col md:flex-row justify-center gap-8 mb-8">
          <div className="plan free-plan bg-gray-100 p-6 rounded-lg shadow-md flex-1">
            <h2 className="text-2xl font-semibold mb-4">Free Plan</h2>
            <p className="mb-4">
              Enjoy limited access to our furniture collection.
            </p>
            <ul className="list-disc pl-5">
              <li>50+ furniture designs</li>
              <li>Basic customization</li>
              <li>Community support</li>
            </ul>
          </div>

          <div className="plan premium-plan bg-blue-100 p-6 rounded-lg shadow-md flex-1">
            <h2 className="text-2xl font-semibold mb-4">Premium Plan</h2>
            <p className="mb-4">
              Unlock exclusive designs and premium features.
            </p>
            <ul className="list-disc pl-5 mb-6">
              <li>500+ furniture designs</li>
              <li>Advanced customization</li>
              <li>Priority support</li>
              <li>Exclusive early access to new collections</li>
            </ul>
          </div>
        </section>

        <section id="checkout-form" className="flex justify-center mb-8">
          <div className="bg-blue-50 p-6 rounded-xl shadow-md w-full max-w-lg flex justify-center text-xl text-green-600">
            <CheckoutForm />
          </div>
        </section>

        <div className="text-center mt-6">
          <button
            onClick={handleUnsubscribeClick}
            className="text-red-500 hover:text-red-700 text-lg"
          >
            Unsubscribe from Premium
          </button>
        </div>

        {showModal && (
          <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
              <h3 className="text-xl font-semibold mb-4">
                Confirm Unsubscription
              </h3>
              <p className="text-gray-600 mb-6">
                Are you sure you want to cancel your Premium subscription?
              </p>
              <div className="flex justify-end gap-4">
                <button
                  onClick={() => setShowModal(false)}
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCancel}
                  className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
                >
                  Yes, Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
