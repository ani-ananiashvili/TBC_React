"use server";

import { headers } from "next/headers";
import { CURRENCY } from "../../../config";
import { formatAmountForStripe } from "../../../utils/stripe/stripe-helpers";
import { stripe } from "../../../lib/stripe";

export async function POST(req: Request): Promise<Response> {
  const headersList = await headers();
  const origin = headersList.get("origin") as string;

  try {
    const body = await req.json();
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
      success_url: `${origin}/pricing/result?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/pricing`,
    });

    return new Response(JSON.stringify({ url: session.url }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error creating Stripe checkout session:", error);

    return new Response(
      JSON.stringify({ error: "Error creating checkout session" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
