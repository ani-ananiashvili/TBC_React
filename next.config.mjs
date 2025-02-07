/** @type {import('next').NextConfig} */
const nextConfig = {
  // distDir: "./dist",
  images: {
    domains: ['i.postimg.cc'], 
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/home",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
