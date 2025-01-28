import { NextResponse } from "next/server";
import Stripe from "stripe";
import { supabase } from "../../lib/supabase";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2025-01-27.acacia",
});

export async function POST(req: Request) {
  try {
    const { productId } = await req.json();

    if (!productId) {
      throw new Error("Product ID is required.");
    }

    const { data: product, error } = await supabase
      .from("Create_Products")
      .select("*")
      .eq("id", productId)
      .single();

    if (error || !product) {
      throw new Error("Product not found");
    }

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

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Error processing purchase:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}
