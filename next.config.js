/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true
  },
  env: {
    POCKETBASE_API: process.env.POCKETBASE_API
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'pbs.twimg.com'
        // hostname: 'images.freeimages.com',
      },
    ],
  },
}

module.exports = nextConfig
