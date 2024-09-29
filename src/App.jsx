import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./Header/Header";
import MainContent from "./Main/MainContent";
import Footer from "./Footer/Footer";
import Contact from "./Contact/Contact";
import About from "./About/About";
import Assignment3 from "./Assignment/Assignment3";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<MainContent />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/assignment3" element={<Assignment3 />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
