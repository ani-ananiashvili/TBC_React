// server component

import ProductList from "./components/ProductList";
import "./products.css";

export default async function Products() {
  const res = await fetch("https://dummyjson.com/products");
  const data = await res.json();

  return (
    <div>
      <h1 className="product-title">Product List - Shop With Us!</h1>
      <ProductList initialProducts={data.products} />
    </div>
  );
}
