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
import { FiSun, FiMoon } from "react-icons/fi";

const Header = (): JSX.Element | null => {
  const { logout } = useAuth();
  const { theme, changeTheme } = useThemeContext();
  const { language, toggleLanguage, translations } = useLanguageContext();
  const router = useRouter();
  const [isAuthChecked, setIsAuthChecked] = useState<boolean>(false);
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const { cartCount } = useCartContext();
  const [showCategoryDropdown, setShowCategoryDropdown] =
    useState<boolean>(false);
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  const handleCategoryToggle = (): void => {
    setShowCategoryDropdown(!showCategoryDropdown);
  };

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

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="header">
      <div className="logo">
        <img src="/assets/logo_aveji.png" alt="logo" />
      </div>

      <button
        className={`burger-menu ${menuOpen ? "open" : ""}`}
        onClick={toggleMenu}
      >
        {menuOpen ? "×" : "☰"}
      </button>

      <nav className={`nav ${menuOpen ? "open" : ""}`}>
        <ul>
          <li>
            <Link href="/">{t.HOME}</Link>
          </li>
          <li className="category-dropdown-wrapper">
            <button onClick={handleCategoryToggle}>{t.CATEGORIES}</button>
            {showCategoryDropdown && (
              <ul className="category-dropdown">
                <li>Chair</li>
                <li>Table</li>
                <li>Lamp</li>
                <li>Sofa</li>
                <li>Bed</li>
                <li>Wardrobe</li>
              </ul>
            )}
          </li>

          <li>
            <Link href="/premium">{t.PREMIUM}</Link>
          </li>
          <li>
            <Link href="/blog">{t.BLOG}</Link>
          </li>
          <li>
            <Link href="/get-furniture-product">{t.PRODUCTS}</Link>
          </li>
        </ul>
      </nav>

      <div className="controls">
        <div className="theme-toggle">
          <div
            className="toggle-track"
            onClick={() => changeTheme(theme === "light" ? "dark" : "light")}
          >
            {theme === "light" ? (
              <FiSun title="Light Mode" />
            ) : (
              <FiMoon title="Dark Mode" />
            )}
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
          <div className="plus-button-wrapper">
            <button onClick={() => handleRedirect("/create-furniture-product")}>
              +
            </button>
          </div>

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
          <div className="profile-dropdown-wrapper">
            <FiUser
              title="Profile"
              className="icon"
              onClick={() => setShowDropdown(!showDropdown)}
            />
            {showDropdown && (
              <div className="profile-dropdown">
                <button onClick={() => handleRedirect("/profile")}>
                  Profile
                </button>
                <button onClick={handleLogout}>Logout</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
