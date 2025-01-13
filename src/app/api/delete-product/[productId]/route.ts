import { NextResponse } from "next/server";
import { supabase } from "../../../../../lib/supabase";

export async function DELETE(req: Request, { params }: { params: { productId: string } }) {
  const productId = parseInt(params.productId);

  try {
    const { error } = await supabase
      .from("Create_Products")
      .delete()
      .eq("id", productId);

    if (error) {
      console.error("Supabase error:", error);
      throw new Error(`Error deleting product: ${error.message}`);
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
