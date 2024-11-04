"use client";
import { createContext, useContext, useEffect } from "react";
import useTheme from "../hooks/useTheme";

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const systemThemeListener = (e) => {
      if (theme === "system") {
        toggleTheme(e.matches ? "dark" : "light");
      }
    };

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    mediaQuery.addEventListener("change", systemThemeListener);

    return () => {
      mediaQuery.removeEventListener("change", systemThemeListener);
    };
  }, [theme, toggleTheme]);

  const changeTheme = (newTheme) => {
    if (newTheme === "system") {
      toggleTheme("system");
    } else {
      toggleTheme(newTheme);
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, changeTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useThemeContext = () => useContext(ThemeContext);
