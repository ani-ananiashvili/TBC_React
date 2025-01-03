import { useState, useEffect } from "react";

function getInitialTheme(): string {
  if (typeof window !== "undefined" && localStorage.getItem("theme")) {
    return localStorage.getItem("theme")!;
  }
  return "light";
}

export default function useTheme() {
  const [theme, setTheme] = useState<string>(getInitialTheme);

  useEffect(() => {
    const updateTheme = () => {
      if (theme === "system") {
        const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
          .matches
          ? "dark"
          : "light";
        setTheme(systemTheme);
        document.documentElement.classList.toggle(
          "dark",
          systemTheme === "dark"
        );
      } else {
        document.documentElement.classList.toggle("dark", theme === "dark");
      }
      localStorage.setItem("theme", theme);
    };

    updateTheme();
  }, [theme]);

  const toggleTheme = (newTheme: string) => {
    setTheme(newTheme);
  };

  return { theme, toggleTheme };
}
