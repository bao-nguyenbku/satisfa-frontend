/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
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
    ],
  },
}

module.exports = nextConfig
