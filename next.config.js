/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  eslint: {
    dirs: ['./src/*']
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/*',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/kogleo/image/upload/**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '5000',
        pathname: '/uploads/*',
      },
    ],
  },
}

module.exports = nextConfig
