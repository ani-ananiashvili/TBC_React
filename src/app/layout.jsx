"use client";
import PropTypes from "prop-types";
import Head from "next/head";
import "../global.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
        <title>SoundCloud</title>
        <link rel="icon" href="/logo-soundcloud.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <body>
        {children}
      </body>
    </html>
  );
}

RootLayout.propTypes = {
  children: PropTypes.node.isRequired,
};
