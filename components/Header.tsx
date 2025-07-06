'use client'
import Image from 'next/image';
import Link from 'next/link';
import { Home, Wallet, X, Brain } from 'lucide-react';
import { colors } from '../lib/colors';
import { Navigation } from './Navigation';
import clsx from 'clsx';
import { useAccount, useDisconnect } from 'wagmi';
import ConnectButton from './ConnectButton';
import { usePathname } from 'next/navigation';
import ChainSwitcher from './ChainSwitcher';

// Extend Window interface for reown
declare global {
  interface Window {
    reown?: {
      openModal?: () => void;
    };
  }
}

const Header = () => {
  const navItems = [
    { name: 'Home', icon: Home, href: '/' },
    { name: 'Vaults', icon: Wallet, href: '/vaults' },
    { name: 'Thoughts', icon: Brain, href: '/thoughts' },
    { name: 'Council', icon: null, href: '/council', disabled: true },
  ];

  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const pathname = usePathname();

  // Helper to shorten address
  const shortAddress = (addr: string) => addr ? `${addr.slice(0, 6)}...${addr.slice(-4)}` : '';

  return (
    <header className="w-full py-6 flex items-center justify-between">
      <div className="w-full flex items-center justify-between">
        {/* Logo and Wordmark */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full overflow-hidden relative">
            <Image
              src="/logo/ai-cult-icon.png"
              alt="Shōgun"
              width={40}
              height={40}
              className="object-cover"
              priority
            />
          </div>
          <span className="text-white text-xl font-bold tracking-wider" style={{ fontFamily: 'var(--font-basement)' }}>
            SHŌGUN
          </span>
        </div>

        {/* Navigation with Spotlight Tabs */}
        <nav className="hidden md:block">
          <div className="mx-auto shrink-0 overflow-hidden rounded-full">
            <Navigation as="nav" className="relative rounded-full border border-[#1C2431] bg-[#121720] p-2">
              {({ ready, size, position, duration }) => (
                <div
                  style={{
                    "--size": size,
                    "--position": position,
                    "--duration": duration,
                  } as React.CSSProperties}>
                  <div
                    className={clsx(
                      { hidden: !ready },
                      "absolute bottom-0 h-1/2 w-[var(--size)] translate-x-[var(--position)] bg-gradient-to-r from-[#5FFBF1] to-[#0EC1FB] blur-xl transition-[width,transform] duration-[--duration]"
                    )}></div>

                  <div className="absolute inset-0 rounded-full bg-[#121720]"></div>

                  <div className="relative">
                    <div
                      className={clsx(
                        { hidden: !ready },
                        "absolute inset-y-0 h-full w-[var(--size)] translate-x-[var(--position)] rounded-full bg-gradient-to-r from-[#5FFBF1] to-[#0EC1FB] opacity-10 transition-[width,transform] duration-[--duration]"
                      )}></div>
                    <div
                      className={clsx(
                        { hidden: !ready },
                        "absolute bottom-0 h-1/3 w-[var(--size)] translate-x-[var(--position)] rounded-full bg-gradient-to-r from-[#5FFBF1] to-[#0EC1FB] opacity-20 blur-md transition-[width,transform] duration-[--duration]"
                      )}></div>

                    <Navigation.List as="ul" className="relative flex items-center gap-3" > 
                      {navItems.map((item, index) => (
                        <Navigation.Item key={index} as="li">
                          {({ setActive }) => {
                            const isActive = pathname === item.href;
                            return (
                              <Link
                                href={item.href}
                                className={clsx(
                                  isActive
                                    ? "text-white font-bold"
                                    : "text-[#8FA5B3] hover:text-white",
                                  item.disabled && "opacity-50 cursor-not-allowed pointer-events-none",
                                  "inline-flex items-center gap-2 px-4 py-1.5 text-sm font-medium transition-colors duration-300"
                                )}
                                onClick={setActive}
                                style={{ fontFamily: 'var(--font-basement)' }}
                              >
                                {item.icon && <item.icon size={18} />}
                                {item.name}
                                {item.disabled}
                              </Link>
                            );
                          }}
                        </Navigation.Item>
                      ))}
                    </Navigation.List>
                  </div>
                </div>
              )}
            </Navigation>
          </div>
        </nav>

        {/* Wallet Section */}
        <div className="flex flex-row items-center gap-4">
        <ChainSwitcher />

          {isConnected ? (
            <>
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-[#5FFBF1] to-[#0EC1FB] rounded-full blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
                <div className="relative px-4 py-2 rounded-full bg-[#121720] text-white font-medium" style={{ fontFamily: 'var(--font-basement)' }}>
                  {shortAddress(address || '')}
                </div>
              </div>
              <button
                className="p-2 rounded-full bg-gradient-to-r from-[#5FFBF1] to-[#24FF9B] text-black font-semibold shadow-lg hover:scale-105 transition-transform"
                onClick={() => disconnect()}
                title="Disconnect"
                style={{ fontFamily: 'var(--font-basement)' }}
              >
                <X size={18} />
              </button>
            </>
          ) : (
            <ConnectButton/>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header; 