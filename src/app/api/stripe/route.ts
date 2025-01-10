"use server";

import { headers } from "next/headers";
import { CURRENCY } from "../../../../config";
import { formatAmountForStripe } from "../../utils/stripe/stripe-helpers";
import { stripe } from "../../../../lib/stripe";

export async function createCheckoutSession(
  data: FormData
): Promise<{ url: string | null }> {
  const origin = (await headers()).get("origin") as string;

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: CURRENCY,
            product_data: { name: "Premium Plan Subscription" },
            unit_amount: formatAmountForStripe(50, CURRENCY),
          },
        },
      ],
      success_url: `${origin}/donate-with-checkout/result?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/donate-with-checkout`,
    });

    return { url: session.url };
  } catch (error) {
    console.error("Error creating Stripe checkout session:", error);
    return { url: null };
  }
}
