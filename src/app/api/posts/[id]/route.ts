import { NextRequest, NextResponse } from "next/server";
import supabase from "../../../components/utils/supabase";

export async function GET(req: NextRequest, { params }: { params: { id: string } }): Promise<NextResponse> {
  try {
    const { id } = params; // Get dynamic `id` from URL
    const language = req.cookies.get("language")?.value || "en"; // Check for language cookie

    const columns =
      language === "ka"
        ? "id, Title_Ka, Description_Ka"
        : "id, Title, Description";

    // Fetch the post from Supabase based on the `id`
    const { data: post, error } = await supabase
      .from("Blogs")
      .select(columns)
      .eq("id", id)
      .single(); // Use `.single()` to ensure only one post is returned

    if (error) {
      throw new Error(error.message);
    }

    return NextResponse.json(post);
  } catch (error) {
    console.error("Error fetching post:", error);

    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}
