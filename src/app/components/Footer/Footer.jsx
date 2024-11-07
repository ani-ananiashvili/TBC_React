"use client";
import Link from "next/link";
import { useLanguageContext } from "../../context/LanguageContext";
import { translations } from "../../context/translations";

function Footer() {
  const { language } = useLanguageContext();
  const t = translations[language];

  return (
    <footer className="bg-gray-100 dark:bg-black text-gray-800 dark:text-white py-4 lg:py-12">
      <div className="flex flex-col lg:flex-row items-center justify-around gap-8 lg:gap-16">
        
        <div className="flex flex-col items-center text-center">
          <h2 className="text-2xl lg:text-3xl font-semibold mb-4">{t.goMobile}</h2>
          <div className="flex gap-4">
            <a href="#">
              <img src="/assets/app-store.png" alt="App Store" className="w-36 lg:w-40" />
            </a>
            <a href="#">
              <img src="/assets/google-play.png" alt="Google Play" className="w-36 lg:w-40" />
            </a>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-4 lg:gap-12">
          <ul className="space-y-2 text-sm lg:text-base">
            <li>
              <Link href="/" className="hover:text-orange-500">{t.legal}</Link>
            </li>
            <li>
              <Link href="/" className="hover:text-orange-500">{t.privacy}</Link>
            </li>
            <li>
              <Link href="/" className="hover:text-orange-500">{t.artistResources}</Link>
            </li>
          </ul>
          <ul className="space-y-2 text-sm lg:text-base">
            <li>
              <Link href="/posts" className="hover:text-orange-500">{t.posts}</Link>
            </li>
            <li>
              <Link href="/products" className="hover:text-orange-500">{t.products}</Link>
            </li>
            <li>
              <Link href="/" className="hover:text-orange-500">{t.cookieManager}</Link>
            </li>
          </ul>
          <ul className="space-y-2 text-sm lg:text-base">
            <li>
              <Link href="/blog" className="hover:text-orange-500">{t.blog}</Link>
            </li>
            <li>
              <Link href="/" className="hover:text-orange-500">{t.charts}</Link>
            </li>
            <li>
              <Link href="/" className="hover:text-orange-500">{t.transparencyReports}</Link>
            </li>
          </ul>
        </div>
        
      </div>
    </footer>
  );
}

export default Footer;
