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
};

module.exports = nextConfig;
