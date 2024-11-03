import "./Footer.css";
import Link from "next/link";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="go-mobile">
          <h2>Go mobile</h2>
          <div className="mobile-img">
            <a href="#">
              <img src="/assets/app-store.png" alt="App Store" />
            </a>
            <a href="#">
              <img src="/assets/google-play.png" alt="Google Play" />
            </a>
          </div>
        </div>

        <div className="footer-links">
          <ul>
            <li>
              <Link href="/">Legal</Link>
            </li>
            <li>
              <Link href="/">Privacy</Link>
            </li>
            <li>
              <Link href="/">Artist Resources</Link>
            </li>
          </ul>

          <ul>
            <li>
              <Link href="/posts">Posts</Link>
            </li>
            <li>
              <Link href="/products">Products</Link>
            </li>
            <li>
              <Link href="/">Cookie Manager</Link>
            </li>
          </ul>

          <ul>
            <li>
              <Link href="/blog">Blog</Link>
            </li>
            <li>
              <Link href="/">Charts</Link>
            </li>
            <li>
              <Link href="/">Transparency Reports</Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
