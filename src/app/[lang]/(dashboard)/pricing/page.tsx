import type { Metadata } from "next";
import CheckoutForm from "../../../components/Stripe/CheckoutForm";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Upgrade to Premium | Stripe Integration",
};

export default function PricingPage(): JSX.Element {
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
          <Link
            href="/unsubscribe"
            className="text-red-500 hover:text-red-700 text-lg"
          >
            Unsubscribe
          </Link>
        </div>
      </div>
    </div>
  );
}
