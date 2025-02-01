import { NextResponse } from "next/server";
import Stripe from "stripe";
import { createClient } from "../../utils/supabase/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2025-01-27.acacia",
});

export async function POST(req: Request) {
  try {
    const { cart } = await req.json();

    if (!cart || cart.length === 0) {
      throw new Error("Cart is empty.");
    }

    const supabase = await createClient();

    // Get the authenticated user
    const userResponse = await supabase.auth.getUser();
    const userId = userResponse.data.user?.id;

    if (!userId) {
      return NextResponse.json(
        { message: "User not authenticated" },
        { status: 401 }
      );
    }

    const lineItems = cart.map(
      (item: { stripe_price_id: any; quantity: any }) => ({
        price: item.stripe_price_id,
        quantity: item.quantity,
      })
    );

    // Create a Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/success-checkout`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/cancel`,
    });

    // Record the purchase in the 'Orders' table
    const orderData = cart.map(
      (item: {
        id: any;
        stripe_product_id: any;
        stripe_price_id: any;
        quantity: any;
      }) => ({
        user_id: userId,
        product_id: item.id,
        stripe_product_id: item.stripe_product_id,
        stripe_price_id: item.stripe_price_id,
        stripe_purchase_id: session.id,
        quantity: item.quantity,
      })
    );

    const { error: orderError } = await supabase
      .from("Orders")
      .insert(orderData);

    if (orderError) {
      console.error("Failed to record order:", orderError);
      return NextResponse.json(
        { message: "Failed to record order." },
        { status: 500 }
      );
    }

    return NextResponse.json({ sessionId: session.id });
  } catch (error) {
    console.error("Error processing purchase:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}
