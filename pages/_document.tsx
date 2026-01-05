import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta charSet="utf-8" />
        <meta name="theme-color" content="#d4af37" />
        
        {/* SEO Meta Tags */}
        <meta name="description" content="Golden Globe Prestige Console - Interactive dashboard for routing hub management and global orchestration" />
        <meta name="keywords" content="prestige console, routing hub, golden globe, network management, edge computing" />
        <meta name="author" content="HustleCodex" />
        
        {/* Open Graph Meta Tags */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Golden Globe - Prestige Console" />
        <meta property="og:description" content="Interactive dashboard for routing hub management and global orchestration" />
        <meta property="og:site_name" content="HustleCodex" />
        
        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Golden Globe - Prestige Console" />
        <meta name="twitter:description" content="Interactive dashboard for routing hub management and global orchestration" />
        
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        
        {/* Preconnect to external domains for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
