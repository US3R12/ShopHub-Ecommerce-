/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'images.unsplash.com',
      'via.placeholder.com'
    ],
  },
  // Enable experimental features if needed
  experimental: {
    // Enable if using server components
    // appDir: true,
  },
}

module.exports = nextConfig