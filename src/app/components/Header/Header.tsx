"use client";

import "./Header.css";
import Link from "next/link";
import useAuth from "../../hooks/useAuth";
import { useThemeContext } from "../../context/ThemeContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useLanguageContext } from "../../context/LanguageContext";

const Header = (): JSX.Element | null => {
  const { isAuthenticated, logout } = useAuth();
  const { theme, changeTheme } = useThemeContext();
  const { language, toggleLanguage, translations } = useLanguageContext();
  const router = useRouter();
  const [isAuthChecked, setIsAuthChecked] = useState<boolean>(false);

  useEffect(() => {
    setIsAuthChecked(true);
  }, []);

  const handleLogout = (): void => {
    logout();
    router.push("/login");
  };

  if (!isAuthChecked) return null;

  const t = translations[language];

  return (
    <header className="header">
      <div className="logo">
        <img src="/assets/logo_aveji.png" alt="logo" />
      </div>

      <nav className="nav">
        <ul>
          <li>
            <Link href="/">{t.home}</Link>
          </li>
          <li>
            <Link href="/about">{t.about}</Link>
          </li>
          <li>
            <Link href="/contact">{t.contact}</Link>
          </li>
        </ul>
      </nav>

      <div className="controls"></div>

      <div className="auth">
        <div className="theme-toggle">
          <div
            className="toggle-track"
            onClick={() => changeTheme(theme === "light" ? "dark" : "light")}
          >
            <div
              className={`toggle-button ${theme}`}
              draggable="true"
              onDragEnd={() =>
                changeTheme(theme === "light" ? "dark" : "light")
              }
            >
              {theme === "light" ? "⛅" : "🌙"}
            </div>
          </div>
        </div>

        <div className="language-toggle">
          <button
            onClick={toggleLanguage}
            title={language === "en" ? "English" : "ქართული"}
          >
            {language === "en" ? "🇬🇧 EN" : "🇬🇪 KA"}
          </button>
        </div>

        <div className="icons">
          <Link href="/profile" className="icon-link">
            <img src="/assets/user.png" alt="User Profile" className="icon" />
          </Link>
          <Link href="/cart" className="icon-link">
            <img src="/assets/shop.png" alt="Shopping Cart" className="icon" />
          </Link>
        </div>

        {isAuthenticated ? (
          <button className="logout" onClick={handleLogout}>
            {t.logout}
          </button>
        ) : (
          <div className="auth-buttons">
            <Link href="/signup">
              <button>{t.signUp}</button>
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
