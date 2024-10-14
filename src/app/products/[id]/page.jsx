// server component

import ProductDetails from "../components/ProductDetails";
import "./index.css";

export default async function ProductPage({ params }) {
  const { id } = params;

  const res = await fetch(`https://dummyjson.com/products/${id}`);
  if (!res.ok) {
    return <p className="product-not-found">Product not found...</p>;
  }
  const product = await res.json();

  return <ProductDetails product={product} />;
}
