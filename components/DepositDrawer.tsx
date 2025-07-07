'use client';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import clsx from 'clsx';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useAccount, useBalance, useReadContract, useWriteContract, useWaitForTransactionReceipt, useSwitchChain, useChainId } from 'wagmi';
import { parseUnits, formatUnits } from 'viem';
import { USDC_ABI, VAULT_ABI, FILECOIN_USDFC_ADDRESS, FILECOIN_VAULT_ADDRESS, FLOW_MOCK_USDC_ADDRESS, FLOW_VAULT_ADDRESS } from '../lib/abis';
import { ExternalLink } from 'lucide-react';

type DepositDrawerProps = {
  open: boolean;
  onClose: () => void;
  vaultName: string;
};

export default function DepositDrawer({ open, onClose, vaultName }: DepositDrawerProps) {
  const [amount, setAmount] = useState('');
  const [isApproving, setIsApproving] = useState(false);
  const [isDepositing, setIsDepositing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { address } = useAccount();
  const chainId = useChainId();
  const { switchChain } = useSwitchChain();

  // Check if we're on the correct chains
  const isOnFilecoin = chainId === 314159;
  const isOnFlow = chainId === 545;
  const isOnSupportedChain = isOnFilecoin || isOnFlow;

  // Get the correct addresses based on current chain
  const getTokenAddress = () => {
    if (isOnFilecoin) return FILECOIN_USDFC_ADDRESS;
    if (isOnFlow) return FLOW_MOCK_USDC_ADDRESS;
    return FILECOIN_USDFC_ADDRESS; // Default to Filecoin
  };

  const getVaultAddress = () => {
    if (isOnFilecoin) return FILECOIN_VAULT_ADDRESS;
    if (isOnFlow) return FLOW_VAULT_ADDRESS;
    return FILECOIN_VAULT_ADDRESS; // Default to Filecoin
  };

  const getExplorerUrl = () => {
    if (isOnFilecoin) return `https://beryx.zondax.ch/address/${getVaultAddress()}`;
    if (isOnFlow) return `https://testnet.flowscan.org/address/${getVaultAddress()}`;
    return `https://beryx.zondax.ch/address/${getVaultAddress()}`; // Default to Filecoin
  };

  const getNetworkName = () => {
    if (isOnFilecoin) return 'Filecoin';
    if (isOnFlow) return 'Flow';
    return 'Filecoin'; // Default
  };

  const getTokenSymbol = () => {
    if (isOnFilecoin) return 'USDFC';
    if (isOnFlow) return 'USDC';
    return 'USDFC'; // Default
  };

  const tokenAddress = getTokenAddress();
  const vaultAddress = getVaultAddress();

  // Get token balance
  const { data: tokenBalance, isLoading: isLoadingBalance } = useBalance({
    address,
    token: tokenAddress,
    chainId: chainId,
  });

  // Get token allowance
  const { data: allowance } = useReadContract({
    address: tokenAddress,
    abi: USDC_ABI,
    functionName: 'allowance',
    args: address ? [address, vaultAddress] : undefined,
  });

  // Get vault total assets
  const { data: totalAssets } = useReadContract({
    address: vaultAddress,
    abi: VAULT_ABI,
    functionName: 'totalAssets',
  });

  // Approve token
  const { writeContract: approve, data: approveData } = useWriteContract();

  // Wait for approval transaction
  const { isLoading: isApprovingTx } = useWaitForTransactionReceipt({
    hash: approveData || undefined,
  });

  // Deposit to vault
  const { writeContract: deposit, data: depositData } = useWriteContract();

  // Wait for deposit transaction
  const { data: depositReceipt, isLoading: isDepositingTx } = useWaitForTransactionReceipt({
    hash: depositData,
    chainId: chainId,
  });

  // Prevent background scroll when open
  useEffect(() => {
    if (open) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  // Reset state when drawer closes
  useEffect(() => {
    if (!open) {
      setAmount('');
      setError(null);
      setIsApproving(false);
      setIsDepositing(false);
    }
  }, [open]);

  // Handle successful deposit
  useEffect(() => {
    if (depositReceipt && depositReceipt.status !== 'reverted') {
      console.log('Deposit successful:', depositReceipt);
      // Reset all state
      setAmount('');
      setError(null);
      setIsApproving(false);
      setIsDepositing(false);
      // Close the drawer
      onClose();
    } else if (depositReceipt?.status === 'reverted') {
      setError('Transaction reverted. The vault might be paused or have restrictions. Please try a different amount or contact support.');
      setIsDepositing(false);
    }
  }, [depositReceipt, onClose]);

  if (!open) return null;

  const handleMax = () => {
    if (tokenBalance) {
      setAmount(formatUnits(tokenBalance.value, tokenBalance.decimals));
    }
  };

  const handleDeposit = async () => {
    try {
      setError(null);
      if (!amount || !address) return;

      // Check if we're on a supported chain
      if (!isOnSupportedChain) {
        setError('Please switch to Filecoin Calibration Testnet or Flow Testnet to deposit');
        return;
      }

      const amountInWei = parseUnits(amount, 6); // Both tokens have 6 decimals
      console.log('Deposit amount in wei:', amountInWei.toString());
      console.log('Current allowance:', allowance?.toString());
      console.log('Vault total assets:', totalAssets?.toString());

      // Check if we need to approve first
      if (!allowance || BigInt(allowance) < amountInWei) {
        console.log('Approval needed');
        setIsApproving(true);
        try {
          approve({
            address: tokenAddress,
            abi: USDC_ABI,
            functionName: 'approve',
            args: [vaultAddress, BigInt('0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff')], // Max uint256
            chainId: chainId,
          });
          console.log('Approval initiated');
        } catch (err) {
          console.error('Approval error:', err);
          setError('Failed to approve token. Please try again.');
          setIsApproving(false);
          return;
        }
      }

      // Wait for approval transaction to be mined
      if (isApprovingTx) {
        console.log('Waiting for approval transaction...');
        return;
      }

      if (!allowance || BigInt(allowance) < amountInWei) {
        setError('Insufficient allowance. Please try approving again.');
        return;
      }
      
      setIsDepositing(true);
      try {
        console.log('Attempting deposit...');
        deposit({
          address: vaultAddress,
          abi: VAULT_ABI,
          functionName: 'deposit',
          args: [amountInWei, address], // ERC4626 deposit takes assets and receiver
          chainId: chainId,
        });
        
        console.log('Deposit transaction initiated');
      } catch (err) {
        console.error('Deposit error:', err);
        if (err instanceof Error) {
          if (err.message.includes('user rejected')) {
            setError('Transaction was rejected');
          } else if (err.message.includes('insufficient funds')) {
            setError('Insufficient funds for gas');
          } else if (err.message.includes('execution reverted')) {
            setError('Transaction reverted. The vault might be paused or have restrictions. Please try a different amount or contact support.');
          } else if (err.message.includes('simulation failed')) {
            setError('Transaction simulation failed. The vault might be paused or have restrictions. Please try a different amount or contact support.');
          } else if (err.message.includes('unknown signature type')) {
            setError('Transaction failed: Unknown signature type. Please try again or contact support.');
          } else {
            setError(`Deposit failed: ${err.message}`);
          }
        } else {
          setError('Failed to deposit. Please try again.');
        }
        setIsDepositing(false);
      }
    } catch (err) {
      console.error('General error:', err);
      setError(err instanceof Error ? err.message : 'An error occurred');
      setIsApproving(false);
      setIsDepositing(false);
    }
  };

  // Example vault info (replace with real data as needed)
  const vaultDescription = "SuperUSDC optimizes USDC returns across blue-chip lending protocols by automatically rebalancing between vaults using predictive onchain data. Secured by Yearn v3.";
  const yieldSources = [
    { name: 'KittyPunch', icon: '/logo/kittypunch.png' },
    { name: 'MORE Markets', icon: '/logo/moremarkets.webp' },
    { name: 'Ankr', icon: '/logo/ankr.webp' },
  ];

  const formattedBalance = tokenBalance ? formatUnits(tokenBalance.value, tokenBalance.decimals) : '0';
  const isLoading = isLoadingBalance || isApprovingTx || isDepositingTx;
  const buttonDisabled = !amount || isLoading || parseFloat(amount) <= 0 || parseFloat(amount) > parseFloat(formattedBalance) || !address;

  return createPortal(
    <AnimatePresence>
      {open && (
        <>
          {/* Blurred Backdrop */}
          <div
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
            onClick={onClose}
          />
          {/* Drawer with Framer Motion */}
          <motion.div
            className={clsx(
              "fixed left-0 right-0 bottom-0 z-50 w-screen",
              "rounded-t-3xl bg-[#181D23] border-t border-[#1C2431] shadow-2xl flex flex-col"
            )}
            style={{ height: '65vh' }}
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{
              type: 'spring',
              stiffness: 400,
              damping: 30,
              mass: 0.7
            }}
          >
            {/* Close Button absolute top right */}
            <button
              className="absolute top-6 right-6 text-[#8FA5B3] hover:text-white text-2xl z-10"
              onClick={onClose}
              aria-label="Close"
            >
              ×
            </button>
            {/* Main Content: Responsive flex-row for desktop, flex-col for mobile */}
            <div className="flex-1 overflow-y-auto px-8 pt-8 pb-0 flex flex-col md:flex-row gap-12">
              {/* Left: Deposit Form */}
              <div className="flex-1 flex flex-col items-start">
                <h2 className="text-2xl font-bold tracking-wider text-[#D1D1E0] mb-2 font-basement">DEPOSIT</h2>
                <div className="text-xs text-[#B6C2D6] tracking-widest mb-6 font-aeonik">FUNDING AMOUNT</div>
                {/* Token/Balance and Input side by side on desktop, stacked on mobile */}
                <div className="w-full flex flex-col md:flex-row gap-4 mb-6">
                  <div className="flex-1 flex items-center justify-between bg-[#20222B] rounded-2xl border border-[#23243a] px-4 py-3">
                    <div className="flex items-center gap-3">
                      <Image src="/vaults/usdcModerateTest.png" alt="token" width={32} height={32} className="rounded-full" />
                      <div>
                        <div className="text-base font-semibold text-white font-basement">{getTokenSymbol()}</div>
                        <div className="text-xs text-[#8FA5B3] font-aeonik">{getNetworkName()}</div>
                      </div>
                    </div>
                    <div className="text-xs text-[#B6C2D6] font-aeonik">
                      BALANCE <span className="text-white font-mono">{formattedBalance}</span>
                    </div>
                  </div>
                  <div className="flex-1 flex flex-col justify-between">
                    <input
                      type="number"
                      min="0"
                      step="any"
                      placeholder="0.00"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      className="w-full px-4 py-4 rounded-xl bg-[#232A36] border border-[#1C2431] text-white text-2xl font-mono focus:outline-none focus:ring-2 focus:ring-[#5FFBF1] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    />
                    <div className="flex items-center justify-between text-xs text-[#8FA5B3] mt-2 font-aeonik">
                      <span>${amount ? (parseFloat(amount) * 1).toFixed(2) : '0.00'}</span>
                      <button 
                        onClick={handleMax}
                        className="text-[#5FFBF1] underline font-medium"
                      >
                        MAX
                      </button>
                    </div>
                  </div>
                </div>
                {error && (
                  <div className="w-full text-red-500 text-sm mb-4 font-aeonik">
                    {error}
                  </div>
                )}
              </div>
              {/* Right: Vault Info (desktop only, stack below on mobile) */}
              <div className="flex-1 flex flex-col gap-6 md:pr-8 md:mt-16">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-lg font-bold text-[#D1D1E0] font-basement">About this Vault</div>
                    <a
                      href={getExplorerUrl()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ml-2 text-[#B6C2D6] hover:text-[#5FFBF1] transition-colors"
                      aria-label={`View vault on ${isOnFilecoin ? 'Beryx' : 'Flowscan'}`}
                    >
                      <ExternalLink size={22} />
                    </a>
                  </div>
                  <div className="text-sm text-[#B6C2D6] leading-relaxed font-aeonik">{vaultDescription}</div>
                </div>
                <div>
                  <div className="text-xs text-[#B6C2D6] mb-2 tracking-widest font-aeonik">YIELD SOURCES</div>
                  <div className="flex flex-wrap gap-4">
                    {yieldSources.map((ys, i) => (
                      <div key={i} className="flex items-center gap-2 bg-[#23243a] rounded-full px-3 py-1">
                        <Image src={ys.icon} alt={ys.name} width={20} height={20} />
                        <span className="text-xs text-[#B6C2D6] font-aeonik">{ys.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            {/* Add chain switch buttons if not on supported chains */}
            {!isOnSupportedChain && (
              <div className="w-full px-8 pb-4 flex gap-4">
                <button
                  onClick={() => switchChain({ chainId: 314159 })}
                  className="flex-1 py-3 rounded-full text-black font-semibold shadow-lg bg-gradient-to-r from-[#5FFBF1] to-[#24FF9B] hover:scale-105 font-basement"
                >
                  Switch to Filecoin
                </button>
                <button
                  onClick={() => switchChain({ chainId: 545 })}
                  className="flex-1 py-3 rounded-full text-black font-semibold shadow-lg bg-gradient-to-r from-[#5FFBF1] to-[#24FF9B] hover:scale-105 font-basement"
                >
                  Switch to Flow
                </button>
              </div>
            )}
            {/* Deposit Summary and Button as sticky footer */}
            <div className="w-full px-8 pb-8 pt-4 flex flex-col gap-4 sticky bottom-0 bg-[#181D23]">
              <div className="border-t border-[#23243a] pt-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-lg font-mono tracking-widest text-[#B6C2D6] font-basement">DEPOSIT SUMMARY</span>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-[#B6C2D6] border border-[#23243a] rounded px-2 py-1 font-mono font-aeonik">SLIPPAGE % BRIDGE/DEX 0.5/0.5</span>
                    <button className="text-[#8FA5B3] hover:text-white text-lg">⚙️</button>
                  </div>
                </div>
                <div className="flex flex-col gap-1 text-[#B6C2D6] text-sm font-mono">
                  <div className="flex items-center justify-between">
                    <span className="font-aeonik">AVERAGE APY</span>
                    <span className="text-white font-basement">7.40%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-aeonik">ESTIMATED FEES</span>
                    <span className="text-white font-basement">--</span>
                  </div>
                  <div className="flex items-center justify-between text-lg mt-2">
                    <span className="font-aeonik">RECEIVING TODAY</span>
                    <span className="text-white font-bold text-2xl font-basement">${amount ? (parseFloat(amount) * 1).toFixed(2) : '0.00'}</span>
                  </div>
                </div>
              </div>
              <button
                type="button"
                disabled={buttonDisabled || !isOnSupportedChain}
                onClick={handleDeposit}
                className={clsx(
                  "w-full py-3 rounded-full text-black font-semibold shadow-lg transition-transform text-lg font-basement",
                  (buttonDisabled || !isOnSupportedChain)
                    ? "bg-gray-500 cursor-not-allowed"
                    : "bg-gradient-to-r from-[#5FFBF1] to-[#24FF9B] hover:scale-105"
                )}
              >
                {isLoading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    {isApproving ? 'Approving...' : isDepositing ? 'Depositing...' : 'Processing...'}
                  </span>
                ) : !isOnSupportedChain ? (
                  'Switch to Supported Network'
                ) : (
                  'Deposit'
                )}
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.body
  );
}