import { NextResponse } from "next/server";
import Stripe from "stripe";
import { createClient } from "../../utils/supabase/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2025-01-27.acacia",
});

export async function POST(req: Request) {
  try {
    const { productId } = await req.json();

    if (!productId) {
      throw new Error("Product ID is required.");
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

    // Fetch product details from Supabase
    const { data: product, error } = await supabase
      .from("Furniture_Products")
      .select("id, stripe_product_id, stripe_price_id")
      .eq("id", productId)
      .single();

    if (error || !product) {
      throw new Error("Product not found");
    }

    // Create a Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price: product.stripe_price_id,
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/success-checkout`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/cancel`,
    });

    // Record the purchase in the `orders` table
    const { error: orderError } = await supabase.from("Orders").insert({
      user_id: userId,
      product_id: product.id,
      stripe_product_id: product.stripe_product_id,
      stripe_price_id: product.stripe_price_id,
      stripe_purchase_id: session.id,
    });

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
