import { NextRequest, NextResponse } from "next/server";
import supabase from "../../../utils/supabase/supabase";

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  image: string;
}

export async function GET(
  req: NextRequest,
  context: { params: { id: string } }
): Promise<NextResponse> {
  const { id } = context.params;

  const language = req.cookies.get("language")?.value || "en";

  const columns =
    language === "ka"
      ? "id, Title_Ka, Description_Ka, Price, Image" 
      : "id, Title, Description, Price, Image"; 

  if (!id || isNaN(Number(id))) {
    return NextResponse.json({ error: "Invalid product ID" }, { status: 400 });
  }

  try {
    const { data: product, error } = await supabase
      .from("Products")
      .select(columns)
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
