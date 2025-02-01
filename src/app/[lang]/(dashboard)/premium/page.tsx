"use client";

import CheckoutForm from "../../../components/Stripe/CheckoutForm";
import { useState } from "react";

export default function PremiumPage(): JSX.Element {
  const [showModal, setShowModal] = useState(false);

  const handleUnsubscribeClick = () => {
    setShowModal(true);
  };

  const handleCancel = async () => {
    setShowModal(false);
    await new Promise((resolve) => setTimeout(resolve, 2000));
  };

  return (
    <div className="pt-24 premium-page bg-gray-50 min-h-screen flex flex-col items-center justify-center p-6 dark:bg-dark-gradient">
      <div className="max-w-4xl w-full bg-white p-8 rounded-xl shadow-lg dark:bg-dark-gradient dark:text-white">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4 dark:text-white">
            Choose Your Plan
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Select a plan that suits your needs and unlock exclusive features.
          </p>
        </header>

        <section className="plan-options flex flex-col md:flex-row justify-center gap-8 mb-8">
          <div className="plan free-plan bg-gray-100 p-6 rounded-lg shadow-md flex-1 dark:bg-gray-700 dark:text-white">
            <h2 className="text-2xl font-semibold mb-4">Free Plan</h2>
            <p className="mb-4">
              Explore a variety of products with different brands and make your
              purchase.
            </p>
            <ul className="list-disc pl-5">
              <li>Access to various products</li>
              <li>Browse different brands</li>
              <li>Ability to purchase items</li>
            </ul>
          </div>

          <div className="plan pro-plan bg-blue-100 p-6 rounded-lg shadow-md flex-1 dark:bg-blue-400 dark:text-white">
            <h2 className="text-2xl font-semibold mb-4">Pro Plan</h2>
            <p className="mb-4">
              Unlock home inspiration, ideas, and exclusive access to
              inspirational content.
            </p>
            <ul className="list-disc pl-5 mb-6">
              <li>Home inspiration and ideas</li>
              <li>Access to premium home designs and inspirations</li>
              <li>Exclusive access to curated home content</li>
            </ul>
          </div>
        </section>

        <section id="checkout-form" className="flex justify-center mb-8">
          <div className="bg-blue-50 p-6 rounded-xl shadow-md w-full max-w-lg flex justify-center text-xl text-green-600 dark:bg-blue-400 dark:text-white">
            <CheckoutForm />
          </div>
        </section>

        {showModal && (
          <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50"></div>
        )}
      </div>
    </div>
  );
}
