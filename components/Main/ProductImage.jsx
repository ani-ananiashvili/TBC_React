import PropTypes from 'prop-types';

function ProductImage({ image, title }) {
  return <img src={image} alt={title} className="product-image" />;
}

ProductImage.propTypes = {
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default ProductImage;
