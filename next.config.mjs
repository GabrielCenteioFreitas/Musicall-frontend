/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { hostname: 'lh3.googleusercontent.com' },
      { hostname: 'is1-ssl.mzstatic.com' },
      { hostname: 'i.ibb.co' },
    ]
  }
};

export default nextConfig;
