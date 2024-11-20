interface product {
  id: number;
  Title: string;
  Description: string;
  Price: number;
}

export default async function productsPage() {
  const res = await fetch("http://localhost:3000/api/products");
  const products: product[] = await res.json();

  return (
    <div>
      <h1>products</h1>
      {products.map((product) => (
        <div key={product.id} className=" mt-5 p-3 ">
          <h2 className="bg-cyan-600 border-b-4 text-2xl">{product.Title}</h2>
          <p className="bg-cyan-600 text-xl">{product.Description}</p>
          <p className="bg-cyan-600 text-xl">Price: {product.Price} $</p>
        </div>
      ))}
    </div>
  );
}
