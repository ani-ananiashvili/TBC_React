import PropTypes from 'prop-types';

function ProductDescription({ description }) {
  return <p>{description}</p>;
}

ProductDescription.propTypes = {
  description: PropTypes.string.isRequired,
};

export default ProductDescription;
