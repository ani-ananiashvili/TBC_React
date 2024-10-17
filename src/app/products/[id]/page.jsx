import './index.css'

async function ProductDetail({ params }) {
  const response = await fetch(`https://dummyjson.com/products/${params.id}`);
  const product = await response.json();

  if (!product) {
    return <p>Product Not Found...</p>;
  }

  return (
    <div className="product-detail-card">
      <h1>{product.title}</h1>
      <img src={product.images[0]} alt={product.title} />
      <p>{product.description}</p>
      <p>Price: ${product.price}</p>
    </div>
  );
}

export default ProductDetail;
