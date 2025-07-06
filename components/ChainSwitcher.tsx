'use client';
import { useChainId, useSwitchChain } from 'wagmi';
import { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';
import clsx from 'clsx';

const CHAINS = [
  { id: 314159, name: 'Filecoin Calibration', short: 'FIL', color: '#5FFBF1' },
  { id: 545, name: 'Flow Testnet', short: 'FLOW', color: '#24FF9B' },
];

export default function ChainSwitcher() {
  const chainId = useChainId();
  const { switchChain, isPending } = useSwitchChain();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const current = CHAINS.find(c => c.id === chainId) || CHAINS[0];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleChainSwitch = (chainId: number) => {
    switchChain({ chainId });
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#232A36] text-white font-medium border border-[#1C2431] hover:bg-[#1C2431] transition-all duration-200"
        onClick={() => setIsOpen(!isOpen)}
        disabled={isPending}
        style={{ fontFamily: 'var(--font-basement)' }}
      >
        <div 
          className="w-3 h-3 rounded-full" 
          style={{ backgroundColor: current.color }}
        />
        <span className="text-sm">{current.short}</span>
        <ChevronDown 
          size={16} 
          className={clsx(
            "transition-transform duration-200",
            isOpen && "rotate-180"
          )}
        />
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-64 bg-[#181D23] border border-[#1C2431] rounded-xl shadow-2xl z-50">
          <div className="p-2">
            <div className="text-xs text-[#8FA5B3] px-3 py-2 font-aeonik tracking-widest">
              SELECT NETWORK
            </div>
            {CHAINS.map((chain) => (
              <button
                key={chain.id}
                onClick={() => handleChainSwitch(chain.id)}
                className={clsx(
                  "w-full flex items-center justify-between px-3 py-3 rounded-lg text-left transition-all duration-200",
                  chain.id === current.id
                    ? "bg-[#232A36] text-white"
                    : "text-[#B6C2D6] hover:bg-[#20222B] hover:text-white"
                )}
                disabled={isPending}
              >
                <div className="flex items-center gap-3">
                  <div 
                    className="w-4 h-4 rounded-full" 
                    style={{ backgroundColor: chain.color }}
                  />
                  <div>
                    <div className="font-semibold text-sm font-basement">{chain.name}</div>
                    <div className="text-xs text-[#8FA5B3] font-aeonik">{chain.short}</div>
                  </div>
                </div>
                {chain.id === current.id && (
                  <Check size={16} className="text-[#5FFBF1]" />
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
} 