import { NextResponse } from "next/server";
import supabase from "../../../components/utils/supabase";

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
}

export async function GET(
  request: Request,
  context: { params: { id: string } }
) {
  const { id } = await context.params;

  if (!id || isNaN(Number(id))) {
    return NextResponse.json({ error: "Invalid product ID" }, { status: 400 });
  }

  try {
    const { data: product, error } = await supabase
      .from("products")
      .select("*")
      .eq("id", Number(id))
      .single<Product>();

    if (error || !product) {
      console.error("Error fetching product:", error);
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json(product, { status: 200 });
  } catch (err) {
    console.error("Unexpected error:", err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
