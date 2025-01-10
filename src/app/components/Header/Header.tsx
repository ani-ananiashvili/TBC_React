"use client";

import "./Header.css";
import Link from "next/link";
import useAuth from "../../hooks/useAuth";
import { useThemeContext } from "../../context/ThemeContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useLanguageContext } from "../../context/LanguageContext";

const Header = (): JSX.Element | null => {
  const { isAuthenticated, user, logout } = useAuth();
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
  const username = user ? user.user_metadata.username : "User";

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
          <li>
            <Link href="/profile">{t.profile}</Link>
          </li>
          <li>
            <Link href="/create-products">Create Products</Link>
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
            {language === "en" ? "ES" : "EN"}
          </button>
        </div>
      </div>

      <div className="auth">
        {isAuthenticated ? (
          <>
            <span>Welcome, {user.email}!</span>
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <></>
        )}
      </div>
    </header>
  );
};

export default Header;
