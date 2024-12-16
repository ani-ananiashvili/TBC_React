import Link from "next/link";

export default function PricingPage(): JSX.Element {
  return (
    <div className="pricing-container">
      <h1>Explore Our Furniture Brand Plans</h1>
      <p>
        Choose the plan that suits you. Access our exclusive furniture designs
        and premium features with the Premium Plan.
      </p>

      <div className="pricing-cards">
        <div className="card">
          <h2>Free Plan</h2>
          <p>Perfect for casual users looking for inspiration.</p>
          <ul>
            <li>Access to 50+ furniture designs</li>
            <li>Basic support</li>
            <li>Limited customization options</li>
          </ul>
        </div>

        <div className="card premium">
          <h2>Premium Plan</h2>
          <p>
            Get exclusive access to our full collection and advanced features.
          </p>
          <ul>
            <li>Access to 500+ furniture designs</li>
            <li>Priority support</li>
            <li>Advanced customization options</li>
            <li>Early access to new collections</li>
          </ul>
          <Link href="/donate-with-checkout" className="button">
            Subscribe Now
          </Link>
        </div>
      </div>
    </div>
  );
}
