import { LanguageProvider } from "./context/LanguageContext";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import { ThemeProvider } from "./context/ThemeContext";
import "/global.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        style={{
          background: "linear-gradient(145deg, #f5f7fa, #e4ebf5)",
        }}
      >
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
