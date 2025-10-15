// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable React strict mode for better development practices
  reactStrictMode: true,
  
  // Configure images if you're using external image sources
  images: {
    domains: ['images.unsplash.com', 'via.placeholder.com'],
    formats: ['image/webp', 'image/avif'],
  },
  
  // Enable SWC minification for better performance
  swcMinify: true,
  
  // Compiler options for additional features
  compiler: {
    // Remove console logs in production
    removeConsole: process.env.NODE_ENV === 'production',
  },
  
  // Remove the experimental object entirely since it's empty
  // experimental: {} - Remove this completely
}

module.exports = nextConfig