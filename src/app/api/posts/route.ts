import { NextResponse } from "next/server";
import supabase from "../../components/utils/supabase";

export async function GET() {
  const { data: posts, error } = await supabase.from("posts").select("*");

  if (error) {
    console.error("Error fetching posts:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(posts);
}
