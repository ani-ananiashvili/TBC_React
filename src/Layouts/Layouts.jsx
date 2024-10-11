import PropTypes from 'prop-types';
import Header from '../Components/Header/Header';
import Footer from '../Components/Footer/Footer';
import '../app.css'

const Layouts = ({ children }) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};

Layouts.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layouts;
