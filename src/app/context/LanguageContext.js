import { createContext, useContext, useState, useEffect } from "react";

export const translations = {
  en: {
    home: "Home",
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
    posts: "Posts",
    products: "Products",
    cookieManager: "Cookie Manager",
    blog: "Blog",
    charts: "Charts",
    transparencyReports: "Transparency Reports",
  },
  ka: {
    home: "მთავარი",
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
    posts: "პოსტები",
    products: "პროდუქტები",
    cookieManager: "ქუქიების მენეჯერი",
    blog: "ბლოგი",
    charts: "დიაგრამები",
    transparencyReports: "გამჭვირვალობის ანგარიშები",
  },
};

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("language") || "en";
    }
    return "en";
  });

  const toggleLanguage = () => {
    const newLanguage = language === "en" ? "ka" : "en";
    setLanguage(newLanguage);
    localStorage.setItem("language", newLanguage);
  };

  useEffect(() => {
    const savedLanguage = localStorage.getItem("language");
    if (savedLanguage && savedLanguage !== language) {
      setLanguage(savedLanguage);
    }
  }, []);

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguageContext = () => useContext(LanguageContext);
