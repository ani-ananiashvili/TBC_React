import "./Header.css";
import Link from 'next/link';

function Header() {
  return (
    <header className="header">
      <div className="logo">
        <img src="./assets/logo-soundcloud.png" alt="logo" />
      </div>

      <nav className="nav">
        <ul className="nav-left">
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/profile">Profile</Link>
          </li>
          <li>
            <Link href="/">Library</Link>
          </li>
        </ul>

        <div className="search">
          <input type="text" placeholder="Search" className="search-input" />
          <img src="./assets/search.svg" alt="search-icon" />
        </div>

        <ul className="nav-right">
          <li>
            <Link href="/" className="try-next-pro">
              Try Next Pro
            </Link>
          </li>
          <li>
            <Link href="/contact">Contact</Link>
          </li>
          <li>
            <Link href="/about">About</Link>
          </li>
        </ul>
      </nav>

      <div className="bar-auth">
        <a className="burger-bar" href="#">
          <img src="./assets/burger-bar.png" alt="burger-bar" />
        </a>
        <div className="auth-buttons">
          <button>Sign In</button>
          <button>Sign Up</button>
        </div>
      </div>
    </header>
  );
}

export default Header;
