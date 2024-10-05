import PropTypes from 'prop-types';
import ProductTitle from './ProductTitle';
import ProductDescription from './ProductDescription';
import ProductImage from './ProductImage';
import AddToCartButton from './AddToCartButton';
import './Product.css';

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

Product.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  buttonColor: PropTypes.string.isRequired,
};

export default Product;
