import { NextResponse } from "next/server";
import { supabase } from "../../../lib/supabase";

export async function DELETE(req: Request) {
  const url = new URL(req.url);
  const productId = url.pathname.split("/").pop();

  if (!productId) {
    return NextResponse.json(
      { error: "Invalid or missing productId parameter" },
      { status: 400 }
    );
  }

  try {
    const { error } = await supabase
      .from("Furniture_Products")
      .delete()
      .eq("id", productId);

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ message: "Product deleted successfully!" });
  } catch (error) {
    console.error("Error deleting product:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}
