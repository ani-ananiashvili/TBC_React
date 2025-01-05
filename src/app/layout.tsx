import { LanguageProvider } from "./context/LanguageContext";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import { ThemeProvider } from "./context/ThemeContext";
import "/global.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <LanguageProvider>
          <ThemeProvider>
            <nav>
              <Header />
            </nav>
            <main>
              <div>{children}</div>
            </main>
            <Footer />
          </ThemeProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
