import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="go-mobile">
          <h2>Go mobile</h2>
          <div className="mobile-img">
            <a href="#">
              <img src="/public/app-store.png" alt="image" />
            </a>
            <a href="#">
              <img src="/public/google-play.png" alt="image" />
            </a>
          </div>
        </div>

        <div className="footer-links">
          <ul>
            <li>
              <a href="#">Legal</a>
            </li>
            <li>
              <a href="#">Privacy</a>
            </li>
            <li>
              <a href="#">Cookie Policy</a>
            </li>
          </ul>

          <ul>
            <li>
              <a href="#">Cookie Manager</a>
            </li>
            <li>
              <a href="#">Imprint</a>
            </li>
            <li>
              <a href="#">Artist Resources</a>
            </li>
          </ul>

          <ul>
            <li>
              <a href="#">Blog</a>
            </li>
            <li>
              <a href="#">Charts</a>
            </li>
            <li>
              <a href="#">Transparency Reports</a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
