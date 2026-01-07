import Head from 'next/head';
import HierarchySidebar from '../../components/products/GoldenGlobe/HierarchySidebar';
import GlobeViewport from '../../components/products/GoldenGlobe/GlobeViewport';

export default function GoldenGlobePage() {
  return (
    <>
      <Head>
        <title>GOLDEN GLOBE | PRESTIGE CONSOLE</title>
        <meta name="description" content="Golden Globe Prestige Console - Reality Recovery Playing Game" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </Head>

      <div className="bg-[#020202] text-white min-h-screen grid grid-cols-1 md:grid-cols-[350px_1fr] overflow-hidden h-screen font-['Cinzel',serif]">
        <HierarchySidebar />
        <GlobeViewport />
      </div>
    </>
  );
}
