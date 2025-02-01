"use client";

import "./Header.css";
import Link from "next/link";
import useAuth from "../../hooks/useAuth";
import { useThemeContext } from "../../context/ThemeContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useLanguageContext } from "../../context/LanguageContext";
import { FiMail, FiShoppingCart, FiUser } from "react-icons/fi";
import { useCartContext } from "../../context/CartContext";

const Header = (): JSX.Element | null => {
  const { isAuthenticated, logout } = useAuth();
  const { theme, changeTheme } = useThemeContext();
  const { language, toggleLanguage, translations } = useLanguageContext();
  const router = useRouter();
  const [isAuthChecked, setIsAuthChecked] = useState<boolean>(false);
  const { cartCount } = useCartContext();

  useEffect(() => {
    setIsAuthChecked(true);
  }, []);

  const handleLogout = (): void => {
    logout();
    router.push("/sign-in");
  };

  if (!isAuthChecked) return null;

  const t = translations[language];

  const handleRedirect = (path: string) => {
    router.push(path);
  };

  return (
    <header className="header">
      <div className="logo">
        <img src="/assets/logo_aveji.png" alt="logo" />
      </div>

      <nav className="nav">
        <ul>
          <li>
            <Link href="/">{t.HOME}</Link>
          </li>
          <li>
            <Link href="/">{t.CATEGORIES}</Link>
          </li>
          <li>
            <Link href="/premium">{t.PREMIUM}</Link>
          </li>
          <li>
            <Link href="/blog">{t.BLOG}</Link>
          </li>
          <li>
            <Link href="/">{t.SALE}</Link>
          </li>
        </ul>
      </nav>

      <div className="controls">
        <div className="theme-toggle">
          <div
            className="toggle-track"
            onClick={() => changeTheme(theme === "light" ? "dark" : "light")}
          >
            {theme === "light" ? "⛅" : "🌙"}
          </div>
        </div>

        <div className="language-toggle">
          <button onClick={toggleLanguage}>
            {language === "en" ? "KA" : "EN"}
          </button>
        </div>
      </div>

      <div className="auth">
        <div className="icons">
          <FiMail
            title="Contact Us"
            className="icon"
            onClick={() => handleRedirect("/contact")}
          />
          <div className="cart-icon-wrapper">
            <FiShoppingCart
              title="Shopping Cart"
              className="icon"
              onClick={() => handleRedirect("/cart")}
            />
            {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
          </div>
          <FiUser
            title="Profile"
            className="icon"
            onClick={() => handleRedirect("/profile")}
          />
        </div>

        {isAuthenticated ? (
          <button className="auth-button" onClick={handleLogout}>
            LOGOUT
          </button>
        ) : (
          <Link href="/sign-in" className="auth-button">
            LOGIN
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;
