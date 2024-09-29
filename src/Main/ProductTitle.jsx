import PropTypes from 'prop-types';

function ProductTitle({ title }) {
  return <h3>{title}</h3>;
}

ProductTitle.propTypes = {
  title: PropTypes.string.isRequired,
};

export default ProductTitle;
