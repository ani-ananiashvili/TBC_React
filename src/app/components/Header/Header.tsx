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
        <ul className="nav-left">
          <li>
            <Link href="/">{t.home}</Link>
          </li>
          <li>
            <Link href="/profile">{t.profile}</Link>
          </li>
          <li>
            <Link href="/">{t.library}</Link>
          </li>
        </ul>

        <ul className="nav-right">
          <li>
            <Link href="/about">{t.about}</Link>
          </li>
          <li>
            <Link href="/contact">{t.contact}</Link>
          </li>
        </ul>
      </nav>

      <div className="theme-toggle">
        <button
          onClick={() => changeTheme("light")}
          className={theme === "light" ? "active" : ""}
        >
          Light
        </button>
        <button
          onClick={() => changeTheme("dark")}
          className={theme === "dark" ? "active" : ""}
        >
          Dark
        </button>
        <button
          onClick={() => changeTheme("system")}
          className={theme === "system" ? "active" : ""}
        >
          System
        </button>
      </div>

      <div className="language-toggle">
        <button onClick={toggleLanguage}>
          {language === "en" ? "ქართული" : "English"}
        </button>
      </div>

      <div className="bar-auth">
        <a className="burger-bar" href="#">
          <img src="/assets/burger-bar.png" alt="burger-bar" />
        </a>
        <div className="auth-buttons">
          {isAuthenticated ? (
            <button onClick={handleLogout}>{t.logout}</button>
          ) : (
            <>
              <Link href="/login">
                <button>{t.signIn}</button>
              </Link>
              <Link href="/signup">
                <button>{t.signUp}</button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
