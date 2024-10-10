"use client"; 

import { useEffect, useState } from "react";
import Link from 'next/link'; 
import './Products.css'; 

const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchProducts() {
      const response = await fetch("https://dummyjson.com/products");
      const data = await response.json();
      setProducts(data.products); 
    }

    fetchProducts();
  }, []);

  return (
    <div>
      <h1>Product List</h1>
      <div className="product-grid">
        {products.map((product) => (
          <div key={product.id} className="product-card">
     <Link href={`/products/${product.id}`}>
  <img src={product.thumbnail} alt={product.title} />
  <h2>{product.title}</h2>
  <p>{product.description}</p>
  <p>Price: ${product.price}</p>
</Link>

          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
