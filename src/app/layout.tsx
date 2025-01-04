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
      <body className="bg-background text-foreground">
        <LanguageProvider>
          <ThemeProvider>
            <main className="min-h-screen flex flex-col items-center">
              <div className="w-full">
                <nav>
                  <div>
                    <Header />
                  </div>
                </nav>
              </div>

              <div className="flex flex-col gap-20 max-w-5xl p-5 w-full">
                {children}
              </div>

              <Footer />
            </main>
          </ThemeProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
