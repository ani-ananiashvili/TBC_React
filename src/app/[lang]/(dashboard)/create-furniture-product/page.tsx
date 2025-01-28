import Stripe from "stripe";
import { createClient } from "../../../utils/supabase/server";

export default function CreateProductForm() {
  async function createProduct(formData: FormData) {
    "use server";

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
    const supabase = await createClient();

    const name = formData.get("name") as string;
    const price = Number(formData.get("price"));
    const photo = formData.get("photo") as string;
    const brand = formData.get("brand") as string;
    const description = formData.get("description") as string;

    // 1. Create product in Stripe
    const stripeProduct = await stripe.products.create({
      name,
      description,
      images: [photo],
    });

    // 2. Create price in Stripe
    const stripePrice = await stripe.prices.create({
      product: stripeProduct.id,
      unit_amount: price * 100,
      currency: "usd",
    });

    // auth user

   const userResponse = await supabase.auth.getUser();
   const userId = userResponse.data.user?.id;

    // 3. Create product in supabase
    const { data, error } = await supabase
      .from("Furniture_Products")
      .insert({
        name,
        price,
        photo,
        brand,
        description,
        user_id: userId,
        stripe_product_id: stripeProduct.id,
        stripe_price_id: stripePrice.id,
      })
      .single();

      console.log(data, error);

    // console.log({ stripeProduct, stripePrice });
  }

  return (
    <form
      action={createProduct}
      className="m-10 max-w-lg mx-auto space-y-4 p-6 bg-gray-100 shadow-md rounded-lg"
    >
      <div>
        <label
          htmlFor="name"
          className="block text-lg font-medium text-gray-700"
        >
          Product Name:
        </label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Enter product name"
          className="w-full p-2 mt-1 border border-gray-300 outline-none"
        />
      </div>

      <div>
        <label
          htmlFor="price"
          className="block text-lg font-medium text-gray-700"
        >
          Price:
        </label>
        <input
          type="number"
          id="price"
          name="price"
          placeholder="Enter price"
          className="w-full p-2 mt-1 border border-gray-300 outline-none"
        />
      </div>

      <div>
        <label
          htmlFor="photo"
          className="block text-lg font-medium text-gray-700"
        >
          Photo Link:
        </label>
        <input
          type="url"
          id="photo"
          name="photo"
          placeholder="Enter photo URL"
          className="w-full p-2 mt-1 border border-gray-300 outline-none"
        />
      </div>

      <div>
        <label
          htmlFor="brand"
          className="block text-lg font-medium text-gray-700"
        >
          Brand Name:
        </label>
        <input
          type="text"
          id="brand"
          name="brand"
          placeholder="Enter brand name"
          className="w-full p-2 mt-1 border border-gray-300 rounded-md outline-none"
        />
      </div>

      <div>
        <label
          htmlFor="description"
          className="block text-lg font-medium text-gray-700"
        >
          Description:
        </label>
        <textarea
          id="description"
          name="description"
          placeholder="Enter product description"
          className="w-full p-2 mt-1 border border-gray-300 outline-none"
        />
      </div>

      <button
        type="submit"
        className="w-full py-2 px-4 bg-sky-700 text-white font-bold rounded-md hover:bg-sky-600"
      >
        Create Product
      </button>
    </form>
  );
}
