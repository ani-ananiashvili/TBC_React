import { NextResponse } from "next/server";
import supabase from "../../components/utils/supabase";

interface Post {
  id: number;
  title: string;
  content: string;
}

interface SupabaseError {
  message: string;
}

export async function GET(): Promise<NextResponse> {
  const {
    data: posts,
    error,
  }: { data: Post[] | null; error: SupabaseError | null } = await supabase
    .from("posts")
    .select("*");

  if (error) {
    console.error("Error fetching posts:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(posts);
}
