"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useRouter } from "next/navigation";

interface Translations {
  [key: string]: { [key: string]: string };
}

interface LanguageContextType {
  language: string;
  toggleLanguage: () => void;
  translations: Translations;
  handleLanguageChange: (selectedLang: string) => void;
}

const translations: Translations = {
  en: {
    HOME: "HOME",
    CATEGORIES: "CATEGORIES",
    PREMIUM: "PREMIUM",
    BLOG: "BLOG",
    SALE: "SALE",
    profile: "Profile",
    about: "About",
    contact: "Contact",
    logout: "Logout",
    signIn: "Sign In",
    signUp: "Sign Up",
    goMobile: "Go mobile",
    legal: "Legal",
    privacy: "Privacy",
    artistResources: "Artist Resources",
    products: "Products",
    cookieManager: "Cookie Manager",
    charts: "Charts",
    transparencyReports: "Transparency Reports",
  },
  ka: {
    HOME: "მთავარი",
    CATEGORIES: "კატეგორიები",
    PREMIUM: "პრემიუმი",
    BLOG: "ბლოგი",
    SALE: "ფასდაკლება",
    profile: "პროფილი",
    about: "ჩვენს შესახებ",
    contact: "კონტაქტი",
    logout: "გამოსვლა",
    signIn: "შესვლა",
    signUp: "რეგისტრაცია",
    goMobile: "გადმოიწერე",
    legal: "იურიდიული",
    privacy: "კონფიდენციალურობა",
    artistResources: "არტისტების რესურსები",
    products: "პროდუქტები",
    cookieManager: "ქუქიების მენეჯერი",
    charts: "დიაგრამები",
    transparencyReports: "გამჭვირვალობის ანგარიშები",
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

interface LanguageProviderProps {
  children: ReactNode;
}

const isBrowser = typeof window !== "undefined";
const getCookie = (name: string): string | undefined => {
  if (!isBrowser) return undefined;
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(";").shift();
  return undefined;
};

const setCookie = (name: string, value: string, days: number): void => {
  if (!isBrowser) return;
  const date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${encodeURIComponent(
    value
  )};expires=${date.toUTCString()};path=/`;
};

export const LanguageProvider = ({
  children,
}: LanguageProviderProps): JSX.Element => {
  const [language, setLanguage] = useState<string>(() => {
    return isBrowser ? getCookie("language") || "en" : "en";
  });

  const router = useRouter();

  const handleLanguageChange = (selectedLang: string): void => {
    if (!isBrowser) return;
    const pathWithoutLang = window.location.pathname.replace(/^\/(en|ka)/, "");
    router.push(`/${selectedLang}${pathWithoutLang}`);
    setLanguage(selectedLang);
    setCookie("language", selectedLang, 7);
  };

  const toggleLanguage = (): void => {
    const newLanguage = language === "en" ? "ka" : "en";
    handleLanguageChange(newLanguage);
  };

  useEffect(() => {
    if (!isBrowser) return;
    const savedLanguage = getCookie("language");
    if (savedLanguage && savedLanguage !== language) {
      setLanguage(savedLanguage);
    }
  }, []);

  return (
    <LanguageContext.Provider
      value={{
        language,
        toggleLanguage,
        translations,
        handleLanguageChange,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguageContext = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error(
      "useLanguageContext must be used within a LanguageProvider"
    );
  }
  return context;
};
