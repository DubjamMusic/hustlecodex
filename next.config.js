/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  
  // Image optimization (if images are added later)
  images: {
    domains: [],
    formats: ['image/avif', 'image/webp'],
  },
  
  // Performance optimizations
  compress: true,
  
  // Output configuration for deployment
  output: 'standalone',
  
  // Disable powered by header for security
  poweredByHeader: false,
  
  // Environment variables that should be available on the client
  env: {
    SITE_NAME: 'Golden Globe - Prestige Console',
    SITE_URL: process.env.NEXT_PUBLIC_SITE_URL || 'https://hustlecodex.vercel.app',
  },
};

module.exports = nextConfig;
