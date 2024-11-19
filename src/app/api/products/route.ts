import { NextResponse } from "next/server";
import supabase from "../../components/utils/supabase";

interface Product {
  id: number;
  title: string;
  price: number;
  Description: string;
}

interface SupabaseError {
  message: string;
}

export async function GET(): Promise<NextResponse> {
  const {
    data: products,
    error,
  }: { data: Product[] | null; error: SupabaseError | null } = await supabase
    .from("products")
    .select("*");

  if (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(products);
}
