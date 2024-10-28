"use client";

import "./Header.css";
import Link from "next/link";
import useAuth from "../../hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

function Header() {
  const { isAuthenticated, logout } = useAuth();
  const router = useRouter();
  const [isAuthChecked, setIsAuthChecked] = useState(false);

  useEffect(() => {
    // Simulate an async check for auth state
    const checkAuthStatus = async () => {
      // Assuming your useAuth hook takes time to load authentication status
      setIsAuthChecked(true); // Mark auth status as checked once loaded
    };

    checkAuthStatus();
  }, []);

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  // Render nothing until auth state is checked to avoid hydration mismatch
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
    </header>
  );
}

export default Header;
