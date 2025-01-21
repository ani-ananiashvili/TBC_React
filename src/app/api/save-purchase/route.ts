import { NextResponse } from "next/server";
import { supabase } from "../../lib/supabase";

export async function POST(req: Request) {
  try {
    const { productId, email, stripePaymentId } = await req.json();

    const { error } = await supabase.from("Purchases").insert([
      {
        product_id: productId,
        user_email: email,
        stripe_payment_id: stripePaymentId,
        amount: 1, 
      },
    ]);

    if (error) {
      throw new Error("Error saving purchase record.");
    }

    return NextResponse.json({ message: "Purchase recorded successfully!" });
  } catch (error) {
    console.error("Error saving purchase:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}
