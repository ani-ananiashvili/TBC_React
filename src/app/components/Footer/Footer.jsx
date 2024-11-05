import Link from "next/link";

function Footer() {
  return (
    <footer className="bg-gray-100 dark:bg-black text-gray-800 dark:text-white py-4 lg:py-12">
      <div className="flex flex-col lg:flex-row items-center justify-around gap-8 lg:gap-16">
        
        <div className="flex flex-col items-center text-center">
          <h2 className="text-2xl lg:text-3xl font-semibold mb-4">Go mobile</h2>
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
              <Link href="/" className="hover:text-orange-500">Legal</Link>
            </li>
            <li>
              <Link href="/" className="hover:text-orange-500">Privacy</Link>
            </li>
            <li>
              <Link href="/" className="hover:text-orange-500">Artist Resources</Link>
            </li>
          </ul>
          <ul className="space-y-2 text-sm lg:text-base">
            <li>
              <Link href="/posts" className="hover:text-orange-500">Posts</Link>
            </li>
            <li>
              <Link href="/products" className="hover:text-orange-500">Products</Link>
            </li>
            <li>
              <Link href="/" className="hover:text-orange-500">Cookie Manager</Link>
            </li>
          </ul>
          <ul className="space-y-2 text-sm lg:text-base">
            <li>
              <Link href="/blog" className="hover:text-orange-500">Blog</Link>
            </li>
            <li>
              <Link href="/" className="hover:text-orange-500">Charts</Link>
            </li>
            <li>
              <Link href="/" className="hover:text-orange-500">Transparency Reports</Link>
            </li>
          </ul>
        </div>
        
      </div>
    </footer>
  );
}

export default Footer;
