import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "../styles/App.css";
import Header from "../components/Header/Header";
import MainContent from "../components/Main/MainContent";
import Footer from "../components/Footer/Footer";
import Contact from "./Contact/Contact";
import About from "./About/About";
import Assignment3 from "./Assignment/Assignment3";
import Blog from "./Blog/Blog";
import Profile from "./Profile/Profile";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<MainContent />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/assignment3" element={<Assignment3 />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
