import { LanguageProvider } from "./context/LanguageContext";
import Footer from "./components/Footer/Footer";
import { EnvVarWarning } from "./components/env-var-warning";
import HeaderAuth from "./components/header-auth";
import { Client } from "../../utils/supabase/client";
import "/global.css";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-background text-foreground">
        <LanguageProvider>
          <main className="min-h-screen flex flex-col items-center">
            <div className="w-full">
              <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
                <div className="w-full max-w-5xl flex justify-between items-center p-3 px-5 text-sm">
                  <div className="flex gap-5 items-center font-semibold">
                    <div className="flex items-center gap-2"></div>
                  </div>
                  {!Client ? <EnvVarWarning /> : <HeaderAuth />}
                </div>
              </nav>
            </div>

            <div className="flex flex-col gap-20 max-w-5xl p-5 w-full">
              {children}
            </div>

            <Footer />
          </main>
        </LanguageProvider>
      </body>
    </html>
  );
}
