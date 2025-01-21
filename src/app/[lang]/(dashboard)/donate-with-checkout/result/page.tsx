import { stripe } from "../../../../../../lib/stripe";

export default async function ResultPage({
  searchParams,
}: {
  searchParams: { session_id: string };
}): Promise<JSX.Element> {
  const { session_id } = searchParams;

  if (!session_id) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-lg text-red-500">Error: No session ID provided.</p>
      </div>
    );
  }

  let session;
  try {
    session = await stripe.checkout.sessions.retrieve(session_id);
  } catch (error) {
    console.error("Error retrieving session:", error);
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-lg text-red-500">
          Error retrieving session: {String(error)}
        </p>
      </div>
    );
  }

  if (session.payment_status === "paid") {
    const productId = "prod_RPZWrI5nwKuGIS";
    let premiumProduct;
    try {
      premiumProduct = await stripe.products.retrieve(productId, {
        expand: ["default_price"],
      });
    } catch (error) {
      console.error("Error retrieving product:", error);
      return (
        <div className="flex min-h-screen items-center justify-center">
          <p className="text-lg text-red-500">
            Error retrieving product: {String(error)}
          </p>
        </div>
      );
    }

    if (!premiumProduct) {
      return (
        <div className="flex min-h-screen items-center justify-center">
          <p className="text-lg text-red-500">Product not found.</p>
        </div>
      );
    }

    if (
      premiumProduct.default_price &&
      typeof premiumProduct.default_price === "object" &&
      "unit_amount" in premiumProduct.default_price &&
      premiumProduct.default_price.unit_amount !== null
    ) {
      const formattedProduct = {
        id: premiumProduct.id,
        name: premiumProduct.name,
        description: premiumProduct.description || "No description available.",
        price: new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: premiumProduct.default_price.currency.toUpperCase(),
          minimumFractionDigits: 2,
        }).format(premiumProduct.default_price.unit_amount / 100),
        image: premiumProduct.images[0] || "",
      };

      return (
        <div className="flex-col items-center justify-center m-5">
          <h1 className="text-2xl text-center font-bold text-green-500 mb-4">
            Payment Successful!
          </h1>
          <p className="text-gray-700 mb-4 text-center">
            Enjoy your premium access:
          </p>
          <div className="max-w-md bg-white shadow-md rounded-lg p-6">
            <div className="flex flex-col items-center">
              <img
                src={formattedProduct.image}
                alt={formattedProduct.name}
                className="w-32 h-32 object-cover rounded-md mb-4"
              />
              <h2 className="text-lg font-semibold">{formattedProduct.name}</h2>
              <p className="text-gray-600 text-sm mb-2">
                {formattedProduct.description}
              </p>
              <p className="text-lg font-bold text-gray-800">
                {formattedProduct.price}
              </p>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50">
          <p className="text-lg text-red-500">
            Error: Unable to retrieve price information for the product.
          </p>
        </div>
      );
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <p className="text-lg text-red-500">Payment not successful.</p>
    </div>
  );
}
