import { NextRequest, NextResponse } from "next/server";
import supabase from "../../components/utils/supabase";

interface Post {
  id: number;
  title: string;
  description: string;
}

export async function GET(req: NextRequest): Promise<NextResponse> {
  const language = req.cookies.get("language")?.value || "en";

  const columns =
    language === "ka"
      ? "id, Title_Ka, Description_Ka"
      : "id, Title, Description";

  const { data: posts, error } = await supabase.from("Blogs").select(columns);

  if (error) {
    console.error("Error fetching posts:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(posts);
}
