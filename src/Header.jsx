import "./Header.css";

function Header() {
  return (
    <header className="header">
      <div className="logo">
        <img src="/public/logo-soundcloud.png" alt="logo" />
      </div>

      <nav className="nav">
        <ul className="nav-left">
          <li>
            <a href="#">Home</a>
          </li>
          <li>
            <a href="#">Feed</a>
          </li>
          <li>
            <a href="#">Library</a>
          </li>
        </ul>

        <div className="search">
          <input type="text" placeholder="Search" className="search-input" />
          <img src="/public/search.svg" alt="search-icon" />
        </div>

        <ul className="nav-right">
          <li>
            <a  className="try-next-pro" href="#">Try Next Pro</a>
          </li>
          <li>
            <a href="#">For Artists</a>
          </li>
          <li>
            <a href="#">Upload</a>
          </li>
        </ul>
      </nav>

      <div className="auth-buttons">
        <button>Sign In</button>
        <button>Sign Up</button>
      </div>
    </header>
  );
}

export default Header;
