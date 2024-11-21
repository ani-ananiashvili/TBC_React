import React from "react";

type product = {
  id: number;
  Title: string;
  Description: string;
  Price: number;
  Image: string;
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
  const { id } = params;

  try {
    const product = await getproduct(id);

    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="p-10 bg-white shadow-md rounded-lg max-w-2xl text-center">
          <img
            src={product.Image}
            alt={product.Title}
            className="w-full h-64 object-cover rounded-md mb-6"
          />
          <h1 className="text-3xl font-bold mb-4">{product.Title}</h1>
          <p className="text-gray-700 mb-4">{product.Description}</p>
          <p className="text-gray-700 text-lg font-medium">Price: ${product.Price}</p>
        </div>
      </div>
    );
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    return <div>Error: {errorMessage}</div>;
  }
}
