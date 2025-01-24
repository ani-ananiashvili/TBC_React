import { NextRequest, NextResponse } from "next/server";
import supabase from "../../utils/supabase/supabase";

export async function GET(req: NextRequest): Promise<NextResponse> {
  try {
    const language = req.cookies.get("language")?.value || "en";

    const columns =
      language === "ka"
        ? "id, Title_Ka, Description_Ka"
        : "id, Title, Description";

    const { data: blog, error } = await supabase.from("Blog").select(columns);

    if (error) {
      throw new Error(error.message);
    }

    return NextResponse.json(blog);
  } catch (error) {
    console.error("Error fetching blog:", error);

    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}
