'use client'
import DepositDrawer from './DepositDrawer';
import { useAccount, useReadContract, useChainId } from 'wagmi';
import { useAppKit } from '@reown/appkit/react';
import { useState } from 'react';
import { VAULT_ABI, FILECOIN_VAULT_ADDRESS, FLOW_VAULT_ADDRESS } from '../lib/abis';

const BalanceCard = () => {
  const { isConnected } = useAccount();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { open } = useAppKit();
  const chainId = useChainId();

  const { address } = useAccount();

  // Check if we're on the correct chains
  const isOnFilecoin = chainId === 314159;
  const isOnFlow = chainId === 545;
  const isOnSupportedChain = isOnFilecoin || isOnFlow;

  // Get the correct vault address based on current chain
  const getVaultAddress = () => {
    if (isOnFilecoin) return FILECOIN_VAULT_ADDRESS;
    if (isOnFlow) return FLOW_VAULT_ADDRESS;
    return FILECOIN_VAULT_ADDRESS; // Default to Filecoin
  };

  const vaultAddress = getVaultAddress();

  const { data: shares } = useReadContract({
    address: vaultAddress,
    abi: VAULT_ABI,
    functionName: 'balanceOf',
    args: [address as `0x${string}`],
    chainId: chainId,
  });

  // Convert shares to assets (USDC) if needed
  const { data: assets } = useReadContract({
    address: vaultAddress,
    abi: VAULT_ABI,
    functionName: 'convertToAssets',
    args: [shares ?? 0n],
    chainId: chainId,
  });

  const getNetworkName = () => {
    if (isOnFilecoin) return 'Filecoin';
    if (isOnFlow) return 'Flow';
    return 'Filecoin'; // Default
  };

  return (
    <div className="w-full px-4 py-6">
      <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:justify-between">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
          <div className="flex flex-col">
            <span className="text-white text-[54px] font-bold" style={{ fontFamily: 'var(--font-basement)' }}>
              ${assets ? Number(assets) / 1e6 : '0.00'}
            </span>
            <span className="text-[#5FFBF1] text-3xl" style={{ fontFamily: 'var(--font-basement)' }}>
              Total PNL ($0.0)
            </span>
          </div>

          <div className="px-3 py-1 rounded-full bg-[#24FF9B] text-black text-xs">
            +0.0%▲
          </div>
        </div>
        <button className="mt-4 md:mt-0 px-6 py-2 rounded-full bg-[#44FBDE] text-black font-semibold shadow-lg hover:scale-105 transition-transform" style={{ fontFamily: 'var(--font-basement)' }}               onClick={() => {
                if (!isConnected) {
                  open();
                } else {
                  setDrawerOpen(true);
                }
              }}>
          Deposit
        </button>
      </div>
      <DepositDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        vaultName={getNetworkName()}
      />
    </div>
  );
};

export default BalanceCard; 