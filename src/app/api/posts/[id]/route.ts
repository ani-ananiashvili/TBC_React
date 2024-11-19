import { NextResponse } from "next/server";
import supabase from "../../../components/utils/supabase";

interface Post {
  id: number;
  title: string;
  content: string;
  created_at?: string;
}

export async function GET(
  request: Request,
  context: { params: { id: string } }
) {
  const { id } = await context.params;

  if (!id || isNaN(Number(id))) {
    return NextResponse.json({ error: "Invalid post ID" }, { status: 400 });
  }

  try {
    const { data: post, error } = await supabase
      .from("posts")
      .select("*")
      .eq("id", Number(id))
      .single<Post>();

    if (error || !post) {
      console.error("Error fetching post:", error);
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    return NextResponse.json(post, { status: 200 });
  } catch (err) {
    console.error("Unexpected error:", err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
