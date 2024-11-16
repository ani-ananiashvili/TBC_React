"use client";
import {
  createContext,
  useContext,
  useEffect,
  ReactNode,
} from "react";
import useTheme from "../hooks/useTheme";

interface ThemeContextType {
  theme: string;
  changeTheme: (newTheme: string) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const systemThemeListener = (e: MediaQueryListEvent) => {
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

  const changeTheme = (newTheme: string) => {
    toggleTheme(newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, changeTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useThemeContext = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useThemeContext must be used within a ThemeProvider");
  }
  return context;
};
