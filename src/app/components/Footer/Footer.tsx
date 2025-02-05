"use client";
import Link from "next/link";
import { useLanguageContext } from "../../context/LanguageContext";
import "./Footer.css";

const Footer = (): JSX.Element => {
  const { language, translations } = useLanguageContext();
  const t = translations[language];

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="go-mobile">
          <h2>{t.goMobile}</h2>
          <div className="mobile-img">
            <a href="#">
              <img src="/assets/app-store.png" alt="App Store" />
            </a>
            <a href="#">
              <img src="/assets/google-play.png" alt="Google Play" />
            </a>
          </div>
        </div>

        <div className="footer-links">
          <ul>
            <li>
              <Link href="/">{t.faQs}</Link>
            </li>
            <li>
              <Link href="/">{t.shipping}</Link>
            </li>
            <li>
              <Link href="/">{t.careAndSafety}</Link>
            </li>
          </ul>

          <ul>
            <li>
              <Link href="/">{t.retailStockists}</Link>
            </li>
            <li>
              <Link href="/">{t.stockistApplication}</Link>
            </li>
            <li>
              <Link href="/">{t.tradeAccountApplication}</Link>
            </li>
          </ul>

          <ul>
            <li>
              <Link href="/">{t.privacy}</Link>
            </li>

            <li>
              <Link href="/">{t.returns}</Link>
            </li>
            <li>
              <Link href="/">{t.termsOfService}</Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
