import { NextResponse } from "next/server";
import { supabase } from "../../lib/supabase";

export async function GET() {
  try {
    const { data: products, error } = await supabase
      .from("Create_Products")
      .select("*");

    if (error) {
      throw new Error(`Error fetching products: ${error.message}`);
    }

    return NextResponse.json({ products });
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}
