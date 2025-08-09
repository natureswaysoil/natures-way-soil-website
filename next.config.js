
/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable static export for easier deployment
  trailingSlash: true,
  images: {
    unoptimized: true,
    domains: ['localhost'],
  },
  // Ensure proper routing
  async rewrites() {
    return [
      {
        source: '/expert-advice',
        destination: '/expert-advice',
      },
    ]
  },
  // Environment variables
  env: {
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    OPENAI_API_KEY: process.env.OPENAI_API_KEY,
  },
}

module.exports = nextConfig
