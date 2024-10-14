const ProductDetails = ({ product }) => {
  return (
    <div className="product-details-container">
      <h1 className="product-title">{product.title}</h1>
      <img className="product-image" src={product.thumbnail} alt={product.title} />
      <p className="product-description">{product.description}</p>
      <p className="product-price">Price: ${product.price}</p>
      <button className="add-to-cart-button">Add to Cart</button>
    </div>
  );
};

export default ProductDetails;