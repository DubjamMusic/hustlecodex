import Head from 'next/head';
import Link from 'next/link';

export default function Custom404() {
  return (
    <>
      <Head>
        <title>404 - Sector Not Found | Golden Globe</title>
      </Head>
      
      <div className="min-h-screen bg-black text-white flex items-center justify-center font-cinzel">
        <div className="text-center px-4">
          <div className="mb-8">
            <div className="text-gold text-8xl font-bold mb-4">404</div>
            <h1 className="text-3xl md:text-5xl font-bold mb-4">SECTOR NOT FOUND</h1>
            <p className="text-gray-400 text-lg mb-8 font-mono">
              The requested sector does not exist in the Complex Hierarchy
            </p>
          </div>
          
          <div className="space-y-4">
            <Link href="/" className="inline-block bg-gold text-black px-8 py-3 font-bold uppercase tracking-[2px] hover:bg-white transition-all duration-300 hover:scale-105">
              Return to Hub
            </Link>
            
            <p className="text-sm text-gray-500 mt-6 font-mono">
              ERROR CODE: SEC_404_NOT_FOUND
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
