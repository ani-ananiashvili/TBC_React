import Link from "next/link";
interface Products {
  id: number;
  Title: string;
  Description: string;
  Price: number;
};



export default async function ProductsPage() {
  
const response = await fetch("http://localhost:3000/api/products");
const products:Products[] = await response.json();

return (
  <div>
    <h1>Products</h1>
    {products.map((product) => (
      <div key={product.id} className="">
        <h2>{product.Title}</h2>
        <p>{product.Description}</p>
        <p>Price: {product.Price}</p>
      </div>
    ))}
  </div>
);

}