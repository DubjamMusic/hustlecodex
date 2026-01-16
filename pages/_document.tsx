import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta charSet="utf-8" />
        <meta name="theme-color" content="#0a0a0f" />
        
        {/* PWA Meta Tags */}
        <meta name="application-name" content="HustleCodex" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="HustleCodex" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-TileColor" content="#0a0a0f" />
        <meta name="msapplication-tap-highlight" content="no" />
        
        {/* SEO Meta Tags */}
        <meta name="description" content="HustleCodex - From Struggle to Digital Empire. A gamified recovery and skill-building platform." />
        <meta name="keywords" content="recovery, coding, skill building, gamification, mental health, addiction recovery, learning platform" />
        <meta name="author" content="HustleCodex" />
        
        {/* Open Graph Meta Tags */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="HustleCodex - From Struggle to Digital Empire" />
        <meta property="og:description" content="A gamified recovery and skill-building platform for hustlers in recovery" />
        <meta property="og:site_name" content="HustleCodex" />
        <meta property="og:url" content="https://app.hustlecodex.com" />
        
        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="HustleCodex - From Struggle to Digital Empire" />
        <meta name="twitter:description" content="A gamified recovery and skill-building platform for hustlers in recovery" />
        
        {/* Favicon & Icons */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
        <link rel="manifest" href="/manifest.json" />
        
        {/* Preconnect to external domains for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Splash screens for iOS */}
        <link
          rel="apple-touch-startup-image"
          href="/splash/apple-splash-2048-2732.png"
          media="(device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2)"
        />
      </Head>
      <body className="bg-hustlex-darker">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
