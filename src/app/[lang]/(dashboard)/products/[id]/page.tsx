import React from "react";
 
type product = {
  id: number;
  Title: string;
  Description: string;
  Price: number;
};
 
async function getproduct(id: string): Promise<product> {
  const response = await fetch(`http://localhost:3000/api/products/${id}`, {
    cache: "no-store",
  });
 
  if (!response.ok) {
    throw new Error("Failed to fetch the product");
  }
 
  return response.json();
}
 
export default async function productPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;
 
  try {
    const product = await getproduct(id);
 
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="p-8 bg-white shadow-md rounded-lg max-w-md text-center">
          <h1 className="text-2xl font-bold mb-4">{product.Title}</h1>
          <p className="text-gray-700">{product.Description}</p>
          <p className="text-gray-700">{product.Price}</p>
        </div>
      </div>
    );
  } catch (error: any) {
    return <div>Error: {error.message}</div>;
  }
}