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
  <div className="max-w-6xl mx-auto p-6">
    <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">Products</h1>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <div
          key={product.id}
          className="bg-white border border-gray-200 shadow-md rounded-lg p-6 flex flex-col justify-between hover:shadow-lg transition-shadow duration-300"
        >
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            {product.Title}
          </h2>
          <p className="text-gray-600 text-sm mb-4">{product.Description}</p>
          <p className="text-gray-800 text-base font-medium">
            Price: {product.Price} $
          </p>
        </div>
      ))}
    </div>
  </div>
);

}