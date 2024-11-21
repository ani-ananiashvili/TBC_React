import { NextRequest, NextResponse } from "next/server";
import supabase from "../../components/utils/supabase";

export async function GET(req: NextRequest): Promise<NextResponse> {
  try {
    const language = req.cookies.get("language")?.value || "en";

    const columns =
      language === "ka"
        ? "id, Title_Ka, Description_Ka, Price, Image"
        : "id, Title, Description, Price, Image";

    const { data: products, error } = await supabase
      .from("Products")
      .select(columns);

    if (error) {
      throw new Error(error.message);
    }

    return NextResponse.json(products);
  } catch (error: any) {
    console.error("Error fetching products:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
