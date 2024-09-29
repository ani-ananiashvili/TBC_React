import PropTypes from 'prop-types';

function AddToCartButton({ buttonColor }) {
  return (
    <button className="add-to-cart" style={{ backgroundColor: buttonColor }}>
      Add to Cart
    </button>
  );
}

AddToCartButton.propTypes = {
  buttonColor: PropTypes.string.isRequired,
};

export default AddToCartButton;
