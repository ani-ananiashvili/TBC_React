"use client";

import { useThemeContext } from "../../context/ThemeContext";
import { useLanguageContext } from "../../context/LanguageContext";
import "./AuthHeader.css";

const AuthHeader = (): JSX.Element => {
  const { theme, changeTheme } = useThemeContext();
  const { language, toggleLanguage } = useLanguageContext();

  return (
    <header className="header auth-header">
      <div className="logo">
        <img src="/assets/logo_aveji.png" alt="logo" />
      </div>
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
    </header>
  );
};

export default AuthHeader;
