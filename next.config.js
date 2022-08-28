/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['jiotv.catchup.cdn.jio.com'],
  },
}

module.exports = nextConfig
