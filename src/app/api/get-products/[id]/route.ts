import { NextResponse } from "next/server";
import { createClient } from "../../../utils/supabase/server";

export async function GET(req: Request, context: { params: { id: string } }) {
  try {
    const { id } = context.params;

    const supabase = await createClient();
    const { data, error } = await supabase
      .from("Furniture_Products")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      console.error("Error fetching product:", error.message);
      return NextResponse.json(
        { message: "Error fetching product" },
        { status: 400 }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Failed to fetch product:", error);
    return NextResponse.json(
      { message: "Failed to fetch product" },
      { status: 500 }
    );
  }
}
