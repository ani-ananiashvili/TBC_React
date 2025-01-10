import { NextRequest, NextResponse } from "next/server";
import supabase from "../../utils/supabase/supabase";

export async function GET(req: NextRequest): Promise<NextResponse> {
  try {
    const language = req.cookies.get("language")?.value || "en";

    const columns =
      language === "ka"
        ? "id, Title_Ka, Description_Ka"
        : "id, Title, Description";

    const { data: posts, error } = await supabase.from("Posts").select(columns);

    if (error) {
      throw new Error(error.message);
    }

    return NextResponse.json(posts);
  } catch (error) {
    console.error("Error fetching posts:", error);

    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}
