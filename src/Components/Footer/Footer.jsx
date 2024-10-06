import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="go-mobile">
          <h2>Go mobile</h2>
          <div className="mobile-img">
            <a href="#">
              <img src="/app-store.png" alt="App Store" />
            </a>
            <a href="#">
              <img src="/google-play.png" alt="Google Play" />
            </a>
          </div>
        </div>

        <div className="footer-links">
          <ul>
            <li>
              <a href="/">Legal</a>
            </li>
            <li>
              <a href="/">Privacy</a>
            </li>
            <li>
              <a href="/">Artist Resources</a>
            </li>
          </ul>

          <ul>
            <li>
              <a href="/">Imprint</a>
            </li>
            <li>
              <a href="/">Cookie Policy</a>
            </li>
            <li>
              <a href="/">Cookie Manager</a>
            </li>
          </ul>

          <ul>
            <li>
              <a href="/blog">Blog</a>
            </li>
            <li>
              <a href="/">Charts</a>
            </li>
            <li>
              <a href="/">Transparency Reports</a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
