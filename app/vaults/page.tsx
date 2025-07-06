import Head from 'next/head';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Image from 'next/image';
import VaultCard from '../../components/VaultCard';

const vaults = [
  {
    icon: '/vaults/usdcModerateTest.png',
    name: 'SuperUSDC',
    network: 'Filecoin Calibration Testnet',
    apy: '7.56%',
    description: `SuperUSDC optimizes USDC returns across blue-chip lending protocols on Filecoin by automatically rebalancing between vaults using predictive onchain data. Audited by yAudit, leading security researchers, and secured by Yearn v3.`,
    yieldSources: [
      { name: 'Aave', icon: '/yieldSources/aave.png' },
      { name: 'Shadow', icon: '/yieldSources/shadowLogo.svg' },
      { name: 'Swapx', icon: '/yieldSources/swapxLogo.jpg' },
    ],
    tvl: '1.2M USDFC',
    points: '20X',
  },
  {
    icon: '/vaults/usdcModerateTest.png',
    name: 'SuperUSDC',
    network: 'Flow Testnet',
    apy: '6.50%',
    description: `SuperUSDC optimizes USDC returns across blue-chip lending protocols on Flow by automatically rebalancing between vaults using predictive onchain data. Audited by yAudit, leading security researchers, and secured by Yearn v3.`,
    yieldSources: [
      { name: 'Aave', icon: '/yieldSources/aave.png' },
      { name: 'Shadow', icon: '/yieldSources/shadowLogo.svg' },
      { name: 'Swapx', icon: '/yieldSources/swapxLogo.jpg' },
    ],
    tvl: '1.2M USDC',
    points: '20X',
  },
];

export default function Vaults() {
  return (
    <>
      <Head>
        <title>Vaults Marketplace | Shōgun DeFi</title>
        <meta name="description" content="Shōgun Vaults Marketplace" />
      </Head>
      <main
        className="min-h-screen text-white"
        // style={{
        //   backgroundImage: 'radial-gradient(circle at center, #020409 0%, #0E141F 100%)',
        // }}
      >
        <div className="max-w-6xl mx-auto w-full px-4 py-8 flex flex-col min-h-screen">
          {/* <Header /> */}
          {/* Title and Description */}
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-5xl font-bold" style={{ fontFamily: 'var(--font-basement)' }}>Vaults</h1>
            <div className="flex items-center gap-4">
              {/* Replace these with your actual filter components/inputs/buttons */}
              {/* <div className="flex flex-col md:flex-row items-center gap-4 mb-1 justify-center">
            <div className="flex items-center gap-2">
              <span className="text-[#B6C2D6]">Sort by</span>
              <button className="px-4 py-2 rounded-lg bg-[#19212C] text-white font-medium flex items-center gap-2 border border-[#223040]">
                TVL <svg width="16" height="16" fill="none" viewBox="0 0 16 16"><path d="M4 6l4 4 4-4" stroke="#5FFBF1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </button>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[#B6C2D6]">Risk tolerance</span>
              <button className="px-4 py-2 rounded-lg bg-[#19212C] text-white font-medium border border-[#223040]">Show all</button>
            </div>
          </div> */}
              {/* Add more filter controls here */}
            </div>
          </div>

          {/* Filters Row */}
          {/* <div className="flex flex-col md:flex-row items-center gap-4 mb-8 justify-center">
            <div className="flex items-center gap-2">
              <span className="text-[#B6C2D6]">Sort by</span>
              <button className="px-4 py-2 rounded-lg bg-[#19212C] text-white font-medium flex items-center gap-2 border border-[#223040]">
                TVL <svg width="16" height="16" fill="none" viewBox="0 0 16 16"><path d="M4 6l4 4 4-4" stroke="#5FFBF1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </button>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[#B6C2D6]">Risk tolerance</span>
              <button className="px-4 py-2 rounded-lg bg-[#19212C] text-white font-medium border border-[#223040]">Show all</button>
            </div>
          </div> */}

          {/* Vaults List */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {vaults.map((vault, idx) => (
              <VaultCard
                key={idx}
                vault={vault}
                size={idx === 0 ? 'L' : 'M'}
              />
            ))}
          </div>

          {/* <Footer /> */}
        </div>
      </main>
    </>
  );
} 