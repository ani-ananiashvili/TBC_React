import { NextRequest, NextResponse } from "next/server";
import supabase from "../../../utils/supabase/supabase";

export async function GET(req: NextRequest, props: { params: Promise<{ id: string }> }): Promise<NextResponse> {
  const params = await props.params;
  try {
    const { id } = params; 
    const language = req.cookies.get("language")?.value || "en"; 

    const columns =
      language === "ka"
        ? "id, Title_Ka, Description_Ka"
        : "id, Title, Description";

    const { data: post, error } = await supabase
      .from("Posts")
      .select(columns)
      .eq("id", id)
      .single(); 

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
