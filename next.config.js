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
  swcMinify: true,
  images: {
    domains: ['hustlecodex.com', 'localhost'],
    formats: ['image/avif', 'image/webp'],
  },
  experimental: {
    optimizeCss: true,
  },
  async redirects() {
    return [
      {
        source: '/home',
        destination: '/',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig
