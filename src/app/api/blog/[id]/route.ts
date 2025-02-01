import { NextRequest, NextResponse } from "next/server";
import supabase from "../../../utils/supabase/supabase";

export async function GET(
  req: NextRequest,
  props: { params: Promise<{ id: string }> }
): Promise<NextResponse> {
  const params = await props.params;
  try {
    const { id } = params;
    const language = req.cookies.get("language")?.value || "en";

    const columns =
      language === "ka"
        ? "id, Title_Ka, Description_Ka"
        : "id, Title, Description, Image";

    const { data: blog, error } = await supabase
      .from("Blog")
      .select(columns)
      .eq("id", id)
      .single();

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

export async function DELETE(
  req: NextRequest,
  props: { params: Promise<{ id: string }> }
): Promise<NextResponse> {
  const params = await props.params;
  try {
    const { id } = params;

    const { data, error } = await supabase.from("Blog").delete().eq("id", id);

    if (error) {
      throw new Error(error.message);
    }

    return NextResponse.json({ message: "Blog deleted successfully", data });
  } catch (error) {
    console.error("Error deleting blog:", error);

    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}
