"use client";
import Link from "next/link";
import { useLanguageContext } from "../../context/LanguageContext";
import { translations } from "../../context/translations";
import "./Footer.css"; 

function Footer() {
  const { language } = useLanguageContext();
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
            <li><Link href="/">{t.legal}</Link></li>
            <li><Link href="/">{t.privacy}</Link></li>
            <li><Link href="/">{t.artistResources}</Link></li>
          </ul>
          <ul>
            <li><Link href="/posts">{t.posts}</Link></li>
            <li><Link href="/products">{t.products}</Link></li>
            <li><Link href="/">{t.cookieManager}</Link></li>
          </ul>
          <ul>
            <li><Link href="/blog">{t.blog}</Link></li>
            <li><Link href="/">{t.charts}</Link></li>
            <li><Link href="/">{t.transparencyReports}</Link></li>
          </ul>
        </div>
        
      </div>
    </footer>
  );
}

export default Footer;
