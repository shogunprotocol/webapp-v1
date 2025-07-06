'use client';
import Image from 'next/image';
import { useState } from 'react';
import DepositDrawer from './DepositDrawer';
import { useAccount } from 'wagmi';
import { useAppKit } from '@reown/appkit/react';

export type Vault = {
  icon: string;
  name: string;
  network: string;
  apy: string;
  description: string;
  yieldSources: { name: string; icon: string }[];
  tvl: string;
  points: string;
};

type VaultCardProps = {
  vault: Vault;
  size?: 'L' | 'M';
};

export default function VaultCard({ vault, size = 'M' }: VaultCardProps) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { isConnected } = useAccount();
  const { open } = useAppKit();

  const colSpan = size === 'L' ? 'col-span-1 md:col-span-2' : '';

  const cardWidth =
    size === 'L'
      ? 'w-full max-w-none'
      : 'max-w-xl';

  return (
    <>
      <div className={`rounded-2xl bg-[#121720] border border-[#1C2431] p-0 overflow-hidden shadow-lg flex flex-col backdrop-blur-xl ${colSpan} ${cardWidth}`}>
        {/* Header */}
        <div className="flex">
          <div className="flex items-center gap-3 flex-1 p-6">
            <Image src={vault.icon} alt={vault.name} width={48} height={48} className="rounded-full" />
            <div>
              <div className="text-xl font-bold font-basement">{vault.name}</div>
              <div className="text-xs text-[#B6C2D6] font-medium font-aeonik">{vault.network}</div>
            </div>
          </div>
          <div className="flex flex-col items-end justify-center bg-[#23243a]/60 px-8 min-w-[140px]">
            <div className="text-3xl font-bold text-white font-basement">{vault.apy}</div>
            <div className="text-xs text-[#B6C2D6] flex items-center gap-1 font-aeonik">
              <svg width="18" height="18" fill="none" viewBox="0 0 20 20"><path d="M8 6l4 4-4 4" stroke="#5FFBF1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              APY
            </div>
          </div>
        </div>
        {/* Body */}
        <div className="p-6 flex-1 flex flex-col">
          <div className="mb-4">
            <div className="text-xs text-[#B6C2D6] mb-1 font-aeonik">DESCRIPTION</div>
            <div className="text-sm text-[#B6C2D6] font-aeonik">{vault.description}</div>
          </div>
          <div className="mb-4">
            <div className="text-xs text-[#B6C2D6] mb-1 font-aeonik">YIELD SOURCES</div>
            <div className="flex items-center gap-3">
              {vault.yieldSources.map((ys, i) => (
                <div key={i} className="flex items-center gap-1">
                  <Image src={ys.icon} alt={ys.name} width={20} height={20} />
                  <span className="text-xs text-[#B6C2D6] font-aeonik">{ys.name}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="mb-4">
            <div className="text-xs text-[#B6C2D6] mb-1 font-aeonik">TVL</div>
            <div className="text-white font-bold font-basement">{vault.tvl}</div>
          </div>
          <div className="flex items-center justify-end mt-auto">
            <button
              className="px-6 py-2 rounded-full bg-gradient-to-r from-[#5FFBF1] to-[#24FF9B] text-black font-semibold shadow hover:scale-105 transition-transform text-base font-basement"
              onClick={() => {
                if (!isConnected) {
                  open();
                } else {
                  setDrawerOpen(true);
                }
              }}
            >
              Deposit
            </button>
          </div>
        </div>
      </div>
      <DepositDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        vaultName={vault.name}
      />
    </>
  );
}