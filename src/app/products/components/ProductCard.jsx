"use client";

import Link from "next/link";

const ProductCard = ({ product }) => {
  return (
    <div className="product-card">
      <Link href={`/products/${product.id}`}>
        <img src={product.thumbnail} alt={product.title} />
        <h2>{product.title}</h2>
        <p>{product.description}</p>
        <p>Price: ${product.price}</p>
      </Link>
    </div>
  );
};

export default ProductCard;
