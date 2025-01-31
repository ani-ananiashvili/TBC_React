"use client";

import { CartProvider } from "./context/CartContext";
import { LanguageProvider } from "./context/LanguageContext";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import { ThemeProvider } from "./context/ThemeContext";
import "/global.css";
import { usePathname } from "next/navigation";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const isAuthRoute = pathname.includes("/sign-in") || pathname.includes("/sign-up");

  return (
    <html lang="en" suppressHydrationWarning>
      <body style={{ background: "linear-gradient(145deg, #f5f7fa, #e4ebf5)" }}>
        <LanguageProvider>
          <ThemeProvider>
            <CartProvider>
              <nav>{!isAuthRoute && <Header />}</nav>
              <main>{children}</main>
              <Footer />
            </CartProvider>
          </ThemeProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
