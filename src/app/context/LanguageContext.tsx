import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

interface Translations {
  [key: string]: { [key: string]: string };
}

interface LanguageContextType {
  language: string;
  toggleLanguage: () => void;
  translations: Translations;
}

const translations: Translations = {
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

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider = ({
  children,
}: LanguageProviderProps): JSX.Element => {
  const [language, setLanguage] = useState<string>(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("language") || "en";
    }
    return "en";
  });

  const toggleLanguage = (): void => {
    const newLanguage = language === "en" ? "ka" : "en";
    setLanguage(newLanguage);
    localStorage.setItem("language", newLanguage);
  };

  useEffect(() => {
    const savedLanguage = localStorage.getItem("language");
    if (savedLanguage && savedLanguage !== language) {
      setLanguage(savedLanguage);
    }
  }, [language]);

  return (
    <LanguageContext.Provider
      value={{ language, toggleLanguage, translations }}
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
