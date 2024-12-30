"use client";

import PropTypes from "prop-types";
import "/global.css";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import { ThemeProvider } from "./context/ThemeContext";
import { LanguageProvider } from "./context/LanguageContext";

interface RootLayoutProps {
  children?: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <UserProvider>
        <ThemeProvider>
          <LanguageProvider>
            <body>{children}</body>
          </LanguageProvider>
        </ThemeProvider>
      </UserProvider>
    </html>
  );
}

RootLayout.propTypes = {
  children: PropTypes.node.isRequired,
};
