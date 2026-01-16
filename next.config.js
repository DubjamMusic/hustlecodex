const withPWA = require('@ducanh2912/next-pwa').default({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
  register: true,
  skipWaiting: true,
  cacheOnFrontEndNav: true,
  aggressiveFrontEndNavCaching: true,
  reloadOnOnline: true,
  workboxOptions: {
    disableDevLogs: true,
  },
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Disable static export if Nexus Recovery is enabled (requires API routes)
  // For static hosting, set NEXT_PUBLIC_ENABLE_NEXUS_RECOVERY=false
  ...(process.env.NEXT_PUBLIC_ENABLE_NEXUS_RECOVERY !== 'true' && {
    output: 'export',
    trailingSlash: true,
  }),
  images: {
    unoptimized: true,
    domains: ['hustlecodex.com', 'localhost'],
  },
  compress: true,
  poweredByHeader: false,
};

module.exports = withPWA(nextConfig);
