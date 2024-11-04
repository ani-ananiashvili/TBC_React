"use client";

import "./Header.css";
import Link from "next/link";
import useAuth from "../../hooks/useAuth";
import { useTheme } from "../../context/ThemeContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

function Header() {
  const { isAuthenticated, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const router = useRouter();
  const [isAuthChecked, setIsAuthChecked] = useState(false);

  useEffect(() => {
    setIsAuthChecked(true);
  }, []);

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  if (!isAuthChecked) return null;

  return (
    <header className="header">
      <div className="logo">
        <img src="/assets/logo-soundcloud.png" alt="logo" />
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
          <img src="/assets/search.svg" alt="search-icon" />
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
          <img src="/assets/burger-bar.png" alt="burger-bar" />
        </a>
        <div className="auth-buttons">
          {isAuthenticated ? (
            <button onClick={handleLogout}>Sign Out</button>
          ) : (
            <>
              <Link href="/login">
                <button>Sign In</button>
              </Link>
              <Link href="/signup">
                <button>Sign Up</button>
              </Link>
            </>
          )}
        </div>
      </div>

      <button onClick={toggleTheme} className="theme-toggle">
        {theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}
      </button>
    </header>
  );
}

export default Header;
