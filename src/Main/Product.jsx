import ProductTitle from "./ProductTitle";
import ProductDescription from "./ProductDescription";
import ProductImage from "./ProductImage";
import AddToCartButton from "./AddToCartButton";
import "./Product.css";

function Product({ title, description, image, price, buttonColor }) {
  return (
    <div className="product">
      <ProductImage image={image} title={title} />
      <ProductTitle title={title} />
      <ProductDescription description={description} />
      <p className="product-price">{price}</p>
      <AddToCartButton buttonColor={buttonColor} />
    </div>
  );
}

export default Product;
