import { NextResponse } from "next/server";
import { createClient } from "../../utils/supabase/server";

export async function GET(req: Request) {
  try {
    const supabase = await createClient();
    const userResponse = await supabase.auth.getUser();
    const userId = userResponse.data.user?.id;

    if (!userId) {
      return NextResponse.json(
        { message: "User not authenticated." },
        { status: 401 }
      );
    }

    const { data, error } = await supabase
      .from("Orders")
      .select("*")
      .eq("user_id", userId);

    if (error) {
      throw new Error(error.message);
    }

    if (!data || data.length === 0) {
      return NextResponse.json(
        { message: "No orders found." },
        { status: 404 }
      );
    }

    console.log("Fetched Order Data:", data);

    const productIds = data.map((order: any) => order.product_id);
    const { data: products, error: productError } = await supabase
      .from("Furniture_Products")
      .select("*")
      .in("id", productIds);

    if (productError) {
      throw new Error(productError.message);
    }

    const orderDetails = data.map((order: any) => {
      const product = products.find(
        (product: any) => product.id === order.product_id
      );
      return {
        ...order,
        name: product?.name,
        price: product?.price,
        description: product?.description,
        date: order.created_at,
      };
    });

    console.log("Mapped Order Details:", orderDetails);

    return NextResponse.json({ order: orderDetails });
  } catch (error) {
    return NextResponse.json(
      { message: (error as Error).message },
      { status: 500 }
    );
  }
}
