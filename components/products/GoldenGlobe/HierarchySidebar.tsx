'use client';

import { useState } from 'react';

interface Sector {
  id: number;
  name: string;
  desc: string;
  price: string;
  locked: boolean;
  amount?: number;
}

const sectors: Sector[] = [
  {
    id: 1,
    name: 'ROUTING HUB',
    desc: 'O(1) Mux Logic • Edge Efficiency',
    price: 'UNLOCKED',
    locked: false
  },
  {
    id: 2,
    name: 'THE CIPHER VAULT',
    desc: 'RSA-256 Auth • Zero-Trust Architect',
    price: '5,000 🔲',
    locked: true,
    amount: 5000
  },
  {
    id: 3,
    name: 'THE SPECTER LAB',
    desc: 'Anomaly Detection • Ghost-Work Protocol',
    price: '10,000 🔲',
    locked: true,
    amount: 10000
  },
  {
    id: 4,
    name: 'NEXUS CORE',
    desc: 'Full Global Orchestration',
    price: 'PRIVATE SALE ONLY',
    locked: true
  },
];

interface HierarchySidebarProps {
  onSectorSelect?: (sectorId: number) => void;
  onPaywallShow?: (sectorId: number, message: string) => void;
}

export default function HierarchySidebar({
  onSectorSelect,
  onPaywallShow
}: HierarchySidebarProps) {
  const [loading, setLoading] = useState<number | null>(null);

  const handleSectorClick = async (sector: Sector) => {
    if (!sector.locked) {
      if (onSectorSelect) {
        onSectorSelect(sector.id);
      }
      return;
    }

    // Handle paywall for locked sectors
    const paywallMessages: { [key: number]: string } = {
      2: "SECTOR 02 LOCKED • Cipher Vault requires 5,000 credits or premium access",
      3: "SECTOR 03 LOCKED • Specter Lab requires 10,000 credits or enterprise tier",
      4: "SECTOR 04 LOCKED • Nexus Core available via private sale only • Contact: access@goldenglobetech.io"
    };

    if (onPaywallShow) {
      onPaywallShow(sector.id, paywallMessages[sector.id]);
    }

    // For future payment integration
    if (sector.amount && sector.id !== 4) {
      setLoading(sector.id);

      try {
        // Placeholder for future Stripe/payment integration
        // const response = await fetch('/api/payments/create-checkout', {
        //   method: 'POST',
        //   headers: { 'Content-Type': 'application/json' },
        //   body: JSON.stringify({
        //     amount: sector.amount,
        //     tier: `Sector ${sector.id}`,
        //     type: 'sector',
        //   }),
        // });
        // const { url } = await response.json();
        // if (url) window.location.href = url;

        // Simulate delay
        await new Promise(resolve => setTimeout(resolve, 500));
      } catch (error) {
        console.error('Payment failed:', error);
      } finally {
        setLoading(null);
      }
    }
  };

  return (
    <div className="bg-gradient-to-b from-[#0a0a0a] to-black border-r border-[#d4af37] p-5 flex flex-col gap-4 overflow-y-auto">
      <h2 className="text-[#d4af37] text-sm tracking-[3px] mt-0 font-['Cinzel',serif]">
        COMPLEX HIERARCHY
      </h2>

      {sectors.map((sector) => (
        <div
          key={sector.id}
          onClick={() => handleSectorClick(sector)}
          className={`
            border border-[#333] p-4 cursor-pointer transition-all relative bg-black/30
            ${sector.locked && !loading
              ? 'opacity-40 cursor-not-allowed'
              : 'hover:border-[#d4af37] hover:bg-[#d4af37]/5 hover:translate-x-1'
            }
            ${loading === sector.id ? 'animate-pulse' : ''}
          `}
        >
          <div className="absolute top-1 right-1 text-xs text-[#d4af37] font-bold">
            {sector.price}
          </div>
          <strong className="font-['Cinzel',serif]">
            SECTOR {String(sector.id).padStart(2, '0')}: {sector.name}
          </strong>
          <p className="text-xs mt-2 opacity-80 font-['Cinzel',serif]">
            {sector.desc}
          </p>
          {loading === sector.id && (
            <p className="text-xs text-[#d4af37] mt-2">Processing...</p>
          )}
        </div>
      ))}
    </div>
  );
}
