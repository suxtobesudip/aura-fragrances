/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'plus.unsplash.com',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/scent-families',
        destination: '/#families',
        permanent: true,
      },
      {
        source: '/personas',
        destination: '/#personas',
        permanent: true,
      },
      {
        source: '/about',
        destination: '/#about',
        permanent: true,
      },
      {
        source: '/journal',
        destination: '/#journal',
        permanent: true,
      },
      {
        source: '/journal/:path*',
        destination: '/#journal',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
